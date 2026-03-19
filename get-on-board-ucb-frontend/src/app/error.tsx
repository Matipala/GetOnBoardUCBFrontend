"use client";

// este componente se mostrara automaticamente cuando cualquier pagina o componente del arbol lanza un error no capturado

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center max-w-md mx-auto px-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⚠️</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Algo salió mal</h2>
                <p className="text-gray-500 text-sm mb-6">{error.message}</p>
                {/* reset() vuelve a renderizar el componente que falló */}
                <button
                    type="button"
                    onClick={reset}
                    className="bg-blue-950 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-900 transition-colors"
                >
                    Reintentar
                </button>
            </div>
        </div>
    );
}