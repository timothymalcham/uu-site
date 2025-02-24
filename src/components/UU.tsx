import { useEffect, useRef, useState } from 'react';

const rotations = [45, 90, 180, -45, -90, -180, 0, 0, 0, 0]; // Include more 0s to make rotation less frequent
const blankProbability = 0.33; // 60% chance of a cell being blank

export function UU() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [grid, setGrid] = useState<{ rows: number; cols: number }>({ rows: 0, cols: 0 });
    const [letterRotations, setLetterRotations] = useState<number[]>([]);
    const [visibleCells, setVisibleCells] = useState<boolean[]>([]);

    // Character dimensions in pixels (approximate)
    const charWidth = 10;  // Width of 'U' character
    const charHeight = 10; // Height of 'U' character
    const gap = 3;         // Gap between characters

    // Function to generate new rotations and visibility
    const generateGridState = (count: number) => {
        const newRotations = Array.from({ length: count }, () =>
            rotations[Math.floor(Math.random() * rotations.length)]
        );
        const newVisibility = Array.from({ length: count }, () =>
            Math.random() > blankProbability
        );
        return { rotations: newRotations, visibility: newVisibility };
    };

    useEffect(() => {
        const updateDimensions = () => {
            if (!containerRef.current) return;

            const { width, height } = containerRef.current.getBoundingClientRect();
            setDimensions({ width, height });

            // Calculate how many characters can fit
            const cols = Math.floor(width / (charWidth + gap));
            const rows = Math.floor(height / (charHeight + gap));
            setGrid({ rows, cols });

            // Generate initial state
            const totalLetters = rows * cols;
            const { rotations, visibility } = generateGridState(totalLetters);
            setLetterRotations(rotations);
            setVisibleCells(visibility);
        };

        updateDimensions();

        // Update on resize
        const observer = new ResizeObserver(updateDimensions);
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Effect for periodic rotation updates
    useEffect(() => {
        const interval = setInterval(() => {
            const totalLetters = grid.rows * grid.cols;
            const { rotations, visibility } = generateGridState(totalLetters);
            setLetterRotations(rotations);
            setVisibleCells(visibility);
        }, 4200);

        return () => clearInterval(interval);
    }, [grid.rows, grid.cols]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full relative overflow-hidden"
        >
            <div
                className="absolute inset-0 grid place-items-center"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${grid.cols}, ${charWidth + gap}px)`,
                    gap: `${gap}px`,
                    padding: `${gap}px`
                }}
            >
                {Array.from({ length: grid.rows * grid.cols }).map((_, i) => (
                    <span
                        key={i}
                        className="font-sans text-neutral-700 select-none transition-all duration-2000 ease-in-out hover:text-neutral-100"
                        style={{
                            width: `${charWidth}px`,
                            height: `${charHeight}px`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: `rotate(${letterRotations[i] || 0}deg)`,
                            transformOrigin: 'center',
                            opacity: visibleCells[i] ? 1 : 0
                        }}
                    >
                        U
                    </span>
                ))}
            </div>
        </div>
    );
}