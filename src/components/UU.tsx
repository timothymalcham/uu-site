import { useEffect, useRef } from 'react';

export function UU() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

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
        const cellSize = 20; // Size of each cell in pixels
        const cols = Math.floor(canvas.width / cellSize);
        const rows = Math.floor(canvas.height / cellSize);

        // Clear canvas
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw the grid of 'u' characters
        ctx.fillStyle = '#818181';
        ctx.font = '16px "Bluu Next"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.imageSmoothingEnabled = false; // Disable anti-aliasing

        const shouldRenderCell = () => Math.random() < 0.4;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (shouldRenderCell()) {
                    const x = col * cellSize + cellSize / 2;
                    const y = row * cellSize + cellSize / 2;
                    ctx.fillText('U', x, y);
                }
            }
        }

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
            for (let row = 0; row < newRows; row++) {
                for (let col = 0; col < newCols; col++) {
                    if (shouldRenderCell()) {
                        const x = col * cellSize + cellSize / 2;
                        const y = row * cellSize + cellSize / 2;
                        ctx.fillText('U', x, y);
                    }
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
        />
    );
}