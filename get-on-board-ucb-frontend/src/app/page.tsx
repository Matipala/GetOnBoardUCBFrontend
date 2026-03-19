import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="bg-ucb-blue border-b border-ucb-yellow">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src="/2.png" alt="UCB Logo" className="w-50 h-auto" />
          </div>
          <Link
            href="/login"
            className="bg-blue-950 text-ucb-yellow px-4 py-2 rounded-lg text-sm font-semibold hover:bg-ucb-blue transition-colors"
          >
            Iniciar sesión
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <span className="inline-block bg-ucb-yellow text-ucb-blue text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
          Universidad Católica Boliviana
        </span>
        <h1 className="text-5xl font-extrabold text-ucb-yellow leading-tight mb-6">
          Conectando talento UCB
          <br />
          con oportunidades reales
        </h1>
        <p className="text-lg text-ucb-blue max-w-xl mx-auto mb-10">
          La plataforma oficial para que estudiantes y graduados UCB encuentren
          prácticas profesionales y empleos.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/login"
            className="bg-blue-950 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-950 transition-colors"
          >
            Comenzar ahora <ArrowRight size={18} />
          </Link>
          <Link
            href="/student/offers"
            className="bg-blue-950 border-blue-950 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-950 transition-colors"
          >
            Ver ofertas
          </Link>
        </div>
      </section>
    </div>
  );
}
