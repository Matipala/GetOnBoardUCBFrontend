import {
  BarChart3,
  Briefcase,
  Building2,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Users,
} from "lucide-react";

import type { NavItem, UserRole } from "./types";

export const navItems: Record<UserRole, NavItem[]> = {
  admin: [
    { label: "Inicio", href: "/admin", icon: LayoutDashboard },
    { label: "Usuarios", href: "/admin/users", icon: Users },
    { label: "Ofertas", href: "/admin/offers", icon: Briefcase },
    { label: "Estadísticas", href: "/admin/stats", icon: BarChart3 },
    { label: "Mi Perfil", href: "/admin/settings", icon: Users },
  ],
  coordinator: [
    { label: "Inicio", href: "/coordinator", icon: LayoutDashboard },
    {
      label: "Estudiantes",
      href: "/coordinator/students",
      icon: GraduationCap,
    },
    { label: "Ofertas", href: "/coordinator/offers", icon: Briefcase },
    { label: "Mi Perfil", href: "/coordinator/profile", icon: Users },
  ],
  employer: [
    { label: "Inicio", href: "/employer", icon: LayoutDashboard },
    { label: "Mis Ofertas", href: "/employer/offers", icon: Briefcase },
    { label: "Candidatos", href: "/employer/candidates", icon: Users },
    {
      label: "Postulaciones",
      href: "/employer/applications",
      icon: ClipboardList,
    },
    { label: "Mi Empresa", href: "/employer/company", icon: Building2 },
  ],
  student: [
    { label: "Inicio", href: "/student", icon: LayoutDashboard },
    { label: "Explorar Ofertas", href: "/student/offers", icon: Briefcase },
    {
      label: "Mis Postulaciones",
      href: "/student/applications",
      icon: ClipboardList,
    },
    { label: "Mi Perfil", href: "/student/profile", icon: Users },
  ],
};

export const roleLabels: Record<UserRole, string> = {
  admin: "Administrador",
  coordinator: "Coordinador de Carrera",
  employer: "Empleador",
  student: "Estudiante",
};
