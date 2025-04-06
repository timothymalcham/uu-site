import { Canvas } from '@react-three/fiber'

export function Hero() {
    return (
        <div id="canvas-container" className="w-full min-h-[750px] mx-auto">
            <Canvas>
                <mesh>
                    <sphereGeometry args={[2, 32, 32]} />
                    <meshBasicMaterial />
                </mesh>
                <ambientLight intensity={0.1} />
                <directionalLight position={[0, 0, 5]} color="red" />
            </Canvas>
        </div>
    )
}