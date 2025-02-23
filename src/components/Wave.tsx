import { useEffect, useState } from 'react';

interface Props {
    numColumns?: number;
    numRows?: number;
    waveSpeed?: number;
    waveWidth?: number;
}

export default function Wave({
    numColumns = 12,
    numRows = 10,
    waveSpeed = 150,
    waveWidth = 2
}: Props) {
    const [activeColumns, setActiveColumns] = useState<number[]>([]);
    const [currentColumn, setCurrentColumn] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // Calculate which columns should be active in the current wave
            const newActiveColumns = [];
            for (let i = 0; i < waveWidth; i++) {
                const column = (currentColumn + i) % numColumns;
                newActiveColumns.push(column);
            }
            setActiveColumns(newActiveColumns);

            // Move the wave forward one column
            setCurrentColumn((prev) => (prev + 1) % numColumns);
        }, waveSpeed);

        return () => clearInterval(interval);
    }, [currentColumn, numColumns, waveSpeed, waveWidth]);

    return (
        <div className="grid gap-1 p-1 bg-stone-700"
            style={{
                gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
                gridTemplateRows: `repeat(${numRows}, 1fr)`
            }}>
            {Array.from({ length: numColumns * numRows }).map((_, index) => {
                const column = index % numColumns;

                return (
                    <div
                        key={index}
                        className={`w-10 h-10 rounded-full transition-all duration-[2000ms] ease-in-out ${activeColumns.includes(column) ? 'bg-amber-400' : 'bg-stone-900'}`}
                    />
                );
            })}
        </div>
    );
}
