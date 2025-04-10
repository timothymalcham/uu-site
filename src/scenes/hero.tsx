import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Lightformer, Environment, MeshDistortMaterial, ContactShadows, AccumulativeShadows, RandomizedLight, OrbitControls, MeshTransmissionMaterial, Float, Html, Text } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'
import { useState, useRef } from 'react'
import { DepthOfField, Noise, ChromaticAberration, EffectComposer, Bloom, Autofocus, DotScreen, Glitch, HueSaturation, N8AO, TiltShift2 } from '@react-three/postprocessing'
import { BlendFunction, GlitchMode } from 'postprocessing'
import { easing } from "maath"

const AnimatedMaterial = a(MeshDistortMaterial)

export function Hero() {
    return (
        <div id="canvas-container" className="w-full h-full">
            <Canvas orthographic camera={{ position: [6, -5, 10], zoom: 120 }}>
                <ambientLight />
                <Float floatIntensity={2}>
                    <group position={[0, 0, 0]}>
                        <group position={[-20, 5, -15]}>
                            <mesh receiveShadow castShadow>
                                <sphereGeometry args={[1, 64, 64]} />
                                <AnimatedMaterial
                                    distort={0.6}
                                    speed={0.7}
                                    envMapIntensity={2}
                                    clearcoat={1}
                                    clearcoatRoughness={0.5}
                                    roughness={0.8}
                                    metalness={0.2}
                                    transparent
                                    opacity={0.3}
                                    transmission={0.6}
                                    color="#fff"
                                />
                            </mesh>
                        </group>

                        <group position={[-2, -1.25, 0.15]}>
                            <mesh receiveShadow castShadow>
                                <sphereGeometry args={[1, 64, 64]} />
                                <AnimatedMaterial
                                    distort={0.6}
                                    speed={0.7}
                                    envMapIntensity={2}
                                    clearcoat={1}
                                    clearcoatRoughness={0.5}
                                    roughness={0.8}
                                    metalness={0.2}
                                    transparent
                                    opacity={0.3}
                                    transmission={0.6}
                                    color="#fff"
                                />
                            </mesh>
                        </group>

                        <group position={[0, 1, 0.85]}>
                            <mesh>
                                <sphereGeometry args={[1, 64, 64]} />
                                <AnimatedMaterial
                                    distort={0.6}
                                    speed={0.7}
                                    envMapIntensity={2}
                                    clearcoat={1}
                                    clearcoatRoughness={0.5}
                                    roughness={0.8}
                                    metalness={0.2}
                                    transparent
                                    opacity={0.3}
                                    transmission={0.6}
                                    color="#fff"
                                />
                            </mesh>
                        </group>

                        <group position={[2, -1.25, 0]}>
                            <mesh>
                                <sphereGeometry args={[1, 64, 64]} />
                                <AnimatedMaterial
                                    distort={0.6}
                                    speed={0.7}
                                    envMapIntensity={2}
                                    clearcoat={1}
                                    clearcoatRoughness={0.5}
                                    roughness={0.8}
                                    metalness={0.2}
                                    transparent
                                    opacity={0.3}
                                    transmission={0.6}
                                    color="#fff"
                                />
                            </mesh>
                        </group>

                        <group position={[4, 3, -0.5]}>
                            <mesh>
                                <sphereGeometry args={[1, 64, 64]} />
                                <AnimatedMaterial
                                    distort={0.6}
                                    speed={0.7}
                                    thickness={0.1}
                                    roughness={1}
                                    toneMapped={true}
                                    opacity={0.3}
                                    transparent
                                    color="#fff"
                                />
                            </mesh>
                        </group>
                        <group position={[4, 3.2, -0.5]}>
                            <mesh>
                                <sphereGeometry args={[1, 64, 64]} />
                                <AnimatedMaterial
                                    distort={0.6}
                                    speed={0.7}
                                    color="#fff"
                                    thickness={0.1}
                                    roughness={1}
                                    toneMapped={true}
                                    opacity={0.3}
                                    transparent
                                />
                            </mesh>
                        </group>
                    </group>
                </Float>

                <Environment resolution={1000}>
                    <group rotation={[-Math.PI / 2, 0, 0]}>
                        <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
                        {[2, 0, 2, 0, 2, 0, 2, 0].map((x, i) => (
                            <Lightformer key={i} form="circle" intensity={4} rotation={[Math.PI / 2, 0, 0]} position={[x, 4, i * 4]} scale={[4, 1, 1]} />
                        ))}
                        <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[50, 2, 1]} />
                        <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[50, 2, 1]} />
                        <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[50, 2, 1]} />
                    </group>
                </Environment>
            </Canvas>
        </div>
    )
}