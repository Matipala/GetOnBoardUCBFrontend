import { DashboardLayout } from "@/components/layout/dashboardlayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout role="admin">{children}</DashboardLayout>;
}