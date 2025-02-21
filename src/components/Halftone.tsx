import react from '@astrojs/react';
import { useEffect, useRef, useState } from 'react';

/**
 * HalftoneNoise creates an animated halftone pattern using Perlin noise
 * @param {Object} props
 * @param {number} props.speed - Milliseconds between animation frames (default: 100ms = 10 FPS)
 * @param {number} props.dotSize - Maximum radius of each dot in pixels (default: 4px)
 * @param {number} props.spacing - Distance between dots in pixels (default: 8px)
 * @param {number} props.noiseScale - Scale factor for the noise pattern (default: 0.02)
 * @param {number} props.animationIncrement - How much to advance the noise pattern per frame (default: 0.01)
 * @param {number} props.sharpness - Controls dot edge definition (0-1, default: 0.8)
 */
function HalftoneNoise({
    speed = 100,
    dotSize = 4,
    spacing = 8,
    noiseScale = 0.02,
    animationIncrement = 0.01,
    sharpness = 0.8
}: {
    speed: number;
    dotSize: number;
    spacing: number;
    noiseScale: number;
    animationIncrement: number;
    sharpness: number;
}) {
    const canvasRef = useRef(null);
    const [time, setTime] = useState(0);

    // Function to generate Perlin noise
    const noise = (x: number, y: number, z: number) => {
        // Permutation table
        const p = new Array(512);
        for (let i = 0; i < 256; i++) {
            p[i] = p[i + 256] = Math.floor(Math.random() * 256);
        }

        // Find unit cube that contains point
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;

        // Find relative x, y, z of point in cube
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);

        // Compute fade curves for each of x, y, z
        const u = fade(x);
        const v = fade(y);
        const w = fade(z);

        // Hash coordinates of the 8 cube corners
        const A = p[X] + Y;
        const AA = p[A] + Z;
        const AB = p[A + 1] + Z;
        const B = p[X + 1] + Y;
        const BA = p[B] + Z;
        const BB = p[B + 1] + Z;

        // Add blended results from 8 corners of cube
        return lerp(w,
            lerp(v,
                lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
                lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z))
            ),
            lerp(v,
                lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)),
                lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1))
            )
        );
    };

    // Fade function as defined by Ken Perlin
    const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

    // Linear interpolation
    const lerp = (t: number, a: number, b: number) => a + t * (b - a);

    // Gradient function
    const grad = (hash: number, x: number, y: number, z: number) => {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    };

    // Function to create a dot with controlled sharpness
    const drawDot = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, intensity: number) => {
        // Create a radial gradient for the dot
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

        // Calculate gradient stops based on sharpness
        // Higher sharpness moves the transition point closer to the edge
        const transitionPoint = Math.max(0.1, 1 - sharpness);

        // Start with full intensity at the center
        gradient.addColorStop(0, `rgba(0, 0, 0, ${intensity})`);

        // Add a sharp transition point
        gradient.addColorStop(transitionPoint, `rgba(0, 0, 0, ${intensity * 0.9})`);

        // Fade to transparent at the edge
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        // Draw the dot using the gradient
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    };

    // Drawing function that renders a single frame
    const drawFrame = () => {
        if (!canvasRef.current) return;
        const canvas: HTMLCanvasElement = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear the canvas with a white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the dot pattern
        for (let x = spacing; x < canvas.width; x += spacing) {
            for (let y = spacing; y < canvas.height; y += spacing) {
                // Calculate noise value for this position and current time
                const noiseValue = (noise(
                    x * noiseScale,
                    y * noiseScale,
                    time * 0.5
                ) + 1) * 0.5;

                // Scale the dot radius based on the noise value
                const radius = noiseValue * dotSize;

                // Draw the dot with controlled sharpness
                drawDot(ctx, x, y, radius, 1.0);
            }
        }
    };

    useEffect(() => {
        // Initial render
        drawFrame();

        // Set up the animation interval
        const intervalId = setInterval(() => {
            setTime(prevTime => prevTime + animationIncrement);
        }, speed);

        // Clean up interval on unmount or when props change
        return () => clearInterval(intervalId);
    }, [speed, animationIncrement]); // Recreate interval when speed or increment changes

    // Effect to redraw when time changes or when visual props change
    useEffect(() => {
        drawFrame();
    }, [time, dotSize, spacing, noiseScale, sharpness]);

    return (
        <div className="flex items-center justify-center w-full h-full bg-gray-100 p-4">
            <div className="bg-white rounded-lg shadow-lg p-4">
                <canvas
                    ref={canvasRef}
                    width={320}
                    height={320}
                    className="bg-white rounded"
                />
            </div>
        </div>
    );
};

export default HalftoneNoise;