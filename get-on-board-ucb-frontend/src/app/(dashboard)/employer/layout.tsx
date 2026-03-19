import { DashboardLayout } from "@/components/layout/dashboardlayout";

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout userRole="employer">{children}</DashboardLayout>;
}
