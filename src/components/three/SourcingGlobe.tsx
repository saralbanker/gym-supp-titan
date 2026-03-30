"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Points, 
  PointMaterial, 
  MeshTransmissionMaterial,
  Html,
  Environment,
  Float
} from "@react-three/drei";
import * as THREE from "three";

function SourcingCore() {
  const coreRef = useRef<THREE.Group>(null);
  const scannerRef = useRef<THREE.Mesh>(null);

  // Generate sourcing nodes with pulsing logic - matching the 'Human Expansion' palette
  const nodes = useMemo(() => [
    { pos: [2.5, 0, 0], name: "MUNICH_NODE", color: "#CAF200" },
    { pos: [-1.5, 2, 0.5], name: "TOKYO_ISOLATE", color: "#00D9FF" },
    { pos: [0.8, -2.2, 1], name: "OSLO_ANALYSIS", color: "#ffffff" },
    { pos: [-2, -0.8, -1.5], name: "DENVER_DEPOT", color: "#CAF200" },
    { pos: [1.2, 1.2, -2], name: "SINGAPORE_FLUX", color: "#00D9FF" },
  ], []);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.003;
    }
    if (scannerRef.current) {
      scannerRef.current.rotation.x += 0.01;
      scannerRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={coreRef}>
      {/* Central Kinetic Nucleus - Solid & Refractive */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshTransmissionMaterial 
            backside
            thickness={1}
            chromaticAberration={0.05}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.2}
            temporalDistortion={0.1}
            color="#00D9FF"
            attenuationDistance={1}
            attenuationColor="#00D9FF"
          />
        </mesh>
        
        {/* Core Glow */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial 
            color="#CAF200" 
            emissive="#CAF200" 
            emissiveIntensity={2} 
          />
        </mesh>
      </Float>

      {/* Scanning HUD Ring Overlay */}
      <mesh ref={scannerRef}>
        <torusGeometry args={[3, 0.01, 16, 100]} />
        <meshStandardMaterial 
          color="#CAF200" 
          emissive="#CAF200" 
          emissiveIntensity={1} 
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Sourcing Points & Labels */}
      {nodes.map((node, i) => (
        <group key={i} position={node.pos as [number, number, number]}>
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial 
              color={node.color} 
              emissive={node.color} 
              emissiveIntensity={3} 
            />
          </mesh>
          <Html distanceFactor={15} position={[0, 0.3, 0]}>
            <div className="whitespace-nowrap px-4 py-2 bg-background/90 border border-secondary/30 backdrop-blur-xl rounded-lg shadow-2xl text-[10px] font-space font-bold text-secondary uppercase tracking-[0.3em] pointer-events-none">
              {node.name}
            </div>
          </Html>
          
          {/* Connection Line to Center */}
          <line>
            <bufferGeometry attach="geometry">
              <float32BufferAttribute 
                attach="attributes-position"
                args={[new Float32Array([0, 0, 0, -node.pos[0], -node.pos[1], -node.pos[2]]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial attach="material" color={node.color} transparent opacity={0.1} />
          </line>
        </group>
      ))}

      <DataCloud />
    </group>
  );
}

function DataCloud() {
  const points = useMemo(() => {
    const p = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
        p[i * 3] = (Math.random() - 0.5) * 20;
        p[i * 3 + 1] = (Math.random() - 0.5) * 20;
        p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  }, []);

  return (
    <Points positions={points} stride={3}>
      <PointMaterial 
        transparent 
        color="#ffffff" 
        size={0.05} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.2}
      />
    </Points>
  );
}

export default function SourcingGlobe() {
  return (
    <div className="w-full h-full min-h-[700px] flex items-center justify-center">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} />
        <ambientLight intensity={0.5} />
        <Environment preset="studio" />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <React.Suspense fallback={null}>
            <SourcingCore />
        </React.Suspense>
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
