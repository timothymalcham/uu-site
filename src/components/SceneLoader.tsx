import { useState } from 'react'
import { Balls } from '../scenes/balls'

export function SceneLoader() {
    const [isLoading, setIsLoading] = useState(true)
    const [showOverlay, setShowOverlay] = useState(true)

    const handleSceneLoad = () => {
        // Start fade out
        setIsLoading(false)

        // Remove overlay after fade completes
        setTimeout(() => {
            setShowOverlay(false)
        }, 600) // Match transition duration
    }

    return (
        <>
            {showOverlay && (
                <div
                    className={`fixed inset-0 bg-black z-[9999] flex items-center justify-center transition-opacity duration-500 ${!isLoading ? 'opacity-0' : 'opacity-100'}`}
                >
                    <div className="text-[#FFBF00] text-4xl font-['Bluu_Next'] animate-pulse">loading…</div>
                </div>
            )}
            <div className="absolute inset-0 w-full h-full z-1 opacity-40">
                <Balls onLoad={handleSceneLoad} />
            </div>
        </>
    )
}