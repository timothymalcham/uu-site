import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Environment, MeshDistortMaterial, ContactShadows, AccumulativeShadows, RandomizedLight, OrbitControls } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'
import { useState, useRef } from 'react'

const AnimatedMaterial = a(MeshDistortMaterial)

export function Hero() {
    const sphere = useRef(null)
    const light = useRef(null)

    const [{ coat, color, ambient, env }] = useSpring(
        {
            wobble: 1.2,
            coat: 0.05,
            ambient: 1.5,
            env: 0.4,
            color: "#222",
        },
        []
    )

    return (
        <div id="canvas-container" className="w-full min-h-[900px] mx-auto">
            <Canvas shadows camera={{ position: [0, 0, 4.5], fov: 50 }}>
                <group position={[0, -0.65, 0]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={90}>
                        <a.ambientLight intensity={ambient} />
                        <a.pointLight ref={light} position-z={-15} intensity={env} color="#F8C069" />
                    </PerspectiveCamera>

                    <mesh ref={sphere} position={[-5, 2, -4]}>
                        <sphereGeometry args={[1, 64, 64]} />
                        <AnimatedMaterial distort={0.6} speed={1} color={color} envMapIntensity={env} clearcoat={coat} clearcoatRoughness={0.1} metalness={0.05} />
                    </mesh>

                    <mesh position={[-2, -1.25, 0.15]}>
                        <sphereGeometry args={[1, 64, 64]} />
                        <AnimatedMaterial distort={0.6} speed={1} color={color} envMapIntensity={env} clearcoat={coat} clearcoatRoughness={0.1} metalness={0.05} />
                    </mesh>

                    <mesh position={[0, 1, 0.85]}>
                        <sphereGeometry args={[1, 64, 64]} />
                        <AnimatedMaterial distort={0.6} speed={1} color={color} envMapIntensity={env} clearcoat={coat} clearcoatRoughness={0.1} metalness={0.05} />
                    </mesh>

                    <mesh position={[2, -1.25, 0]}>
                        <sphereGeometry args={[1, 64, 64]} />
                        <AnimatedMaterial distort={0.6} speed={1} color={color} envMapIntensity={env} clearcoat={coat} clearcoatRoughness={0.1} metalness={0.05} />
                    </mesh>

                    <mesh position={[4, 2, -0.5]}>
                        <sphereGeometry args={[1, 64, 64]} />
                        <AnimatedMaterial distort={0.5} speed={1} color={color} envMapIntensity={env} clearcoat={coat} clearcoatRoughness={0.1} metalness={0.05} />
                    </mesh>
                </group>
                <Environment preset="warehouse" />
            </Canvas>
        </div>
    )
}