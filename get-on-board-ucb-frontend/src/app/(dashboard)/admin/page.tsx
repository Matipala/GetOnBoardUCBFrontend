import { Users, Building2, Briefcase, GraduationCap } from "lucide-react";

const stats = [
    { label: "Usuarios registrados", value: "—", icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Empresas activas", value: "—", icon: Building2, color: "bg-green-50 text-green-600" },
    { label: "Ofertas publicadas", value: "—", icon: Briefcase, color: "bg-amber-50 text-amber-600" },
    { label: "Estudiantes", value: "—", icon: GraduationCap, color: "bg-purple-50 text-purple-600" },
];


export default function AdminPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Panel de Administración</h1>
            <p className="text-gray-500 text-sm mb-6">Resumen general de la plataforma GetOnBoard UCB.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
                            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
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