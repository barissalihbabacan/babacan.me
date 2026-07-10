import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Sphere } from "@react-three/drei";

function NetworkScene() {
  const group = useRef();
  const linesRef = useRef([]);

  // Generate nodes
  const nodes = useMemo(() => {
    return Array.from({ length: 20 }).map(() => ({
      position: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8],
      isPrimary: Math.random() > 0.7,
      size: Math.random() * 0.15 + 0.05,
    }));
  }, []);

  // Generate connections
  const connections = useMemo(() => {
    const conns = [];
    for (let i = 0; i < nodes.length; i++) {
      // Connect to 1 or 2 random nearby nodes to make it look like a web
      const numConns = Math.floor(Math.random() * 2) + 1;
      for (let j = 0; j < numConns; j++) {
        const targetIdx = Math.floor(Math.random() * nodes.length);
        if (targetIdx !== i) {
          conns.push([nodes[i].position, nodes[targetIdx].position]);
        }
      }
    }
    return conns;
  }, [nodes]);

  // Animation loop
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1;
      group.current.rotation.x += delta * 0.05;
    }
    // Animate line dashes
    linesRef.current.forEach((line) => {
      if (line && line.material) {
        line.material.dashOffset -= delta * 1.5;
      }
    });
  });

  return (
    <group ref={group}>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <Sphere key={`node-${i}`} args={[node.size, 16, 16]} position={node.position}>
          <meshBasicMaterial
            color={node.isPrimary ? "#c084fc" : "#aaaaaa"}
            transparent
            opacity={node.isPrimary ? 0.9 : 0.5}
          />
        </Sphere>
      ))}

      {/* Connections */}
      {connections.map((points, i) => (
        <Line
          key={`conn-${i}`}
          ref={(el) => (linesRef.current[i] = el)}
          points={points}
          color={i % 3 === 0 ? "#c084fc" : "#ffffff"}
          lineWidth={1.5}
          dashed
          dashSize={0.2}
          gapSize={0.4}
          transparent
          opacity={0.3}
        />
      ))}
    </group>
  );
}

export default function NetworkGraphic() {
  return (
    <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} className="w-full h-full">
        {/* Soft fog to fade edges into the background */}
        <fog attach="fog" args={["#000000", 6, 14]} />
        <NetworkScene />
      </Canvas>
      {/* Vignette overlay to blend the graphic smoothly into the site's background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 40%, var(--color-surface) 75%)",
        }}
      ></div>
    </div>
  );
}
