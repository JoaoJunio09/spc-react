import type React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import type { Role } from "../data/role/Role";

type ProtectedRouteProps = {
	children: React.ReactNode,
	roles: Role[]
}

function ProtectedRoute({
	children,
	roles
}: ProtectedRouteProps) {
	const { auth } = useAuthContext();

	if (!auth) return null;
	const hasPermission = roles.some(role => auth?.roles.includes(role));

	if (!hasPermission) {
		return <Navigate to='/inicio' replace />
	}

	return <>{children}</>
}

export default ProtectedRoute;