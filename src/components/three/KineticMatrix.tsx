"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  MeshTransmissionMaterial, 
  Float, 
  Environment, 
  PerspectiveCamera,
  ContactShadows,
  PresentationControls
} from "@react-three/drei";
import * as THREE from "three";

function Molecule() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate a fixed set of "Atoms" for the full molecular structure
  const atoms = useMemo(() => [
    { pos: [0, 0, 0], size: 0.6, color: "#CAF200" }, // Center Core
    { pos: [1.5, 1, 1], size: 0.4, color: "#ffffff" },
    { pos: [-1.5, -1, 1], size: 0.4, color: "#ffffff" },
    { pos: [1, -1.5, -1], size: 0.4, color: "#ffffff" },
    { pos: [-1, 1.5, -1], size: 0.4, color: "#ffffff" },
    { pos: [0, 2, 1.5], size: 0.3, color: "#00D9FF" },
    { pos: [0, -2, -1.5], size: 0.3, color: "#00D9FF" },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.z += 0.003;
      // Slight floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Center Core Interior Lattice (Increasing 'Fullness') */}
      {[...Array(12)].map((_, i) => (
        <mesh key={`inner-${i}`} position={[
          Math.sin(i) * 0.3,
          Math.cos(i) * 0.3,
          Math.sin(i * 2) * 0.3
        ]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color="#CAF200" 
            emissive="#CAF200" 
            emissiveIntensity={4} 
          />
        </mesh>
      ))}

      {/* Atoms */}
      {atoms.map((atom, i) => (
        <mesh key={i} position={atom.pos as any}>
          <sphereGeometry args={[atom.size, 32, 32]} />
          <MeshTransmissionMaterial 
            backside
            thickness={0.5}
            chromaticAberration={0.08}
            anisotropy={0.2}
            distortion={0.2}
            distortionScale={0.2}
            temporalDistortion={0.1}
            color={atom.color}
            attenuationDistance={0.5}
            attenuationColor={atom.color}
          />
        </mesh>
      ))}

      {/* Bonds (Connections) */}
      {atoms.slice(1).map((atom, i) => {
        // Create a cylinder between the center and the current atom
        const start = new THREE.Vector3(0, 0, 0);
        const end = new THREE.Vector3(...(atom.pos as [number, number, number]));
        const distance = start.distanceTo(end);
        const midpoint = start.clone().lerp(end, 0.5);
        
        return (
          <mesh 
            key={`bond-${i}`} 
            position={midpoint} 
            quaternion={new THREE.Quaternion().setFromUnitVectors(
              new THREE.Vector3(0, 1, 0), 
              end.clone().normalize()
            )}
          >
            <cylinderGeometry args={[0.05, 0.05, distance, 16]} />
            <meshStandardMaterial color="#333333" metalness={1} roughness={0.1} />
          </mesh>
        );
      })}

      {/* Interior Kinetic Glow */}
      <mesh>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color="#CAF200" 
          emissive="#CAF200" 
          emissiveIntensity={2} 
        />
      </mesh>
    </group>
  );
}

export default function KineticMatrix() {
  return (
    <div className="w-full h-full min-h-[500px] relative">
      <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.5} />
        <Environment preset="studio" />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#CAF200" />
        
        <PresentationControls 
          global 
          snap 
          rotation={[0, 0, 0]} 
          polar={[-Math.PI / 4, Math.PI / 4]} 
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <Molecule />
          </Float>
          
          <ContactShadows 
            position={[0, -3.5, 0]} 
            opacity={0.4} 
            scale={15} 
            blur={2} 
            far={4.5} 
          />
        </PresentationControls>
      </Canvas>
    </div>
  );
}
