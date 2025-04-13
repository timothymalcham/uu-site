import { MathUtils, PerspectiveCamera, Vector3 } from 'three'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Points, Point, PointMaterial, OrbitControls, Float, Sparkles, Lightformer, Environment, MeshDistortMaterial, ContactShadows } from '@react-three/drei'
import { Autofocus, ChromaticAberration, DepthOfField, EffectComposer, N8AO } from '@react-three/postprocessing'
import { a } from '@react-spring/three'

const positions = Array.from({ length: 200 }, (i) => [
    MathUtils.randFloatSpread(50),
    MathUtils.randFloatSpread(50),
    MathUtils.randFloatSpread(50),
])

export function Balls() {
    return (
        <div id="canvas-container" className="w-full h-full">
            <Canvas
                gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
                camera={{ position: [0, 0, 25], fov: 25, near: 0.1, far: 1000 }}
                onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
                // @ts-expect-error
                raycaster={{ params: { Points: { threshold: 0.2 } } }}
            >
                <Float floatIntensity={0.5}>
                    <group>
                        {positions.map((position, i) => (
                            <mesh key={i} position={new Vector3(position[0], position[1], position[2])}>
                                <sphereGeometry args={[0.75, 64, 64]} />
                                <MeshDistortMaterial
                                    speed={5}
                                    color="#E8B059"
                                    envMapIntensity={0.4}
                                    clearcoat={0.5}
                                    clearcoatRoughness={0}
                                    metalness={0.1}
                                />
                            </mesh>
                        ))}
                    </group>
                </Float>
                <Environment preset="dawn" />
                <ContactShadows
                    rotation={[Math.PI / 2, 0, 0]}
                    position={[0, -1.6, 0]}
                    opacity={0.8}
                    width={15}
                    height={15}
                    blur={2.5}
                    far={1.6}
                />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    )
}