import { MathUtils, Vector3 } from 'three'
import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Environment, MeshDistortMaterial, PerformanceMonitor } from '@react-three/drei'
import { Autofocus, ChromaticAberration, EffectComposer, Noise, Scanline, DotScreen, LensFlare } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Physics, RigidBody, BallCollider } from "@react-three/rapier";

const positions = Array.from({ length: 250 }, (i) => [
    MathUtils.randFloatSpread(17),
    MathUtils.randFloatSpread(20),
    MathUtils.randFloatSpread(15),
])

export function Balls() {
    const [perfSucks, degrade] = useState(false)
    return (
        <div id="canvas-container" className="w-full h-full">
            <Canvas
                dpr={[1, perfSucks ? 1.5 : 2]}
                camera={{ position: [0, 0, 15], fov: 25, near: 0.1, far: 1000 }}
            >
                <Suspense fallback={null}>
                    <Physics>
                        <PerformanceMonitor onDecline={() => degrade(true)} />
                        <ambientLight intensity={4} color="#0092FF" />
                        <Float floatIntensity={0.05} speed={0.5}>
                            <group>
                                {positions.map((position, i) => {
                                    // get a random speed between 0.1-0.35
                                    const speed = MathUtils.randFloatSpread(0.25) + 0.1
                                    // get a random distort between 0.5-1.25
                                    const distort = MathUtils.randFloatSpread(0.75) + 0.5
                                    return (
                                        <RigidBody colliders={"hull"} restitution={2} gravityScale={0}>
                                            <mesh key={i} position={new Vector3(position[0], position[1], position[2])}>
                                                <sphereGeometry args={[0.5, 64, 64]} />
                                                <MeshDistortMaterial
                                                    speed={speed}
                                                    distort={distort}
                                                    color="white"
                                                    envMapIntensity={1}
                                                    clearcoat={0.25}
                                                    clearcoatRoughness={0}
                                                    roughness={0.5}
                                                    metalness={0}
                                                    ior={0.5}
                                                />
                                                <BallCollider args={[0.5]} />
                                                <BallCollider args={[0.5]} position={[1, 0, 0]} />
                                            </mesh>
                                        </RigidBody>
                                    )
                                })}
                            </group>
                        </Float>
                        <Environment preset="warehouse" resolution={256} background backgroundIntensity={0.75} backgroundBlurriness={0.2} frames={perfSucks ? 1 : Infinity} environmentIntensity={0.75} />
                        <EffectComposer>
                            <Autofocus focusRange={0} focalLength={0.02} bokehScale={4} width={1024} height={1024} mouse manual />
                            <ChromaticAberration intensity={0.05} blur={false} />
                            {/* <Bloom mipmapBlur luminanceThreshold={0.15} intensity={0.05} /> */}
                            <Noise opacity={0.2} blendFunction={BlendFunction.LINEAR_BURN} />
                            <Scanline opacity={0.25} blendFunction={BlendFunction.LINEAR_BURN} />
                            <DotScreen opacity={0.15} blendFunction={BlendFunction.MULTIPLY} />
                        </EffectComposer>
                        <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={0.075} />
                    </Physics>
                </Suspense>
            </Canvas>
        </div>
    )
}