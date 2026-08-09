import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  Component,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Error boundary to catch WebGL Context Creation errors
interface WebGLBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface WebGLBoundaryState {
  hasError: boolean;
}

class WebGLBoundary extends Component<WebGLBoundaryProps, WebGLBoundaryState> {
  constructor(props: WebGLBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): WebGLBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn(
      "WebGL context could not be created or failed. Falling back to SVG graphic.",
      error,
      errorInfo,
    );
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function FallbackGraphic() {
  return null;
}

interface DodecahedronNetworkProps {
  isDesktop: boolean;
}

function DodecahedronNetwork({ isDesktop }: DodecahedronNetworkProps) {
  const group = useRef<THREE.Group>(null);

  const { nodes, edges } = useMemo(() => {
    const geometry = new THREE.DodecahedronGeometry(3.5, 0);
    const positionAttribute = geometry.getAttribute("position");
    const vertices: THREE.Vector3[] = [];

    for (let i = 0; i < positionAttribute.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(positionAttribute, i);
      if (!vertices.some((existing) => existing.distanceTo(v) < 0.1)) {
        vertices.push(v);
      }
    }

    const edgeList: [THREE.Vector3Tuple, THREE.Vector3Tuple][] = [];
    const edgesGeometry = new THREE.EdgesGeometry(geometry);
    const edgesPos = edgesGeometry.getAttribute("position");

    for (let i = 0; i < edgesPos.count; i += 2) {
      const v1 = new THREE.Vector3().fromBufferAttribute(edgesPos, i);
      const v2 = new THREE.Vector3().fromBufferAttribute(edgesPos, i + 1);
      edgeList.push([v1.toArray(), v2.toArray()]);
    }

    return { nodes: vertices.map((v) => v.toArray()), edges: edgeList };
  }, []);

  const time = useRef(0);

  useFrame((_state, delta) => {
    if (group.current) {
      time.current += delta;
      const t = time.current;
      group.current.rotation.x = t * 0.1 + Math.sin(t * 0.3) * 0.5;
      group.current.rotation.y = t * 0.15 + Math.cos(t * 0.2) * 0.5;
      group.current.rotation.z = Math.sin(t * 0.1) * 0.5;
    }
  });

  const primaryColor = "#c5a059";

  return (
    <>
      <group ref={group} scale={1.1} position={[0, 0, 0]}>
        {edges.map((points, i) => (
          <Line
            key={`edge-${i}`}
            points={points}
            color={primaryColor}
            lineWidth={2}
            transparent
            opacity={0.5}
          />
        ))}

        {nodes.map((pos, i) => (
          <Sphere key={`node-${i}`} args={[0.15, 16, 16]} position={pos}>
            <meshBasicMaterial color={primaryColor} transparent opacity={0.9} />
          </Sphere>
        ))}

        <Sphere args={[2, 32, 32]}>
          <meshBasicMaterial color={primaryColor} transparent opacity={0.03} wireframe />
        </Sphere>
      </group>

      <OrbitControls enabled={isDesktop} enableZoom={false} enablePan={false} autoRotate={false} />
    </>
  );
}

export default function NetworkGraphic() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [webGLAvailable, setWebGLAvailable] = useState(true);

  useEffect(() => {
    setWebGLAvailable(checkWebGLSupport());
    const mq = window.matchMedia("(min-width: 1025px)");
    setIsDesktop(mq.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  if (!webGLAvailable) return null;

  return (
    <div className="relative w-full aspect-square max-w-125 flex items-center justify-center cursor-grab active:cursor-grabbing">
      <WebGLBoundary fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 9], fov: 60 }}
          className="w-full h-full"
          onCreated={({ gl }) => {
            // Ensure gl doesn't crash on loss
            gl.domElement.addEventListener("webglcontextlost", (e) => {
              e.preventDefault();
              setWebGLAvailable(false);
            });
          }}
        >
          <fog attach="fog" args={["#000000", 6, 15]} />
          <DodecahedronNetwork isDesktop={isDesktop} />
        </Canvas>
      </WebGLBoundary>
    </div>
  );
}
