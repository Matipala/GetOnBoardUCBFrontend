import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";
import type { UserRole } from "@/lib/types";

interface DashboardLayoutProps {
    children: React.ReactNode;
    role: UserRole;
    userName?: string;
}

export function DashboardLayout({ children, role, userName }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar role={role} />
            <div className="flex flex-col flex-1 min-w-0">
                <Navbar role={role} userName={userName} />
                <main className="flex-1 p-6 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}