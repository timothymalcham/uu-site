import { useEffect, useRef, useState } from 'react';

export function Wave2({
    elements
}: {
    elements: number
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [elementPositions, setElementPositions] = useState<Array<{ x: number, y: number }>>([]);

    useEffect(() => {
        const updateElementPositions = () => {
            if (!containerRef.current) return;

            const elements = containerRef.current.getElementsByClassName('wave-element');
            const newPositions = [];

            for (let i = 0; i < elements.length; i++) {
                const rect = elements[i].getBoundingClientRect();
                newPositions.push({
                    x: rect.left + rect.width / 2,
                    y: rect.top + rect.height / 2
                });
            }

            setElementPositions(newPositions);
        };

        updateElementPositions();
        window.addEventListener('resize', updateElementPositions);

        return () => window.removeEventListener('resize', updateElementPositions);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const calculateRotation = (elementIndex: number) => {
        if (!elementPositions[elementIndex]) return 0;

        const element = elementPositions[elementIndex];
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect) return 0;

        // Calculate angle between element and mouse position
        const dx = mousePos.x - (element.x - containerRect.left);
        const dy = mousePos.y - (element.y - containerRect.top);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        // Add 90 degrees to make elements point towards mouse
        return angle + 90;
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative flex flex-row flex-wrap justify-start items-start p-2 px-3 col-span-7 row-span-5 col-start-6 gap-4"
        >
            {Array.from({ length: elements }).map((_, i) => (
                <div
                    key={i}
                    className="wave-element w-0.5 h-7 transition-transform duration-2000 ease-out bg-stone-400"
                    style={{
                        transform: `rotate(${calculateRotation(i)}deg)`
                    }}
                />
            ))}
        </div>
    );
}