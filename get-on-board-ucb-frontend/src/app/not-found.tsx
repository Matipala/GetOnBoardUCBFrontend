import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
          <FileQuestion size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Página no encontrada
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-950 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-blue-900 transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
