import { useEffect, useRef } from 'react';

const rotations = [45, 90, 180, -45, -90, -180, 0, 0, 0, 0]; // Include more 0s to make rotation less frequent
const blankProbability = 0.45; // 45% chance of a cell being blank

export function UU() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
        />
    );
}