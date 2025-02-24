export function Wave2({
    elements
}: {
    elements: number
}) {
    return (
        <div className="flex flex-row flex-wrap justify-start items-start p-2 px-3 col-span-7 row-span-5 col-start-6 gap-4">
            {Array.from({ length: elements }).map((_, i) => (
                <div key={i} className="w-1 h-7 bg-stone-600 transform rotate-[-10deg]" />
            ))}
        </div>
    )
}