import type { LucideIcon } from "lucide-react";

export type UserRole = "admin" | "coordinator" | "employer" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  career?: string;
  isActive?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface JobOffer {
  id: number;
  title: string;
  description?: string;
  company: string;
  location: string;
  type: "Practica" | "Empleo";
  salary?: string;
  career?: string;
  employerId: string;
  createdAt: string;
  applications?: Application[];
}

export interface Application {
  id: number;
  cvUrl: string;
  status: "PENDING" | "IN_REVIEW" | "ACCEPTED" | "REJECTED";
  studentId: string;
  offerId: number;
  createdAt: string;
  offer?: JobOffer;
  student?: User;
}

export interface StatsData {
  students: number;
  employers: number;
  coordinators: number;
  admins: number;
  total: number;
}

export const STATUS_LABELS: Record<Application["status"], string> = {
  PENDING: "Pendiente",
  IN_REVIEW: "En revisión",
  ACCEPTED: "Aceptado",
  REJECTED: "Rechazado",
};

export const STATUS_COLORS: Record<Application["status"], string> = {
  PENDING: "#f59e0b",
  IN_REVIEW: "#3b82f6",
  ACCEPTED: "#10b981",
  REJECTED: "#ef4444",
};
