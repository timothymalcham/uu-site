import { useState } from 'react'
import { Balls } from '../scenes/balls'

export function SceneLoader() {
    const [isLoading, setIsLoading] = useState(true)
    
    const handleSceneLoad = () => {
        setTimeout(() => {
            setIsLoading(false)
        }, 500) // Small delay to ensure everything is rendered
    }
    
    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 bg-black z-[9999] flex items-center justify-center transition-opacity duration-500" style={{ opacity: isLoading ? 1 : 0 }}>
                    <div className="text-[#FFBF00] text-6xl font-['Bluu_Next'] animate-pulse">loading...</div>
                </div>
            )}
            <div className="absolute inset-0 w-full h-full z-1 opacity-40">
                <Balls onLoad={handleSceneLoad} />
            </div>
        </>
    )
}