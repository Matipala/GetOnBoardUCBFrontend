"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { navItems, roleLabels } from "@/lib/navigation";
import { UserRole } from "@/lib/types";
import { useAuth } from "@/hooks/UseAuth";
import { useRouter } from "next/navigation";



interface SicebarProps {
    role: UserRole;
}

export function Sidebar({ role }: SicebarProps) {
    const pathname = usePathname();
    const items = navItems[role];

    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    return (
        <aside className="flex flex-col w-64 min-h-screen bg-ucb-blue text-white shrink-0">
            {/* Logo Imagen */}
            <div className="flex items-center gap-3 px-6 py-4">
                <img src="/2.png" alt="UCB Logo" className="w-full h-full" />
            </div>


            {/* Role label */}
            <div className="px-6 pt-4 pb-2 text-xs text-white/40 uppercase tracking-widest font-semibold">
                {roleLabels[role]}
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 space-y-1 overflow-y-auto pb-4">
                {items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                ? "bg-ucb-yellow text-ucb-blue"
                                : "text-white/80 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            <Icon size={18} strokeWidth={1.75} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="px-3 pb-6 pt-4 border-t border-white/10">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/50 hover:bg-white/10 hover:text-white transition-colors w-full"
                >
                    <LogOut size={18} strokeWidth={1.75} />
                    Cerrar sesión
                </button>
            </div>
        </aside>
    );
}
