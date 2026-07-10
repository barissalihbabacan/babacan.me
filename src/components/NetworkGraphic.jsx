import React from "react";

export default function NetworkGraphic() {
  const nodes = [
    { id: 1, cx: 250, cy: 250, r: 16, color: "var(--color-primary)", delay: "0s", z: 40 },
    { id: 2, cx: 150, cy: 150, r: 12, color: "rgba(255, 255, 255, 0.8)", delay: "-2s", z: 20 },
    { id: 3, cx: 380, cy: 120, r: 10, color: "rgba(255, 255, 255, 0.6)", delay: "-4s", z: 30 },
    { id: 4, cx: 400, cy: 350, r: 14, color: "var(--color-primary)", delay: "-1s", z: 50 },
    { id: 5, cx: 120, cy: 380, r: 9, color: "rgba(255, 255, 255, 0.7)", delay: "-3s", z: 15 },
    { id: 6, cx: 200, cy: 60, r: 6, color: "rgba(255, 255, 255, 0.5)", delay: "-5s", z: 10 },
    { id: 7, cx: 450, cy: 220, r: 8, color: "rgba(255, 255, 255, 0.9)", delay: "-2.5s", z: 25 },
    { id: 8, cx: 280, cy: 420, r: 11, color: "rgba(255, 255, 255, 0.6)", delay: "-1.5s", z: 35 },
    { id: 9, cx: 60, cy: 250, r: 10, color: "var(--color-primary)", delay: "-0.5s", z: 45 },
  ];

  const connections = [
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 8],
    [2, 6],
    [2, 9],
    [3, 7],
    [3, 6],
    [4, 7],
    [4, 8],
    [5, 9],
    [5, 8],
  ];

  return (
    <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center overflow-hidden">
      <style>
        {`
          @keyframes rotatePlane {
            0% { transform: perspective(1000px) rotateX(60deg) rotateZ(0deg); }
            100% { transform: perspective(1000px) rotateX(60deg) rotateZ(360deg); }
          }
          @keyframes floatZ {
            0%, 100% { transform: translateZ(0px); }
            50% { transform: translateZ(30px); }
          }
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.3; filter: drop-shadow(0 0 4px var(--color-primary)); }
            50% { opacity: 0.8; filter: drop-shadow(0 0 12px var(--color-primary)); }
          }
          @keyframes dataFlow {
            0% { stroke-dashoffset: 100; }
            100% { stroke-dashoffset: 0; }
          }
          .scene-3d {
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
            animation: rotatePlane 40s linear infinite;
          }
          .node-animate {
            transform-style: preserve-3d;
          }
          .line-base {
            stroke: rgba(255, 255, 255, 0.1);
            stroke-width: 1.5;
          }
          .line-flow {
            stroke: var(--color-primary);
            stroke-width: 1.5;
            stroke-dasharray: 6 12;
            animation: dataFlow 2s linear infinite;
            opacity: 0.8;
          }
        `}
      </style>

      <div className="scene-3d absolute inset-0">
        <svg
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          style={{ overflow: "visible" }}
        >
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid base */}
          <g opacity="0.2">
            {[...Array(11)].map((_, i) => (
              <line
                key={`grid-h-${i}`}
                x1="0"
                y1={i * 50}
                x2="500"
                y2={i * 50}
                stroke="var(--color-primary)"
                strokeWidth="0.5"
              />
            ))}
            {[...Array(11)].map((_, i) => (
              <line
                key={`grid-v-${i}`}
                x1={i * 50}
                y1="0"
                x2={i * 50}
                y2="500"
                stroke="var(--color-primary)"
                strokeWidth="0.5"
              />
            ))}
          </g>

          {/* Base shadow glow */}
          <circle cx="250" cy="250" r="200" fill="url(#glow)" />

          {/* Connections */}
          <g>
            {connections.map(([startId, endId], idx) => {
              const start = nodes.find((n) => n.id === startId);
              const end = nodes.find((n) => n.id === endId);
              return (
                <g key={`conn-${idx}`}>
                  <line x1={start.cx} y1={start.cy} x2={end.cx} y2={end.cy} className="line-base" />
                  <line
                    x1={start.cx}
                    y1={start.cy}
                    x2={end.cx}
                    y2={end.cy}
                    className="line-flow"
                    style={{ animationDelay: `${idx * 0.2}s` }}
                  />
                </g>
              );
            })}
          </g>

          {/* Nodes popping out in 3D */}
          {nodes.map((n) => (
            <g
              key={`node-${n.id}`}
              className="node-animate"
              style={{
                transform: `translateZ(${n.z}px)`,
                animation: `floatZ 4s ease-in-out infinite`,
                animationDelay: n.delay,
              }}
            >
              {/* Dropline to grid */}
              <line
                x1={n.cx}
                y1={n.cy}
                x2={n.cx}
                y2={n.cy}
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
                strokeDasharray="2 2"
                style={{ transform: `translateZ(-${n.z}px)` }}
              />

              {n.color === "var(--color-primary)" && (
                <circle
                  cx={n.cx}
                  cy={n.cy}
                  r={n.r * 1.5}
                  fill="none"
                  stroke={n.color}
                  strokeWidth="1"
                  style={{
                    animation: "pulseGlow 3s ease-in-out infinite",
                    animationDelay: n.delay,
                  }}
                />
              )}
              <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.color} />
            </g>
          ))}
        </svg>
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 30%, var(--color-surface) 70%)",
        }}
      ></div>
    </div>
  );
}
