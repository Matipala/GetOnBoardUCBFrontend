"use client";

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import type { User, UserRole } from "@/lib/types";

// tipos de estado de autenticacion 

type AuthState = {
    user: User | null; //esto si el usuario esta logueado, null si no hay sesion
    isLoading: boolean; //true mientras espera respuesta del login
    error: string | null; //si hay error en el login
};

//acciones
type AuthAction =
    | { type: "LOGIN_START" } // Se inicia el proceso del login
    | { type: "LOGIN_SUCCESS"; payload: User } // login exitoso trae al usuario
    | { type: "LOGIN_ERROR"; payload: string } // error de credencial
    | { type: "LOGOUT" }; // cierra sesion

// estado inicial

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
};

// manejar las transacciones de estado

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case "LOGIN_START":
            return { ...state, isLoading: true, error: null };
        case "LOGIN_SUCCESS":
            return { ...state, isLoading: false, user: action.payload };
        case "LOGIN_ERROR":
            return { ...state, isLoading: false, error: action.payload };
        case "LOGOUT":
            return { user: null, isLoading: false, error: null };
        default:
            return state;
    }
}

//tipo de contexto lo que estara disponible en la app
type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

//crear contexto

const AuthContext = createContext<AuthContextType | null>
    (null);

//credenciales de prueba (Esto tengo que reemplazar cuando cree mi backend)

const MOCK_USERS: Record<string, { password: string; user: User }> = {
    "admin@ucb.edu.bo": {
        password: "admin123",
        user: { id: "1", name: "Administrador UCB", email: "admin@ucb.edu.bo", role: "admin" },
    },
    "coord@ucb.edu.bo": {
        password: "coord123",
        user: { id: "2", name: "Coordinador UCB", email: "coord@ucb.edu.bo", role: "coordinator" },
    },
    "employer@ucb.edu.bo": {
        password: "employer123",
        user: { id: "3", name: "Empresa Demo", email: "employer@ucb.edu.bo", role: "employer" }
    },
    "student@ucb.edu.bo": {
        password: "student123",
        user: { id: "4", name: "Estudiante Demo", email: "student@ucb.edu.bo", role: "student" }
    },
};

//el provider envuelve la app y provee el contexto
export function AuthProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    //al cargar la app revisa si hay una sesion guarda en el localstorage
    useEffect(() => {
        const savedUser = localStorage.getItem("auth_user");
        if (savedUser) {
            dispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(savedUser) });
        }
    }, []);

    //funcion de login (esto igual tengo que reemplazar con fetch real de mi backend
    const login = async (email: string, password: string): Promise<void> => {
        dispatch({ type: "LOGIN_START" });
        // Simular delay de red (500ms)
        await new Promise((res) => setTimeout(res, 500));
        const found = MOCK_USERS[email.toLowerCase()];
        if (!found || found.password !== password) {
            dispatch({ type: "LOGIN_ERROR", payload: "Correo o contraseña incorrectos" });
            return;
        }

        // Guardar en localStorage para persistir la sesión
        localStorage.setItem("auth_user", JSON.stringify(found.user));
        // Guardar cookie para que el middleware de Next.js pueda leerla
        document.cookie = `auth-token=${found.user.role}; path=/`;
        dispatch({ type: "LOGIN_SUCCESS", payload: found.user });
    };
    // Función de logout
    const logout = () => {
        localStorage.removeItem("auth_user");
        // Borrar la cookie
        document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        dispatch({ type: "LOGOUT" });
    };
    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext };