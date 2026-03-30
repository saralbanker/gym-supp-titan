"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, ThreeElements } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, Text, MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function ExplodedJar({ exploded }: { exploded: boolean }) {
  const lidRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const moleculesRef = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const t = exploded ? 1 : 0;
    const lerpSpeed = 0.08;

    if (lidRef.current) {
      lidRef.current.position.y = THREE.MathUtils.lerp(lidRef.current.position.y, exploded ? 3.5 : 1.3, lerpSpeed);
    }
    
    if (shellRef.current && shellRef.current.material) {
      const mat = shellRef.current.material as any;
      shellRef.current.scale.setScalar(THREE.MathUtils.lerp(shellRef.current.scale.x, exploded ? 1.2 : 1, lerpSpeed));
      if (mat.opacity !== undefined) {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, exploded ? 0.1 : 0.3, lerpSpeed);
      }
    }

    if (coreRef.current) {
      coreRef.current.scale.y = THREE.MathUtils.lerp(coreRef.current.scale.y, exploded ? 0.2 : 1, lerpSpeed);
      coreRef.current.position.y = THREE.MathUtils.lerp(coreRef.current.position.y, exploded ? -1 : 0, lerpSpeed);
    }

    if (moleculesRef.current) {
      moleculesRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const targetY = exploded ? (i - 2.5) * 1.2 : 0;
        mesh.position.y = THREE.MathUtils.lerp(mesh.position.y, targetY, lerpSpeed);
        mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, exploded ? 1.5 : 0, lerpSpeed));
      });
    }

    if (textRef.current) {
      textRef.current.position.x = THREE.MathUtils.lerp(textRef.current.position.x, exploded ? 3 : 0, lerpSpeed);
      textRef.current.children.forEach((child) => {
        const textMesh = child as any;
        if (textMesh.fillOpacity !== undefined) {
          textMesh.fillOpacity = THREE.MathUtils.lerp(textMesh.fillOpacity, exploded ? 1 : 0, lerpSpeed);
        }
      });
    }
  });

  return (
    <group>
      {/* Outer Shell - Translucent Glass */}
      <mesh ref={shellRef}>
        <cylinderGeometry args={[1, 1, 2.5, 64]} />
        <MeshDistortMaterial 
          color="#ffffff" 
          transmission={0.9} 
          thickness={0.5} 
          roughness={0.05} 
          transparent 
          opacity={0.3} 
          distort={0.05}
        />
      </mesh>

      {/* Kinetic Core */}
      <mesh ref={coreRef}>
        <cylinderGeometry args={[0.8, 0.8, 2.2, 32]} />
        <MeshTransmissionMaterial 
          backside
          thickness={0.2}
          chromaticAberration={0.1}
          anisotropy={0.5}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          color="#00D9FF"
          emissive="#00D9FF"
          emissiveIntensity={1}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Lid - Metallic */}
      <mesh ref={lidRef} position={[0, 1.3, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.4, 64]} />
        <meshStandardMaterial 
          color="#050505" 
          metalness={1} 
          roughness={0.1} 
        />
      </mesh>

      {/* Analytical Molecules */}
      <group ref={moleculesRef}>
        {[...Array(6)].map((_, i) => (
          <mesh key={i} position={[0, 0, 0]} scale={[0, 0, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshStandardMaterial 
              color="#CAF200" 
              emissive="#CAF200" 
              emissiveIntensity={2} 
            />
          </mesh>
        ))}
      </group>

      {/* Analytical UI Text */}
      <group ref={textRef}>
        <Text position={[0, 1.2, 0]} fontSize={0.2} color="#CAF200" anchorX="left">
          ISOLATE MATRIX [99.8%]
        </Text>
        <Text position={[0, 0.4, 0]} fontSize={0.2} color="#CAF200" anchorX="left">
          KINETIC BIOAVAILABILITY
        </Text>
        <Text position={[0, -0.4, 0]} fontSize={0.2} color="#CAF200" anchorX="left">
          ZERO SYNTHETIC FILLERS
        </Text>
        <Text position={[0, -1.2, 0]} fontSize={0.2} color="#00D9FF" anchorX="left">
          SATELLITE SOURCE: MUNICH NODE
        </Text>
      </group>
    </group>
  );
}

export default function ExplodedProductScene({ exploded }: { exploded: boolean }) {
  return (
    <div className="w-full h-full min-h-[600px] cursor-pointer bg-black/20 rounded-xl overflow-hidden backdrop-blur-sm">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.5} />
        <Environment preset="night" />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <ExplodedJar exploded={exploded} />

        <OrbitControls enableZoom={false} makeDefault />
      </Canvas>
    </div>
  );
}
