import { DashboardLayout } from "@/components/layout/dashboardlayout";

export default function CoordinatorLayout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout role="coordinator">{children}</DashboardLayout>;
}