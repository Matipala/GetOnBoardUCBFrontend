import { DashboardLayout } from "@/components/layout/dashboardlayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout userRole="admin">{children}</DashboardLayout>;
}
