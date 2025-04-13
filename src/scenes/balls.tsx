import { MathUtils, PerspectiveCamera, Vector3 } from 'three'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Points, Point, PointMaterial, OrbitControls, Float, Sparkles, Lightformer, Environment, MeshDistortMaterial, ContactShadows, MeshTransmissionMaterial, Text3D } from '@react-three/drei'
import { Autofocus, Bloom, ChromaticAberration, DepthOfField, EffectComposer, Noise, N8AO, Sepia } from '@react-three/postprocessing'
import { a } from '@react-spring/three'
import { BlendFunction } from 'postprocessing'

const positions = Array.from({ length: 200 }, (i) => [
    MathUtils.randFloatSpread(20),
    MathUtils.randFloatSpread(25),
    MathUtils.randFloatSpread(20),
])

export function Balls() {
    return (
        <div id="canvas-container" className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 15], fov: 25, near: 0.1, far: 5000 }}
            >
                <ambientLight intensity={2} color="orange" />
                <Float floatIntensity={0.05} speed={0.5}>
                    <group>
                        {positions.map((position, i) => (
                            <mesh key={i} position={new Vector3(position[0], position[1], position[2])}>
                                <sphereGeometry args={[0.5, 64, 64]} />
                                <MeshDistortMaterial
                                    distort={0.5}
                                    color="white"
                                    envMapIntensity={1}
                                    clearcoat={1}
                                    clearcoatRoughness={0}
                                    roughness={0.5}
                                    metalness={0.1}
                                    ior={0.5}
                                />
                            </mesh>
                        ))}
                    </group>
                </Float>
                <Environment preset="warehouse" />
                <EffectComposer>
                    <Autofocus focusRange={0} focalLength={0.02} bokehScale={4} width={1024} height={1024} mouse manual />
                    <ChromaticAberration intensity={0.025} blur />
                    <Bloom mipmapBlur luminanceThreshold={0.25} intensity={0.25} />
                    <Noise opacity={0.25} blendFunction={BlendFunction.DARKEN} />
                </EffectComposer>
                {/* <OrbitControls enableZoom={false} /> */}
            </Canvas>
        </div>
    )
}