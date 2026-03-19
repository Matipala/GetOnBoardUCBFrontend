import type { LucideIcon } from "lucide-react";

export type UserRole = "admin" | "coordinator" | "employer" | "student";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export interface NavItem {
    label: string;
    href: string;
    icon: LucideIcon;
}

export interface JobOffer {
    id: string;
    title: string;
    company: string;
    location: string;
    type: "Practica" | "Empleo";
    salary: string;
    employerId: string;
    createdAt: string;

}