"use client";

import { CheckCircle, ChevronDown, Clock, Search, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type StatusType = "PENDING" | "IN_REVIEW" | "ACCEPTED" | "REJECTED";

interface StatusPickerProps {
  currentStatus: StatusType;
  onChange: (newStatus: StatusType) => void;
  isLoading?: boolean;
}

export function StatusPicker({
  currentStatus,
  onChange,
  isLoading,
}: StatusPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const statuses: {
    value: StatusType;
    label: string;
    icon: React.ReactNode;
    color: string;
    hover: string;
  }[] = [
    {
      value: "PENDING",
      label: "Pendiente",
      icon: <Clock size={14} />,
      color: "bg-yellow-50 text-yellow-700 border-yellow-200",
      hover: "hover:bg-yellow-100",
    },
    {
      value: "IN_REVIEW",
      label: "En Revisión",
      icon: <Search size={14} />,
      color: "bg-blue-50 text-blue-700 border-blue-200",
      hover: "hover:bg-blue-100",
    },
    {
      value: "ACCEPTED",
      label: "Aceptado",
      icon: <CheckCircle size={14} />,
      color: "bg-green-50 text-green-700 border-green-200",
      hover: "hover:bg-green-100",
    },
    {
      value: "REJECTED",
      label: "Rechazado",
      icon: <XCircle size={14} />,
      color: "bg-red-50 text-red-700 border-red-200",
      hover: "hover:bg-red-100",
    },
  ];

  const activeStatus =
    statuses.find((s) => s.value === currentStatus) || statuses[0];

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => !isLoading && setIsOpen(!isOpen)}
        disabled={isLoading}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 ${activeStatus.color} ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-md"}`}
      >
        {activeStatus.icon}
        {activeStatus.label}
        <ChevronDown
          size={12}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 z-100 min-w-[160px] bg-white rounded-2xl border border-gray-100 shadow-2xl p-2 animate-in fade-in zoom-in-95 duration-200">
          <p className="px-3 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 mb-1">
            Cambiar Estado
          </p>
          <div className="space-y-1">
            {statuses.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => {
                  onChange(s.value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-colors ${s.value === currentStatus ? s.color : "text-gray-600 hover:bg-gray-50"}`}
              >
                <span
                  className={s.value === currentStatus ? "" : "text-gray-400"}
                >
                  {s.icon}
                </span>
                {s.label}
                {s.value === currentStatus && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-current"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
