import React, { useEffect, useRef } from "react";

/**
 * Hero'daki donen dodekahedron ag grafigi.
 *
 * Eskiden three.js ile ciziliyordu (~245 KB gzip); sahne yalnizca 20 dugum ve
 * 30 kenardan olustugu icin perspektif izdusumu burada elle yapilip Canvas 2D
 * ile ciziliyor. Donus formulu, kamera (z=9, fov 60) ve sis (6..15) ayni.
 */

const PRIMARY = "197, 160, 89"; // #c5a059
const RADIUS = 3.5 * 1.1; // DodecahedronGeometry(3.5) * group scale 1.1
const NODE_RADIUS = 0.15 * 1.1;
const CAMERA_Z = 9;
const FOV = (60 * Math.PI) / 180;
const FOG_NEAR = 6;
const FOG_FAR = 15;

type Vec3 = [number, number, number];

function buildDodecahedron(): { nodes: Vec3[]; edges: [number, number][] } {
  const phi = (1 + Math.sqrt(5)) / 2;
  const inv = 1 / phi;
  const raw: Vec3[] = [];
  for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) raw.push([x, y, z]);
  for (const a of [-1, 1]) {
    for (const b of [-1, 1]) {
      raw.push([0, a * inv, b * phi]);
      raw.push([a * inv, b * phi, 0]);
      raw.push([a * phi, 0, b * inv]);
    }
  }
  // Birim kure uzerindeki koseler sqrt(3) yaricapinda; hedef yaricapa olcekle.
  const scale = RADIUS / Math.sqrt(3);
  const nodes = raw.map((v) => v.map((c) => c * scale) as Vec3);

  // Komsu koseler arasi uzaklik kenar uzunluguna (2/phi) esittir.
  const edgeLength = (2 / phi) * scale;
  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(
        nodes[i][0] - nodes[j][0],
        nodes[i][1] - nodes[j][1],
        nodes[i][2] - nodes[j][2],
      );
      if (Math.abs(d - edgeLength) < 1e-3 * scale) edges.push([i, j]);
    }
  }
  return { nodes, edges };
}

const { nodes: NODES, edges: EDGES } = buildDodecahedron();

function draw(ctx: CanvasRenderingContext2D, size: number, t: number) {
  const rx = t * 0.1 + Math.sin(t * 0.3) * 0.5;
  const ry = t * 0.15 + Math.cos(t * 0.2) * 0.5;
  const rz = Math.sin(t * 0.1) * 0.5;

  const focal = size / 2 / Math.tan(FOV / 2);
  const projected = NODES.map((v) => {
    const [x, y, z] = rotateXYZ(v, rx, ry, rz);
    const depth = CAMERA_Z - z;
    const k = focal / depth;
    const fog = Math.min(1, Math.max(0, (depth - FOG_NEAR) / (FOG_FAR - FOG_NEAR)));
    return { x: size / 2 + x * k, y: size / 2 - y * k, k, visibility: 1 - fog, depth };
  });

  ctx.clearRect(0, 0, size, size);
  ctx.lineWidth = 2;
  for (const [a, b] of EDGES) {
    const pa = projected[a];
    const pb = projected[b];
    const gradient = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
    gradient.addColorStop(0, `rgba(${PRIMARY}, ${0.5 * pa.visibility})`);
    gradient.addColorStop(1, `rgba(${PRIMARY}, ${0.5 * pb.visibility})`);
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(pa.x, pa.y);
    ctx.lineTo(pb.x, pb.y);
    ctx.stroke();
  }

  // Uzaktaki dugumler once cizilsin.
  for (const p of [...projected].sort((a, b) => b.depth - a.depth)) {
    ctx.fillStyle = `rgba(${PRIMARY}, ${0.9 * p.visibility})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, NODE_RADIUS * p.k, 0, Math.PI * 2);
    ctx.fill();
  }
}

/** three.js'in varsayilan 'XYZ' Euler sirasi: v' = Rx * Ry * Rz * v */
function rotateXYZ([x, y, z]: Vec3, rx: number, ry: number, rz: number): Vec3 {
  // Rz
  const cz = Math.cos(rz);
  const sz = Math.sin(rz);
  const x1 = x * cz - y * sz;
  const y1 = x * sz + y * cz;
  const z1 = z;
  // Ry
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  const x2 = x1 * cy + z1 * sy;
  const y2 = y1;
  const z2 = -x1 * sy + z1 * cy;
  // Rx
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  return [x2, y2 * cx - z2 * sx, y2 * sx + z2 * cx];
}

export default function NetworkGraphic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let size = 0;
    let frame = 0;
    let elapsed = 0;
    let last: number | null = null;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      size = canvas.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(ctx, size, elapsed);
    };

    const tick = (now: number) => {
      if (last !== null) elapsed += (now - last) / 1000;
      last = now;
      draw(ctx, size, elapsed);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reducedMotion || frame) return;
      last = null;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Ekran disindayken animasyonu durdur.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-125 flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
    </div>
  );
}
