"use client";

import { ChevronDown, LogOut, User, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/UseAuth";
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

const getProfileLink = (role: UserRole) => {
  switch (role) {
    case "student":
      return "/student/profile";
    case "employer":
      return "/employer/company";
    case "admin":
      return "/admin/settings";
    case "coordinator":
      return "/coordinator/profile";
    default:
      return "/";
  }
};

export function Navbar({ role, userName: propUserName }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayName = user?.name || propUserName || "";

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 relative z-50">
      <div />
      <div className="flex items-center gap-4">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColors[role]}`}
        >
          {roleLabels[role]}
        </span>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2.5 hover:bg-gray-50 p-1.5 rounded-lg transition-colors focus:outline-none"
          >
            <div className="w-8 h-8 bg-ucb-blue rounded-full flex items-center justify-center">
              <User size={15} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {displayName}
            </span>
            <ChevronDown size={14} className="text-gray-500" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1">
              <Link
                href={getProfileLink(role)}
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <UserIcon size={16} />
                Ver perfil
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsDropdownOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={16} />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
