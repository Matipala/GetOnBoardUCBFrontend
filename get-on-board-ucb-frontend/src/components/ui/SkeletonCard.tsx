export function SkeletonCard() {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
            {/* Línea de título */}
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
            {/* Línea de empresa */}
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
            {/* Línea de ubicación */}
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
            {/* Badges */}
            <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded-full w-20" />
                <div className="h-6 bg-gray-200 rounded-full w-16" />
            </div>
        </div>
    );
}