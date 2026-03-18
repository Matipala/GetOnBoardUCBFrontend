import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-ucb-blue flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo image */}
                <div className="flex justify-center mb-6">
                    <img src="/1.png" alt="Get On Board UCB" className="h-70 rounded-lg" />
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Iniciar sesión</h1>
                    <p className="text-gray-500 text-sm mb-6">Ingresa con tu cuenta UCB</p>

                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                placeholder="usuario@ucb.edu.bo"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-950 text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-900 transition-colors mt-2"
                        >
                            Entrar
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-slate-50 mt-6">
                    <Link href="/" className="hover:underline">
                        ← Volver al inicio
                    </Link>
                </p>
            </div>
        </div >
    );
}