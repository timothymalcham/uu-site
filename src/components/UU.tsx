import { useEffect, useRef } from 'react';

type Cell = {
    visible: boolean;
    currentRotation: number;
    targetRotation: number;
    previousRotation: number;
    animationStartTime: number | null;
};

const ROTATION_OPTIONS = [45, 90, 180, -45, -90, -180];
const ANIMATION_INTERVAL = 5000; // 4 seconds
const ANIMATION_DURATION = 2000; // 2 seconds

export function UU() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gridRef = useRef<Cell[][]>([]);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size to match its display size, accounting for device pixel ratio
        const updateCanvasSize = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            // Set the canvas size in actual pixels
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            // Scale the canvas CSS size to match display size
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            // Scale the context to handle the device pixel ratio
            ctx.scale(dpr, dpr);
        };
        updateCanvasSize();

        // Set up the grid
        const cellSize = 14; // Size of each cell in pixels
        const cols = Math.floor(canvas.width / cellSize);
        const rows = Math.floor(canvas.height / cellSize);

        // Clear canvas
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the grid of 'u' characters
        ctx.fillStyle = '#818181';
        ctx.font = '1rem "Bluu Next"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.imageSmoothingEnabled = false; // Disable anti-aliasing

        // Initialize grid
        gridRef.current = Array(rows).fill(0).map(() =>
            Array(cols).fill(0).map(() => ({
                visible: Math.random() < 0.6,
                currentRotation: 0,
                targetRotation: 0,
                previousRotation: 0,
                animationStartTime: null
            }))
        );

        const drawGrid = (timestamp: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const cell = gridRef.current[row][col];
                    if (cell.visible) {
                        const x = col * cellSize + cellSize / 2;
                        const y = row * cellSize + cellSize / 2;

                        // Handle rotation animation
                        if (cell.animationStartTime !== null) {
                            const progress = (timestamp - cell.animationStartTime) / ANIMATION_DURATION;
                            if (progress >= 1) {
                                cell.currentRotation = cell.targetRotation;
                                cell.animationStartTime = null;
                            } else {
                                // Interpolate between previous and target rotation
                                cell.currentRotation = cell.previousRotation +
                                    (cell.targetRotation - cell.previousRotation) * progress;
                            }
                        }

                        ctx.save();
                        ctx.translate(x, y);
                        ctx.rotate(cell.currentRotation * Math.PI / 180);
                        ctx.fillText('U', 0, 0);
                        ctx.restore();
                    }
                }
            }

            animationFrameRef.current = requestAnimationFrame(drawGrid);
        };

        // Start animation loop
        animationFrameRef.current = requestAnimationFrame(drawGrid);

        // Set up rotation interval
        const rotationInterval = setInterval(() => {
            const timestamp = performance.now();
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const cell = gridRef.current[row][col];
                    if (cell.visible) {
                        cell.previousRotation = cell.currentRotation;
                        // Add new rotation to current rotation
                        const newRotation = ROTATION_OPTIONS[Math.floor(Math.random() * ROTATION_OPTIONS.length)];
                        cell.targetRotation = cell.currentRotation + newRotation;
                        cell.animationStartTime = timestamp;
                    }
                }
            }
        }, ANIMATION_INTERVAL);

        // Handle window resize
        const handleResize = () => {
            updateCanvasSize();
            // Redraw the grid when the window is resized
            const rect = canvas.getBoundingClientRect();
            ctx.fillStyle = "transparent";
            ctx.fillRect(0, 0, rect.width, rect.height);
            const newCols = Math.floor(rect.width / cellSize);
            const newRows = Math.floor(rect.height / cellSize);
            ctx.fillStyle = '#818181';
            ctx.font = '16px "Bluu Next"';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.imageSmoothingEnabled = false;
            // Reinitialize grid with new dimensions
            gridRef.current = Array(newRows).fill(0).map(() =>
                Array(newCols).fill(0).map(() => ({
                    visible: Math.random() < 0.6,
                    currentRotation: 0,
                    targetRotation: 0,
                    animationStartTime: null
                }))
            );
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            clearInterval(rotationInterval);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
        />
    );
}