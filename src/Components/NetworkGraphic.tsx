"use client";

import { useEffect, useRef } from "react";

/**
 * Hero'daki donen dodekahedron ag grafigi.
 *
 * Eskiden three.js ile ciziliyordu (~245 KB gzip); sahne kucuk oldugu icin
 * perspektif izdusumu burada elle yapilip Canvas 2D ile ciziliyor. Donus
 * formulu, kamera (z=9, fov 60) ve sis (6..15) ayni.
 *
 * Katmanlar (arkadan one): kameraya bakan yuzlerin hafif dolgusu, arka kenarlar,
 * ters yone donen ic ikosahedron (dodekahedronun duali), on kenarlar, kenarlar
 * boyunca dolasan veri paketleri ve isiyan dugumler.
 */

const PRIMARY = "197, 160, 89"; // #c5a059
const BRIGHT = "243, 215, 154";
const RADIUS = 3.5 * 1.1; // DodecahedronGeometry(3.5) * group scale 1.1
const CORE_RADIUS = RADIUS * 0.42;
const NODE_RADIUS = 0.15 * 1.1;
const CAMERA_Z = 9;
const FOV = (60 * Math.PI) / 180;
const FOG_NEAR = 6;
const FOG_FAR = 15;
const PULSE_COUNT = 6;
const PULSE_SPEED = 0.7; // kenar / saniye

// Altin oran
const PHI = (1 + Math.sqrt(5)) / 2;
const INV_PHI = 1 / PHI;

// Dodekahedron: 20 dugum (kup 8 + uc dikdortgen duzlem 12)
const DODECA_VERTICES_RAW: [number, number, number][] = [
  [-1, -1, -1],
  [-1, -1, 1],
  [-1, 1, -1],
  [-1, 1, 1],
  [1, -1, -1],
  [1, -1, 1],
  [1, 1, -1],
  [1, 1, 1],
  [0, -INV_PHI, -PHI],
  [0, -INV_PHI, PHI],
  [0, INV_PHI, -PHI],
  [0, INV_PHI, PHI],
  [-INV_PHI, -PHI, 0],
  [-INV_PHI, PHI, 0],
  [INV_PHI, -PHI, 0],
  [INV_PHI, PHI, 0],
  [-PHI, 0, -INV_PHI],
  [PHI, 0, -INV_PHI],
  [-PHI, 0, INV_PHI],
  [PHI, 0, INV_PHI],
];

// Orijine olan mesafeyi RADIUS yapacak sekilde olcekle
const DODECA_NORM = Math.hypot(1, 1, 1);
const DODECA_VERTICES: [number, number, number][] = DODECA_VERTICES_RAW.map(([x, y, z]) => [
  (x / DODECA_NORM) * RADIUS,
  (y / DODECA_NORM) * RADIUS,
  (z / DODECA_NORM) * RADIUS,
]);

// 12 besgen yuz (dugum indeksleri saat yonunun tersi, disari dogru normal)
const DODECA_FACES: number[][] = [
  [3, 11, 7, 19, 18],
  [7, 11, 9, 5, 19],
  [6, 15, 7, 17, 4],
  [2, 13, 3, 16, 0],
  [17, 19, 5, 14, 4],
  [16, 18, 1, 12, 0],
  [13, 2, 6, 15, 3],
  [12, 1, 9, 14, 0],
  [2, 10, 8, 0, 16],
  [6, 10, 8, 4, 17],
  [3, 13, 15, 7, 11],
  [1, 9, 11, 3, 18],
];

// Dodekahedronun 30 kenari (tekrarsiz indeks ciftleri)
const DODECA_EDGES: [number, number][] = (() => {
  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];
  for (const face of DODECA_FACES) {
    for (let i = 0; i < face.length; i++) {
      const a = face[i];
      const b = face[(i + 1) % face.length];
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      if (!edgeSet.has(key)) {
        edgeSet.add(key);
        edges.push([Math.min(a, b), Math.max(a, b)]);
      }
    }
  }
  return edges;
})();

// Ic ikosahedron (dodekahedronun duali): 12 dugum, her biri bir yuzun agirlik merkezi
const ICOSA_VERTICES: [number, number, number][] = DODECA_FACES.map((face) => {
  let cx = 0;
  let cy = 0;
  let cz = 0;
  for (const idx of face) {
    cx += DODECA_VERTICES[idx][0];
    cy += DODECA_VERTICES[idx][1];
    cz += DODECA_VERTICES[idx][2];
  }
  const norm = Math.hypot(cx, cy, cz);
  return [(cx / norm) * CORE_RADIUS, (cy / norm) * CORE_RADIUS, (cz / norm) * CORE_RADIUS];
});

