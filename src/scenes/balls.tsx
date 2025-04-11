import { MathUtils } from 'three'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Points, Point, PointMaterial, OrbitControls, Float, Sparkles } from '@react-three/drei'
import { DepthOfField } from '@react-three/postprocessing'

const positions = Array.from({ length: 200 }, (i) => [
    MathUtils.randFloatSpread(200),
    MathUtils.randFloatSpread(200),
    MathUtils.randFloatSpread(200),
])

export function Balls() {
    return (
        <div id="canvas-container" className="w-full h-full">
            {/* @ts-expect-error */}
            <Canvas raycaster={{ params: { Points: { threshold: 0.2 } } }} camera={{ position: [0, 0, 100] }}>
                <Float floatIntensity={0.5}>
                    <Points limit={positions.length}>
                        <PointMaterial
                            transparent
                            vertexColors
                            size={50}
                            sizeAttenuation={false}
                            depthTest={false}
                            toneMapped={false}
                        />
                        {positions.map((position, i) => (
                            <PointEvent key={i} index={i} position={position} />
                        ))}
                    </Points>
                </Float>
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    )
}

// @ts-expect-error
function PointEvent({ index, ...props }) {
    const [hovered, setHover] = useState(false)
    const [clicked, setClick] = useState(false)
    return (
        <mesh {...props}>
            <sphereGeometry args={[4, 32, 32]} />
            <meshBasicMaterial color="orange" />
        </mesh>
    )
}

