import { MathUtils, PerspectiveCamera, Vector3 } from 'three'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Points, Point, PointMaterial, OrbitControls, Float, Sparkles, Lightformer, Environment, MeshDistortMaterial, ContactShadows, MeshTransmissionMaterial, Text3D, PerformanceMonitor } from '@react-three/drei'
import { Autofocus, Bloom, ChromaticAberration, DepthOfField, EffectComposer, Noise, N8AO, Sepia, Scanline, DotScreen, ToneMapping, Vignette, LensFlare } from '@react-three/postprocessing'
import { a } from '@react-spring/three'
import { BlendFunction } from 'postprocessing'

const positions = Array.from({ length: 200 }, (i) => [
    MathUtils.randFloatSpread(20),
    MathUtils.randFloatSpread(25),
    MathUtils.randFloatSpread(20),
])

export function Balls() {
    const [perfSucks, degrade] = useState(false)
    return (
        <div id="canvas-container" className="w-full h-full">
            <Canvas
                dpr={[1, perfSucks ? 1.5 : 2]}
                camera={{ position: [0, 0, 15], fov: 25, near: 0.1, far: 1000 }}
            >
                <PerformanceMonitor onDecline={() => degrade(true)} />
                <ambientLight intensity={4} color="#0092FF" />
                <Float floatIntensity={0.05} speed={0.5}>
                    <group>
                        {positions.map((position, i) => (
                            <mesh key={i} position={new Vector3(position[0], position[1], position[2])}>
                                <sphereGeometry args={[0.5, 64, 64]} />
                                <MeshDistortMaterial
                                    distort={0.5}
                                    color="white"
                                    envMapIntensity={1}
                                    clearcoat={0.25}
                                    clearcoatRoughness={0}
                                    roughness={0.5}
                                    metalness={0}
                                    ior={0.5}
                                />
                            </mesh>
                        ))}
                    </group>
                </Float>
                <Environment preset="warehouse" resolution={1024} background backgroundIntensity={0.75} backgroundBlurriness={0.75} frames={perfSucks ? 1 : Infinity} environmentIntensity={0.75} />
                <EffectComposer>
                    <Autofocus focusRange={0} focalLength={0.02} bokehScale={4} width={1024} height={1024} mouse manual />
                    <ChromaticAberration intensity={0.05} blur={false} />
                    {/* <Bloom mipmapBlur luminanceThreshold={0.15} intensity={0.05} /> */}
                    <Noise opacity={0.5} blendFunction={BlendFunction.LINEAR_BURN} />
                    <Scanline opacity={0.25} blendFunction={BlendFunction.LINEAR_BURN} />
                    {/* <DotScreen opacity={0.5} blendFunction={BlendFunction.MULTIPLY} /> */}
                </EffectComposer>
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    )
}