import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Dumbbell({ mouseRef, scrollRef }: any) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.25;
    group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    group.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.8) * 0.15 -
      (scrollRef?.current || 0) * 1.5;

    if (mouseRef?.current) {
      const targetX = mouseRef.current.x * 0.3;
      const targetY = -mouseRef.current.y * 0.2;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        targetY,
        0.05
      );
      group.current.position.x = THREE.MathUtils.lerp(
        group.current.position.x,
        targetX,
        0.05
      );
    }
  });

  const metalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x222226,
        metalness: 0.9,
        roughness: 0.25,
      }),
    []
  );

  const accentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xff4d1c,
        metalness: 0.6,
        roughness: 0.3,
        emissive: 0xff4d1c,
        emissiveIntensity: 0.15,
      }),
    []
  );

  return (
    <group ref={group} scale={1}>
      {/* Bar */}
      <mesh material={metalMaterial} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 3.2, 32]} />
      </mesh>
      {/* Knurling grips */}
      {[-0.6, -0.3, 0, 0.3, 0.6].map((x, i) => (
        <mesh
          key={i}
          material={metalMaterial}
          position={[x, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.085, 0.085, 0.12, 8]} />
        </mesh>
      ))}
      {/* Left plates */}
      <mesh position={[-1.5, 0, 0]} material={metalMaterial}>
        <cylinderGeometry args={[0.7, 0.7, 0.25, 48]} />
        <meshStandardMaterial
          color={0x1a1a1e}
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[-1.7, 0, 0]} material={accentMaterial}>
        <cylinderGeometry args={[0.55, 0.55, 0.08, 48]} />
      </mesh>
      <mesh position={[-1.95, 0, 0]} material={metalMaterial}>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 48]} />
        <meshStandardMaterial
          color={0x1a1a1e}
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>
      {/* Right plates */}
      <mesh position={[1.5, 0, 0]} material={metalMaterial}>
        <cylinderGeometry args={[0.7, 0.7, 0.25, 48]} />
        <meshStandardMaterial
          color={0x1a1a1e}
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>
      <mesh position={[1.7, 0, 0]} material={accentMaterial}>
        <cylinderGeometry args={[0.55, 0.55, 0.08, 48]} />
      </mesh>
      <mesh position={[1.95, 0, 0]} material={metalMaterial}>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 48]} />
        <meshStandardMaterial
          color={0x1a1a1e}
          metalness={0.85}
          roughness={0.3}
        />
      </mesh>
      {/* Plate holes (decorative inner rings) */}
      <mesh position={[-1.5, 0, 0]} material={accentMaterial}>
        <torusGeometry args={[0.2, 0.03, 16, 48]} />
      </mesh>
      <mesh position={[1.5, 0, 0]} material={accentMaterial}>
        <torusGeometry args={[0.2, 0.03, 16, 48]} />
      </mesh>
    </group>
  );
}

interface Hero3DProps {
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  scrollRef: React.MutableRefObject<number>;
}

export default function Hero3D({ mouseRef, scrollRef }: Hero3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[-5, -3, 2]} intensity={0.6} color="#ff4d1c" />
      <pointLight position={[3, 2, -3]} intensity={0.4} color="#e8b04b" />
      <Dumbbell mouseRef={mouseRef} scrollRef={scrollRef} />
    </Canvas>
  );
}
