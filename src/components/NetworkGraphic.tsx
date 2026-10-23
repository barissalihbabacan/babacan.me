import React, { useEffect, useRef } from "react";

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
const MAX_TILT = 0.28; // radyan

type Vec3 = [number, number, number];

interface Pulse {
  from: number;
  to: number;
  progress: number;
}

interface SceneState {
  pulses: Pulse[];
  flash: number[];
  tilt: { x: number; y: number };
  target: { x: number; y: number };
}

const PHI = (1 + Math.sqrt(5)) / 2;

/** Ham koordinatlari hedef yaricapa olcekler; kenarlari esit uzunluktaki ciftlerden cikarir. */
function buildSolid(raw: Vec3[], radius: number) {
  const scale = radius / Math.hypot(...raw[0]);
  const nodes = raw.map((v) => v.map((c) => c * scale) as Vec3);
  let min = Infinity;
  for (let i = 1; i < nodes.length; i++) min = Math.min(min, dist(nodes[0], nodes[i]));
  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (Math.abs(dist(nodes[i], nodes[j]) - min) < 1e-3 * radius) edges.push([i, j]);
    }
  }
  return { nodes, edges };
}

function dist(a: Vec3, b: Vec3) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

const DODECA_RAW: Vec3[] = [];
for (const x of [-1, 1])
  for (const y of [-1, 1]) for (const z of [-1, 1]) DODECA_RAW.push([x, y, z]);
for (const a of [-1, 1]) {
  for (const b of [-1, 1]) {
    DODECA_RAW.push([0, a / PHI, b * PHI]);
    DODECA_RAW.push([a / PHI, b * PHI, 0]);
    DODECA_RAW.push([a * PHI, 0, b / PHI]);
  }
}

// Ikosahedron koseleri dodekahedronun yuz normalleridir (dual cokyuzlu). Bu permutasyon
// yukaridaki dodekahedron yonelimiyle eslesir: her yonde tam 5 kose ayni uzakliktadir.
const ICOSA_RAW: Vec3[] = [];
for (const a of [-1, 1]) {
  for (const b of [-1, 1]) {
    ICOSA_RAW.push([0, a * PHI, b]);
    ICOSA_RAW.push([a, 0, b * PHI]);
    ICOSA_RAW.push([a * PHI, b, 0]);
  }
}

const { nodes: NODES, edges: EDGES } = buildSolid(DODECA_RAW, RADIUS);
const { nodes: CORE_NODES, edges: CORE_EDGES } = buildSolid(ICOSA_RAW, CORE_RADIUS);

const NEIGHBORS: number[][] = NODES.map(() => []);
for (const [a, b] of EDGES) {
  NEIGHBORS[a].push(b);
  NEIGHBORS[b].push(a);
}

