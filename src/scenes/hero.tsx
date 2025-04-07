import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Environment, MeshDistortMaterial, ContactShadows, AccumulativeShadows, RandomizedLight, OrbitControls } from '@react-three/drei'
import { useSpring } from '@react-spring/core'
import { a } from '@react-spring/three'
import { useState, useRef } from 'react'
import { DepthOfField, Noise, ChromaticAberration, EffectComposer, Bloom, Autofocus, DotScreen, Glitch, HueSaturation } from '@react-three/postprocessing'
import { BlendFunction, GlitchMode } from 'postprocessing'

const AnimatedMaterial = a(MeshDistortMaterial)

export function Hero() {
    const sphere = useRef(null)
    const light = useRef(null)

    const [{ coat, color, env }] = useSpring(
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
        <div id="canvas-container" className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 4], fov: 90 }}
                gl={{
                    powerPreference: "high-performance",
                    alpha: true,
                    antialias: false,
                    stencil: false,
                    depth: false
                }}>
                <group position={[0, 0, 0]}>
                    <mesh ref={sphere} position={[-20, 5, -15]}>
                        <sphereGeometry args={[1, 64, 64]} />
                        <AnimatedMaterial distort={0.6} speed={0.7} color={color} envMapIntensity={env} clearcoat={coat} clearcoatRoughness={0.125} metalness={0.05} />
                    </mesh>

                    <mesh position={[-2, -1.25, 0.15]}>
                        <sphereGeometry args={[1, 64, 64]} />
                        <AnimatedMaterial distort={0.6} speed={0.7} color={color} envMapIntensity={env} clearcoat={coat} clearcoatRoughness={0.125} metalness={0.05} />
                    </mesh>

                    <mesh position={[0, 1, 0.85]}>
                        <sphereGeometry args={[1, 64, 64]} />
                        <AnimatedMaterial distort={0.6} speed={0.7} color={color} envMapIntensity={env} clearcoat={coat} clearcoatRoughness={0.125} metalness={0.05} />
                    </mesh>

                    <mesh position={[2, -1.25, 0]}>
                        <sphereGeometry args={[1, 64, 64]} />
                        <AnimatedMaterial distort={0.6} speed={0.7} color={color} envMapIntensity={env} clearcoat={coat} clearcoatRoughness={0.125} metalness={0.05} />
                    </mesh>

                    <mesh position={[4, 2, -0.5]}>
                        <sphereGeometry args={[1, 64, 64]} />
                        <AnimatedMaterial distort={0.5} speed={0.7} color={color} envMapIntensity={env} clearcoat={coat} clearcoatRoughness={0.125} metalness={0.05} />
                    </mesh>
                </group>

                <Environment preset="warehouse" />

                <EffectComposer multisampling={0} enableNormalPass={false}>
                    <Autofocus mouse={false} focusDistance={0.01} focalLength={0.02} />
                    <DepthOfField
                        focusDistance={0}
                        focalLength={0.02}
                        bokehScale={3}
                        height={750}
                    />
                    <ChromaticAberration
                        blendFunction={BlendFunction.NORMAL} // blend mode
                        offset={[0.0005, 0.0005]} // color offset
                    />
                    {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
                    <Noise opacity={0.05} />
                </EffectComposer>
            </Canvas>
        </div>
    )
}