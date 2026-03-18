"use client";

import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

//aqui encapsulo el acceso al authcontext si se usa fuera del authprovider lanza un error
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth debe usarse dentro de un <AuthProvider>");
    }
    return context;
}