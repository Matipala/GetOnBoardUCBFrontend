import { DashboardLayout } from "@/components/layout/dashboardlayout";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout role="student">{children}</DashboardLayout>;
}