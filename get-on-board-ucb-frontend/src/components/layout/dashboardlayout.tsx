import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import type { UserRole } from "@/lib/types";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: UserRole;
  userName?: string;
}

export function DashboardLayout({
  children,
  userRole,
  userName,
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar role={userRole} />
      <div className="flex flex-col flex-1 min-w-0">
        <Navbar role={userRole} userName={userName} />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