/** Her yuz: normal yonune en yakin 5 kose, normal etrafinda aciya gore sirali. */
const FACES = ICOSA_RAW.map((n) => {
  const len = Math.hypot(...n);
  const normal = n.map((c) => c / len) as Vec3;
  const ranked = NODES.map((v, i) => ({
    i,
    d: v[0] * normal[0] + v[1] * normal[1] + v[2] * normal[2],
  }))
    .sort((a, b) => b.d - a.d)
    .slice(0, 5)
    .map((r) => r.i);
  // Yuz duzleminde iki eksen kurup koseleri aciya gore sirala.
  const ref: Vec3 = Math.abs(normal[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0];
  const u = cross(normal, ref);
  const w = cross(normal, u);
  const order = ranked
    .map((i) => ({ i, a: Math.atan2(dot(NODES[i], w), dot(NODES[i], u)) }))
    .sort((a, b) => a.a - b.a)
    .map((r) => r.i);
  return { normal, order };
});

/** Merkezden yuz duzlemine uzaklik (ic yaricap); tum yuzler icin ayni. */
const FACE_INRADIUS = dot(NODES[FACES[0].order[0]], FACES[0].normal);

function cross(a: Vec3, b: Vec3): Vec3 {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}
function dot(a: Vec3, b: Vec3) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

/** three.js'in varsayilan 'XYZ' Euler sirasi: v' = Rx * Ry * Rz * v */
function rotateXYZ([x, y, z]: Vec3, rx: number, ry: number, rz: number): Vec3 {
  const cz = Math.cos(rz);
  const sz = Math.sin(rz);
  const x1 = x * cz - y * sz;
  const y1 = x * sz + y * cz;
  const cy = Math.cos(ry);
  const sy = Math.sin(ry);
  const x2 = x1 * cy + z * sy;
  const z2 = -x1 * sy + z * cy;
  const cx = Math.cos(rx);
  const sx = Math.sin(rx);
  return [x2, y1 * cx - z2 * sx, y1 * sx + z2 * cx];
}

function project(v: Vec3, size: number, focal: number) {
  const depth = CAMERA_Z - v[2];
  const k = focal / depth;
  const fog = Math.min(1, Math.max(0, (depth - FOG_NEAR) / (FOG_FAR - FOG_NEAR)));
  return { x: size / 2 + v[0] * k, y: size / 2 - v[1] * k, k, z: v[2], visibility: 1 - fog };
}

function createScene(): SceneState {
  const pulses: Pulse[] = [];
  for (let i = 0; i < PULSE_COUNT; i++) {
    const from = Math.floor(Math.random() * NODES.length);
    const to = NEIGHBORS[from][Math.floor(Math.random() * 3)];
    pulses.push({ from, to, progress: Math.random() });
  }
  return { pulses, flash: NODES.map(() => 0), tilt: { x: 0, y: 0 }, target: { x: 0, y: 0 } };
}

/** Paketleri ilerletir; dugume varan paket geri donmeden rastgele yeni bir kenara gecer. */
function step(scene: SceneState, dt: number) {
  for (const p of scene.pulses) {
    p.progress += dt * PULSE_SPEED;
    if (p.progress >= 1) {
      scene.flash[p.to] = 1;
      const options = NEIGHBORS[p.to].filter((n) => n !== p.from);
      p.from = p.to;
      p.to = options[Math.floor(Math.random() * options.length)];
      p.progress -= 1;
    }
  }
  for (let i = 0; i < scene.flash.length; i++)
    scene.flash[i] = Math.max(0, scene.flash[i] - dt * 1.6);
  const ease = Math.min(1, dt * 3);
  scene.tilt.x += (scene.target.x - scene.tilt.x) * ease;
  scene.tilt.y += (scene.target.y - scene.tilt.y) * ease;
}

function draw(
  ctx: CanvasRenderingContext2D,
  size: number,
  t: number,
  scene: SceneState,
  animated: boolean,
) {
  const rx = t * 0.1 + Math.sin(t * 0.3) * 0.5 + scene.tilt.y;
  const ry = t * 0.15 + Math.cos(t * 0.2) * 0.5 + scene.tilt.x;
  const rz = Math.sin(t * 0.1) * 0.5;
  const focal = size / 2 / Math.tan(FOV / 2);

  const rotated = NODES.map((v) => rotateXYZ(v, rx, ry, rz));
  const projected = rotated.map((v) => project(v, size, focal));

  ctx.clearRect(0, 0, size, size);

  // 1) Kameraya bakan yuzlerin hafif dolgusu: tel kafese hacim verir.
  for (const face of FACES) {
    const nz = rotateXYZ(face.normal, rx, ry, rz)[2];
    // Kamera sonlu uzaklikta: yuz, normali kameraya (0, 0, CAMERA_Z) donukse gorunur.
    // Yalnizca nz > 0 bakmak, perspektifte arkaya donuk yuzleri de boyayip ust uste bindiriyordu.
    if (nz * CAMERA_Z - FACE_INRADIUS <= 0) continue;
    ctx.fillStyle = `rgba(${PRIMARY}, ${0.05 * nz})`;
    ctx.beginPath();
    face.order.forEach((i, idx) => {
      const p = projected[i];
      if (idx === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fill();
  }

  // 2) Kenarlar: arkadakiler ince ve soluk, ondekiler kalin ve parlak.
  const edgeOrder = EDGES.map(([a, b]) => ({ a, b, z: (rotated[a][2] + rotated[b][2]) / 2 })).sort(
    (e1, e2) => e1.z - e2.z,
  );
  const drawEdges = (front: boolean) => {
    for (const { a, b, z } of edgeOrder) {
      if (z >= 0 !== front) continue;
      const pa = projected[a];
      const pb = projected[b];
      const strength = front ? 0.65 : 0.22;
      const gradient = ctx.createLinearGradient(pa.x, pa.y, pb.x, pb.y);
      gradient.addColorStop(0, `rgba(${PRIMARY}, ${strength * pa.visibility})`);
      gradient.addColorStop(1, `rgba(${PRIMARY}, ${strength * pb.visibility})`);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = front ? 2 : 1;
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.lineTo(pb.x, pb.y);
      ctx.stroke();
    }
  };
  drawEdges(false);

  // 3) Ic cekirdek: ters yone donen silik ikosahedron.
  const core = CORE_NODES.map((v) => project(rotateXYZ(v, -rx * 1.4, -ry * 1.4, rz), size, focal));
  ctx.lineWidth = 1;
  ctx.strokeStyle = `rgba(${BRIGHT}, 0.16)`;
  ctx.beginPath();
  for (const [a, b] of CORE_EDGES) {
    ctx.moveTo(core[a].x, core[a].y);
    ctx.lineTo(core[b].x, core[b].y);
  }
  ctx.stroke();

  drawEdges(true);

  // 4) Veri paketleri: 3B'de interpolasyon, kisa bir kuyrukla.
  if (animated) {
    for (const p of scene.pulses) {
      for (let s = 3; s >= 0; s--) {
        const f = p.progress - s * 0.05;
        if (f < 0) continue;
        const a = rotated[p.from];
        const b = rotated[p.to];
        const pt = project(
          [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f],
          size,
          focal,
        );
        const alpha = (s === 0 ? 1 : 0.45 / s) * pt.visibility;
        ctx.fillStyle = `rgba(${BRIGHT}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, (s === 0 ? 0.075 : 0.05) * pt.k, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // 5) Dugumler: uzaktakiler once; yumusak hale, paket geldiginde parlar.
  const order = projected.map((p, i) => ({ p, i })).sort((a, b) => a.p.z - b.p.z);
  for (const { p, i } of order) {
    const glow = 0.06 + 0.22 * scene.flash[i];
    const haloRadius = NODE_RADIUS * p.k * (2.2 + 1.2 * scene.flash[i]);
    const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, haloRadius);
    halo.addColorStop(0, `rgba(${BRIGHT}, ${glow * p.visibility})`);
    halo.addColorStop(1, `rgba(${BRIGHT}, 0)`);
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(p.x, p.y, haloRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = `rgba(${scene.flash[i] > 0.05 ? BRIGHT : PRIMARY}, ${0.9 * p.visibility})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, NODE_RADIUS * p.k, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function NetworkGraphic({ paused = false }: { paused?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  // Ana efektin start/stop'una disaridan erisim (durdur butonu).
  const controlsRef = useRef<{ start: () => void; stop: () => void } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = createScene();
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
      draw(ctx, size, elapsed, scene, !reducedMotion);
    };

    const tick = (now: number) => {
      // Sekme arka planda kalip geri gelince buyuk bir sicrama olmasin.
      const dt = last === null ? 0 : Math.min(0.05, (now - last) / 1000);
      elapsed += dt;
      last = now;
      step(scene, dt);
      draw(ctx, size, elapsed, scene, true);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (reducedMotion || pausedRef.current || frame) return;
      last = null;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    // Canvas pointer-events-none oldugu icin imleci pencere uzerinden izle.
    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (event.clientX - (rect.left + rect.width / 2)) / window.innerWidth;
      const ny = (event.clientY - (rect.top + rect.height / 2)) / window.innerHeight;
      scene.target.x = Math.max(-1, Math.min(1, nx * 2)) * MAX_TILT;
      scene.target.y = Math.max(-1, Math.min(1, ny * 2)) * MAX_TILT;
    };
    if (!reducedMotion) window.addEventListener("pointermove", onPointerMove, { passive: true });

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Ekran disindayken animasyonu durdur.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    controlsRef.current = { start, stop };
    resize();
    start();

    return () => {
      stop();
      window.removeEventListener("pointermove", onPointerMove);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      controlsRef.current = null;
    };
  }, []);

  useEffect(() => {
    pausedRef.current = paused;
    if (paused) controlsRef.current?.stop();
    else controlsRef.current?.start();
  }, [paused]);

  return (
    <div className="relative w-full aspect-square max-w-125 flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
    </div>
  );
}
