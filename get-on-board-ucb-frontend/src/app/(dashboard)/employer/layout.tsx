import { DashboardLayout } from "@/components/layout/dashboardlayout";

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout role="employer">{children}</DashboardLayout>;
}