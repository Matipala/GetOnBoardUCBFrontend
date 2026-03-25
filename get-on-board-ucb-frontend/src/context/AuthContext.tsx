"use client";

import { createContext, type ReactNode, useEffect, useReducer } from "react";
import type { User } from "@/lib/types";

// tipos de estado de autenticacion

type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

//acciones
type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGIN_ERROR"; payload: string }
  | { type: "LOGOUT" };

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

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const savedUser = localStorage.getItem("auth_user");
    if (savedUser) {
      dispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(savedUser) });
    }
  }, []);

  //funcion de login conectada al backend
  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: "LOGIN_START" });
    try {
      const reponse = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!reponse.ok) {
        throw new Error("Credenciales invalidas");
      }
      const found = await reponse.json();
      localStorage.setItem("auth_user", JSON.stringify(found.user));

      // biome-ignore lint/suspicious/noDocumentCookie: auth persistence
      document.cookie = `auth-token=${found.user.role}; path=/`;
      // biome-ignore lint/suspicious/noDocumentCookie: auth persistence
      document.cookie = `access_token=${found.access_token}; path=/`;
      dispatch({ type: "LOGIN_SUCCESS", payload: found.user });
    } catch (err) {
      const error = err as Error;
      dispatch({
        type: "LOGIN_ERROR",
        payload: error.message || "error al conectar con el servidor",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_user");
    // biome-ignore lint/suspicious/noDocumentCookie: auth
    document.cookie =
      "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    dispatch({ type: "LOGOUT" });
  };
  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
