import { Briefcase, Building2, ClipboardList, Users } from "lucide-react";

const stats = [
  {
    label: "Ofertas publicadas",
    value: "—",
    icon: Briefcase,
    color: "bg-green-50 text-green-600",
  },
  {
    label: "Total candidatos",
    value: "—",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Postulaciones activas",
    value: "—",
    icon: ClipboardList,
    color: "bg-amber-50 text-amber-600",
  },
  {
    label: "Mi empresa",
    value: "—",
    icon: Building2,
    color: "bg-purple-50 text-purple-600",
  },
];

export default function EmployerPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        Panel del Empleador
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        Gestiona tus ofertas y candidatos.
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