// Ic ikosahedronun 30 kenari (birbirine komsu yuz merkezleri)
const ICOSA_EDGES: [number, number][] = (() => {
  const edges: [number, number][] = [];
  const edgeMap = new Map<string, number[]>();
  for (let faceIdx = 0; faceIdx < DODECA_FACES.length; faceIdx++) {
    const face = DODECA_FACES[faceIdx];
    for (let i = 0; i < face.length; i++) {
      const a = face[i];
      const b = face[(i + 1) % face.length];
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      const list = edgeMap.get(key) ?? [];
      list.push(faceIdx);
      edgeMap.set(key, list);
    }
  }
  for (const faces of edgeMap.values()) {
    if (faces.length === 2) {
      edges.push([Math.min(faces[0], faces[1]), Math.max(faces[0], faces[1])]);
    }
  }
  return edges;
})();

interface Pulse {
  edgeIdx: number;
  t: number; // 0..1
  speed: number;
}

export default function NetworkGraphic({ paused = false }: { paused?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Baslangic rotasyonlari
    let rx = 0.3;
    let ry = 0.5;
    let rz = 0.1;
    let coreRy = 0;

    // Kenarlarda dolasan puls'lar
    const pulses: Pulse[] = Array.from({ length: PULSE_COUNT }, (_, i) => ({
      edgeIdx: Math.floor(Math.random() * DODECA_EDGES.length),
      t: i / PULSE_COUNT,
      speed: PULSE_SPEED * (0.8 + Math.random() * 0.4),
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // 3B dondurme matrisi: Rx * Ry * Rz
    const rotate = (
      x: number,
      y: number,
      z: number,
      ax: number,
      ay: number,
      az: number,
    ): [number, number, number] => {
      // Z etrafinda
      const cosZ = Math.cos(az);
      const sinZ = Math.sin(az);
      const x1 = x * cosZ - y * sinZ;
      const y1 = x * sinZ + y * cosZ;
      const z1 = z;

      // Y etrafinda
      const cosY = Math.cos(ay);
      const sinY = Math.sin(ay);
      const x2 = x1 * cosY + z1 * sinY;
      const y2 = y1;
      const z2 = -x1 * sinY + z1 * cosY;

      // X etrafinda
      const cosX = Math.cos(ax);
      const sinX = Math.sin(ax);
      const x3 = x2;
      const y3 = y2 * cosX - z2 * sinX;
      const z3 = y2 * sinX + z2 * cosX;

      return [x3, y3, z3];
    };

    // Perspektif izdusumu -> ekran koordinatlari (piksel cinsinden, ortalanmis)
    const project = (
      wx: number,
      wy: number,
      wz: number,
    ): { x: number; y: number; scale: number; fog: number; front: boolean } => {
      const cz = CAMERA_Z - wz;
      const fovFactor = 1 / Math.tan(FOV / 2);
      const scale = (fovFactor / cz) * (height / 2);
      const screenX = width / 2 + wx * scale;
      const screenY = height / 2 - wy * scale;

      // Sis: 0 (uzak) .. 1 (yakin)
      const dist = Math.sqrt(wx * wx + wy * wy + cz * cz);
      const fog = Math.max(0, Math.min(1, (FOG_FAR - dist) / (FOG_FAR - FOG_NEAR)));

      return {
        x: screenX,
        y: screenY,
        scale,
        fog,
        front: wz > 0,
      };
    };

    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!paused) {
        // Dis govde yavas donus
        rx += 0.08 * dt;
        ry += 0.12 * dt;
        rz += 0.03 * dt;

        // Ic ikosahedron ters yone
        coreRy -= 0.22 * dt;

        // Puls'lari ilerlet
        for (const p of pulses) {
          p.t += p.speed * dt;
          if (p.t >= 1) {
            p.t = 0;
            p.edgeIdx = Math.floor(Math.random() * DODECA_EDGES.length);
          }
        }
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Dis dugumlerin dunya koordinatlari
      const worldDodeca = DODECA_VERTICES.map(([x, y, z]) => rotate(x, y, z, rx, ry, rz));
      const projDodeca = worldDodeca.map(([x, y, z]) => project(x, y, z));

      // 1) Kamereya bakan yuzlerin cok hafif saydam dolgusu (derinlik hissi)
      for (const face of DODECA_FACES) {
        const p0 = worldDodeca[face[0]];
        const p1 = worldDodeca[face[1]];
        const p2 = worldDodeca[face[2]];
        // Normal vektorunun Z bileseni: (p1-p0) x (p2-p0)
        const v1x = p1[0] - p0[0];
        const v1y = p1[1] - p0[1];
        const v2x = p2[0] - p0[0];
        const v2y = p2[1] - p0[1];
        // Kamera (0, 0, CAMERA_Z)'de oldugu icin kamera yonu yaklasik +Z
        const nz = v1x * v2y - v1y * v2x;
        if (nz > 0) {
          ctx.beginPath();
          ctx.moveTo(projDodeca[face[0]].x, projDodeca[face[0]].y);
          for (let i = 1; i < face.length; i++) {
            ctx.lineTo(projDodeca[face[i]].x, projDodeca[face[i]].y);
          }
          ctx.closePath();
          ctx.fillStyle = `rgba(${PRIMARY}, 0.025)`;
          ctx.fill();
        }
      }

      // 2) Arka kenarlar (wz < 0) - soluk
      ctx.lineWidth = 1;
      for (const [a, b] of DODECA_EDGES) {
        const midZ = (worldDodeca[a][2] + worldDodeca[b][2]) / 2;
        if (midZ <= 0) {
          const pa = projDodeca[a];
          const pb = projDodeca[b];
          const alpha = 0.15 * Math.min(pa.fog, pb.fog);
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.strokeStyle = `rgba(${PRIMARY}, ${alpha})`;
          ctx.stroke();
        }
      }

      // 3) Ic ikosahedron (dual) - ters donus, daha kucuk
      const worldIcosa = ICOSA_VERTICES.map(([x, y, z]) =>
        rotate(x, y, z, rx * 0.6, coreRy, rz * 0.6),
      );
      const projIcosa = worldIcosa.map(([x, y, z]) => project(x, y, z));

      ctx.lineWidth = 1;
      for (const [a, b] of ICOSA_EDGES) {
        const pa = projIcosa[a];
        const pb = projIcosa[b];
        const midZ = (worldIcosa[a][2] + worldIcosa[b][2]) / 2;
        const alpha = (midZ > 0 ? 0.35 : 0.12) * Math.min(pa.fog, pb.fog);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.strokeStyle = `rgba(${BRIGHT}, ${alpha})`;
        ctx.stroke();
      }

      // 4) On kenarlar (wz > 0) - parlak
      ctx.lineWidth = 1.3;
      for (const [a, b] of DODECA_EDGES) {
        const midZ = (worldDodeca[a][2] + worldDodeca[b][2]) / 2;
        if (midZ > 0) {
          const pa = projDodeca[a];
          const pb = projDodeca[b];
          const alpha = 0.55 * Math.min(pa.fog, pb.fog);
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.strokeStyle = `rgba(${PRIMARY}, ${alpha})`;
          ctx.stroke();
        }
      }

      // 5) Kenarlar uzerinde dolasan puls'lar (veri paketleri)
      for (const p of pulses) {
        const [a, b] = DODECA_EDGES[p.edgeIdx];
        const wa = worldDodeca[a];
        const wb = worldDodeca[b];
        const wx = wa[0] + (wb[0] - wa[0]) * p.t;
        const wy = wa[1] + (wb[1] - wa[1]) * p.t;
        const wz = wa[2] + (wb[2] - wa[2]) * p.t;
        const proj = project(wx, wy, wz);

        const r = (wz > 0 ? 2.5 : 1.5) * (proj.scale / (height / 2)) * 18;
        const alpha = (wz > 0 ? 0.9 : 0.3) * proj.fog;

        // Isilti
        const grad = ctx.createRadialGradient(proj.x, proj.y, 0, proj.x, proj.y, r * 2.5);
        grad.addColorStop(0, `rgba(${BRIGHT}, ${alpha})`);
        grad.addColorStop(0.5, `rgba(${PRIMARY}, ${alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${PRIMARY}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, r * 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Cekirdek
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, Math.max(1, r * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }

      // 6) Dugumler (noktalar)
      for (let i = 0; i < worldDodeca.length; i++) {
        const p = projDodeca[i];
        const wz = worldDodeca[i][2];
        const r = (NODE_RADIUS * p.scale) / 2;
        const alpha = (wz > 0 ? 0.85 : 0.3) * p.fog;

        // Isiyan dis halka
        ctx.fillStyle = `rgba(${PRIMARY}, ${alpha * 0.25})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Ic parlak nokta
        ctx.fillStyle = wz > 0 ? `rgba(${BRIGHT}, ${alpha})` : `rgba(${PRIMARY}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1.2, r), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [paused]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-[320px] sm:h-[420px] lg:h-[520px] max-w-[560px]"
      aria-hidden="true"
    />
  );
}
