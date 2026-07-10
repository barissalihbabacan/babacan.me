import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Sphere } from "@react-three/drei";
import * as THREE from "three";

function DodecahedronNetwork({ isDesktop }) {
  const group = useRef();

  // Create a 3D Dodecahedron (which consists of 12 pentagonal faces)
  const { nodes, edges } = useMemo(() => {
    const geometry = new THREE.DodecahedronGeometry(3.5, 0);
    const positionAttribute = geometry.getAttribute("position");
    const vertices = [];

    // Extract unique vertices for nodes
    for (let i = 0; i < positionAttribute.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(positionAttribute, i);
      if (!vertices.some((existing) => existing.distanceTo(v) < 0.1)) {
        vertices.push(v);
      }
    }

    // Extract edges to draw connections
    const edgeList = [];
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesPos = edgesGeometry.getAttribute("position");

    for (let i = 0; i < edgesPos.count; i += 2) {
      const v1 = new THREE.Vector3().fromBufferAttribute(edgesPos, i);
      const v2 = new THREE.Vector3().fromBufferAttribute(edgesPos, i + 1);
      edgeList.push([v1.toArray(), v2.toArray()]);
    }

    return { nodes: vertices.map((v) => v.toArray()), edges: edgeList };
  }, []);

  // Idle rotation
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.15;
      group.current.rotation.x += delta * 0.1;
    }
  });

  const primaryColor = "#c5a059";

  return (
    <>
      <group ref={group}>
        {/* Draw the connection lines between pentagon vertices */}
        {edges.map((points, i) => (
          <Line
            key={`edge-${i}`}
            points={points}
            color={primaryColor}
            lineWidth={1.5}
            transparent
            opacity={0.4}
          />
        ))}

        {/* Draw the nodes (data points) at the vertices */}
        {nodes.map((pos, i) => (
          <Sphere key={`node-${i}`} args={[0.15, 16, 16]} position={pos}>
            <meshBasicMaterial color={primaryColor} transparent opacity={0.8} />
          </Sphere>
        ))}

        {/* Inner subtle glow / core */}
        <Sphere args={[2, 32, 32]}>
          <meshBasicMaterial color={primaryColor} transparent opacity={0.03} wireframe />
        </Sphere>
      </group>

      {/* Enable drag/rotate only on desktop */}
      <OrbitControls enabled={isDesktop} enableZoom={false} enablePan={false} autoRotate={false} />
    </>
  );
}

export default function NetworkGraphic() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > 1024);
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 9], fov: 60 }} className="w-full h-full">
        <fog attach="fog" args={["#000000", 6, 15]} />
        <DodecahedronNetwork isDesktop={isDesktop} />
      </Canvas>
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
