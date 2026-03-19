import { DashboardLayout } from "@/components/layout/dashboardlayout";

export default function CoordinatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout userRole="coordinator">{children}</DashboardLayout>;
}
