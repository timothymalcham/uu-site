import { MathUtils, Vector3 } from 'three'
import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, Environment, MeshDistortMaterial, PerformanceMonitor } from '@react-three/drei'
import { ChromaticAberration, EffectComposer, Noise, Scanline, DotScreen, HueSaturation, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { Physics, RigidBody, BallCollider } from "@react-three/rapier";

// Detect mobile devices
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

const sphereSegments = isMobile ? 16 : 32

const positions = Array.from({ length: 125 }, () => [
    MathUtils.randFloatSpread(12),
    MathUtils.randFloatSpread(15),
    MathUtils.randFloatSpread(12),
])

export function Balls({ onLoad }: { onLoad?: () => void }) {
    const [perfSucks, degrade] = useState(false)
    const [sceneReady, setSceneReady] = useState(false)
    const [assetsLoaded, setAssetsLoaded] = useState(false)

    useEffect(() => {
        // Only call onLoad when both the scene is created AND initial frame is rendered
        if (sceneReady && assetsLoaded && onLoad) {
            // Small delay to ensure smooth first frame
            setTimeout(() => onLoad(), 2000)
        }
    }, [sceneReady, assetsLoaded, onLoad])

    return (
        <div id="canvas-container" className="w-full h-full">
            <Suspense fallback={null}>
                <Canvas
                    dpr={[1, perfSucks ? 1.5 : 2]}
                    camera={{ position: [0, 0, 15], fov: isMobile ? 50 : 20, near: 0.1, far: 1000 }}
                    onCreated={({ gl, scene, camera }) => {
                        // Compile shaders
                        gl.compile(scene, camera)
                        setSceneReady(true)

                        // Wait for first render frame
                        requestAnimationFrame(() => {
                            setAssetsLoaded(true)
                        })
                    }}
                >
                    <Physics>
                        {/*<PerformanceMonitor onDecline={() => degrade(true)} />*/}
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} color="#FFBB00" />
                        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#FF6B00" />
                        <pointLight position={[0, 0, 0]} intensity={2} color="#FFBB00" />
                        <Float floatIntensity={0.025} speed={0.025}>
                            <group>
                                {positions.map((position, i) => {
                                    // get a random speed between 0.1-0.35
                                    const speed = MathUtils.randFloatSpread(0.25) + 0.01
                                    // get a random distort between 0.5-1.25
                                    const distort = MathUtils.randFloatSpread(0.75) + 1
                                    return (
                                        <RigidBody key={i} colliders="hull" restitution={1} gravityScale={0}>
                                            <mesh position={new Vector3(position[0], position[1], position[2])}>
                                                <sphereGeometry args={[0.5, sphereSegments, sphereSegments]} />
                                                <MeshDistortMaterial
                                                    speed={speed}
                                                    distort={distort}
                                                    color="black"
                                                    envMapIntensity={0.25}
                                                    clearcoat={0.25}
                                                    clearcoatRoughness={0}
                                                    roughness={0}
                                                    metalness={0}
                                                    ior={0.5}
                                                />
                                                <BallCollider args={[0.5]} />
                                            </mesh>
                                        </RigidBody>
                                    )
                                })}
                            </group>
                        </Float>
                        <Environment preset="warehouse" backgroundRotation={[0, 100, 0]} resolution={128} background backgroundIntensity={0.5} backgroundBlurriness={0.25} frames={perfSucks ? 1 : Infinity} environmentIntensity={0.25} />
                        <EffectComposer>
                            {/* <Autofocus focusRange={0} focalLength={0.1} bokehScale={3} width={1080} height={1080} mouse manual /> */}
                            <ChromaticAberration intensity={5} blur={false} />
                            <Noise opacity={0.25} blendFunction={BlendFunction.LINEAR_BURN} />
                            <Scanline opacity={0.25} blendFunction={BlendFunction.LINEAR_BURN} />
                            <DotScreen opacity={0.25} blendFunction={BlendFunction.MULTIPLY} />
                        </EffectComposer>
                        <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={0.05} />
                    </Physics>
                </Canvas>
            </Suspense>
        </div>
    )
}