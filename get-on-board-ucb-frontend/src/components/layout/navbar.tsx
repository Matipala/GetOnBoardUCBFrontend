import { Bell, User } from "lucide-react";
import { roleLabels } from "@/lib/navigation";
import type { UserRole } from "@/lib/types";

interface NavbarProps {
  role: UserRole;
  userName?: string;
}

const badgeColors: Record<UserRole, string> = {
  admin: "bg-red-100 text-red-700",
  coordinator: "bg-ucb-yellow text-ucb-blue",
  student: "bg-ucb-yellow text-ucb-blue",
  employer: "bg-ucb-yellow text-ucb-blue",
};

export function Navbar({ role, userName = "Usuario" }: NavbarProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
      <div />
      <div className="flex items-center gap-4">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColors[role]}`}
        >
          {roleLabels[role]}
        </span>

        <button
          type="button"
          className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Bell size={20} strokeWidth={1.75} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-ucb-yellow rounded-full" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-ucb-blue rounded-full flex items-center justify-center">
            <User size={15} className="text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">{userName}</span>
        </div>
      </div>
    </header>
  );
}
