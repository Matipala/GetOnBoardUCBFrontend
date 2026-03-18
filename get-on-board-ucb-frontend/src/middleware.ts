import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { UserRole } from "@/lib/types";

// rutas que requieren autenticacion y que rol pueden acceder a ellas
const PROTECTED_ROUTES: Record<string, UserRole> = {

    "/student": "student",
    "/employer": "employer",
    "/coordinator": "coordinator",
    "/admin": "admin",

};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const authToken = request.cookies.get("auth-token")?.value as UserRole | undefined;

    //verificar si existe la ruta

    const protectedEntry = Object.entries(PROTECTED_ROUTES).find(([route]) =>
        pathname.startsWith(route)
    );
    if (protectedEntry) {
        const [, requiredRole] = protectedEntry;
        // Si no hay sesión → redirigir a /login
        if (!authToken) {
            return NextResponse.redirect(new URL("/", request.url));
        }
        // Si el rol no coincide → redirigir al dashboard del rol actual
        if (authToken !== requiredRole) {
            return NextResponse.redirect(new URL(`/${authToken}`, request.url));
        }
    }

    //si ya esta autenticado e intenta ir a /login redirige al dashboard
    if (pathname === "/login" && authToken) {
        return NextResponse.redirect(new URL(`/${authToken}`, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/student/:path*",
        "/employer/:path*",
        "/coordinator/:path*",
        "/admin/:path*",
        "/login",
    ],
};