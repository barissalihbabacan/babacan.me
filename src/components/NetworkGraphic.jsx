import React from "react";

export default function NetworkGraphic() {
  const nodes = [
    { id: 1, cx: 250, cy: 250, r: 16, color: "var(--color-primary)", delay: "0s" },
    { id: 2, cx: 150, cy: 150, r: 12, color: "rgba(255, 255, 255, 0.8)", delay: "0.5s" },
    { id: 3, cx: 380, cy: 120, r: 10, color: "rgba(255, 255, 255, 0.6)", delay: "1s" },
    { id: 4, cx: 400, cy: 350, r: 14, color: "var(--color-primary)", delay: "1.5s" },
    { id: 5, cx: 120, cy: 380, r: 9, color: "rgba(255, 255, 255, 0.7)", delay: "0.8s" },
    { id: 6, cx: 200, cy: 60, r: 6, color: "rgba(255, 255, 255, 0.5)", delay: "0.3s" },
    { id: 7, cx: 450, cy: 220, r: 8, color: "rgba(255, 255, 255, 0.9)", delay: "1.2s" },
    { id: 8, cx: 280, cy: 420, r: 11, color: "rgba(255, 255, 255, 0.6)", delay: "0.7s" },
    { id: 9, cx: 60, cy: 250, r: 10, color: "var(--color-primary)", delay: "1.1s" },
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
    <div className="relative w-full aspect-square max-w-[500px]">
      <style>
        {`
          @keyframes floatNode {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes pulseGlow {
            0%, 100% { opacity: 0.3; filter: drop-shadow(0 0 4px var(--color-primary)); }
            50% { opacity: 0.8; filter: drop-shadow(0 0 12px var(--color-primary)); }
          }
          @keyframes dataFlow {
            0% { stroke-dashoffset: 100; }
            100% { stroke-dashoffset: 0; }
          }
          .node-animate {
            animation: floatNode 6s ease-in-out infinite;
          }
          .line-base {
            stroke: rgba(255, 255, 255, 0.1);
            stroke-width: 1.5;
          }
          .line-flow {
            stroke: var(--color-primary);
            stroke-width: 1.5;
            stroke-dasharray: 6 12;
            animation: dataFlow 3s linear infinite;
            opacity: 0.6;
          }
        `}
      </style>
      <svg
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{
          maskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 80%)",
        }}
      >
        {/* Core background glow */}
        <circle
          cx="250"
          cy="250"
          r="150"
          fill="var(--color-primary)"
          opacity="0.05"
          filter="blur(40px)"
        />

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

        {/* Nodes */}
        {nodes.map((n) => (
          <g
            key={`node-${n.id}`}
            className="node-animate"
            style={{ animationDelay: n.delay, transformOrigin: `${n.cx}px ${n.cy}px` }}
          >
            {n.color === "var(--color-primary)" && (
              <circle
                cx={n.cx}
                cy={n.cy}
                r={n.r * 1.5}
                fill="none"
                stroke={n.color}
                strokeWidth="1"
                className="opacity-50"
                style={{ animation: "pulseGlow 4s ease-in-out infinite", animationDelay: n.delay }}
              />
            )}
            <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.color} />
          </g>
        ))}
      </svg>
    </div>
  );
}
