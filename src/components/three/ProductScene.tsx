"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  MeshTransmissionMaterial, 
  Float, 
  Environment, 
  ContactShadows, 
  PresentationControls, 
  PerspectiveCamera,
  MeshDistortMaterial
} from "@react-three/drei";
import * as THREE from "three";

function Scene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.z += 0.002;
    }
    if (coreRef.current) {
      coreRef.current.rotation.y -= 0.01;
    }
  });

  return (
    <>
      <PresentationControls 
        global 
        snap 
        rotation={[0, 0.3, 0]} 
        polar={[-Math.PI / 3, Math.PI / 3]} 
        azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
      >
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <group scale={1.2}>
            {/* Main Kinetic Capsule - Hyper-Realistic Glass */}
            <mesh ref={meshRef}>
              <cylinderGeometry args={[1, 1, 2.5, 64]} />
              <MeshTransmissionMaterial 
                backside
                backsideThickness={1}
                thickness={0.5}
                chromaticAberration={0.05}
                anisotropy={0.1}
                distortion={0.1}
                distortionScale={0.1}
                temporalDistortion={0.1}
                clearcoat={1}
                attenuationDistance={0.5}
                attenuationColor="#ffffff"
                color="#ffffff"
                transparent
                opacity={0.3}
              />
            </mesh>

            {/* Kinetic Core (Powder/Energy) - Using Transmission for Solid Refractive Effect */}
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
                color="#CAF200"
                emissive="#CAF200"
                emissiveIntensity={1}
                transparent
                opacity={0.8}
              />
            </mesh>

            {/* Precision Cap - Anodized Metallic */}
            <mesh position={[0, 1.3, 0]}>
              <cylinderGeometry args={[1.05, 1.05, 0.15, 64]} />
              <meshStandardMaterial 
                color="#1a1a1a" 
                roughness={0.1} 
                metalness={1} 
              />
            </mesh>
            <mesh position={[0, 1.45, 0]}>
              <cylinderGeometry args={[0.9, 0.9, 0.2, 64]} />
              <meshStandardMaterial 
                color="#050505" 
                roughness={0} 
                metalness={1} 
              />
            </mesh>

            {/* Molecular Particles */}
            {[...Array(20)].map((_, i) => (
              <Particle key={i} />
            ))}
          </group>
        </Float>

        <ContactShadows 
          position={[0, -2, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={4.5} 
        />
      </PresentationControls>
    </>
  );
}

function Particle() {
  const ref = useRef<THREE.Mesh>(null);
  const [x, y, z] = useMemo(() => [
    (Math.random() - 0.5) * 2,
    (Math.random() - 0.5) * 3,
    (Math.random() - 0.5) * 2
  ], []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y += Math.sin(state.clock.elapsedTime + x) * 0.005;
    }
  });

  return (
    <mesh ref={ref} position={[x, y, z]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshStandardMaterial color="#00D9FF" emissive="#00D9FF" emissiveIntensity={2} />
    </mesh>
  );
}

export default function ProductScene() {
  return (
    <div className="w-full h-full min-h-[600px] relative">
      {/* Dynamic Digital Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <div className="w-full h-full bg-[linear-gradient(rgba(202,242,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(202,242,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.5} />
        <Environment preset="city" />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Scene />
      </Canvas>
    </div>
  );
}
