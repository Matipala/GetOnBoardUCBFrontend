import { LayoutDashboard, Users, Briefcase, Building2, GraduationCap, BarChart3, Settings, BookOpen, Bell, ClipboardList, FileText } from "lucide-react";

import type { NavItem, UserRole } from "./types";

export const navItems: Record<UserRole, NavItem[]> = {
    admin: [
        { label: "Inicio", href: "/admin", icon: LayoutDashboard },
        { label: "Usuarios", href: "/admin/users", icon: Users },
        { label: "Empleadores", href: "/admin/employers", icon: Building2 },
        { label: "Estudiantes", href: "/admin/students", icon: GraduationCap },
        { label: "Ofertas", href: "/admin/offers", icon: Briefcase },
        { label: "Reportes", href: "/admin/reports", icon: BarChart3 },
        { label: "Configuración", href: "/admin/settings", icon: Settings },
    ],
    coordinator: [
        { label: "Inicio", href: "/coordinator", icon: LayoutDashboard },
        { label: "Estudiantes", href: "/coordinator/students", icon: GraduationCap },
        { label: "Ofertas", href: "/coordinator/offers", icon: Briefcase },
        { label: "Reportes", href: "/coordinator/reports", icon: BarChart3 },
        { label: "Carreras", href: "/coordinator/careers", icon: BookOpen },
        { label: "Documentos", href: "/coordinator/documents", icon: FileText },
    ],
    employer: [
        { label: "Inicio", href: "/employer", icon: LayoutDashboard },
        { label: "Mis Ofertas", href: "/employer/offers", icon: Briefcase },
        { label: "Candidatos", href: "/employer/candidates", icon: Users },
        { label: "Postulaciones", href: "/employer/applications", icon: ClipboardList },
        { label: "Mi Empresa", href: "/employer/company", icon: Building2 },
    ],
    student: [
        { label: "Inicio", href: "/student", icon: LayoutDashboard },
        { label: "Explorar Ofertas", href: "/student/offers", icon: Briefcase },
        { label: "Mis Postulaciones", href: "/student/applications", icon: ClipboardList },
        { label: "Mi Perfil", href: "/student/profile", icon: GraduationCap },
        { label: "Notificaciones", href: "/student/notifications", icon: Bell },
    ],
};

export const roleLabels: Record<UserRole, string> = {
    admin: "Administrador",
    coordinator: "Coordinador de Carrera",
    employer: "Empleador",
    student: "Estudiante",
};