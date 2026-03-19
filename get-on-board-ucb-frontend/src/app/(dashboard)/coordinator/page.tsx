import { BookOpen, Briefcase, FileText, GraduationCap } from "lucide-react";

const stats = [
  {
    label: "Estudiantes en carrera",
    value: "—",
    icon: GraduationCap,
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Ofertas activas",
    value: "—",
    icon: Briefcase,
    color: "bg-green-50 text-green-600",
  },
  {
    label: "Informes pendientes",
    value: "—",
    icon: FileText,
    color: "bg-amber-50 text-amber-600",
  },
  {
    label: "Carreras gestionadas",
    value: "—",
    icon: BookOpen,
    color: "bg-purple-50 text-purple-600",
  },
];

export default function CoordinatorPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Panel del Coordinador
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        Gestión de prácticas y estudiantes de tu carrera.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-gray-200 p-5"
            >
              <div
                className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}
              >
                <Icon size={20} strokeWidth={1.75} />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
