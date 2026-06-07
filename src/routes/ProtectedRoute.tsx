import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import type { Role } from "../data/role/Role";

type ProtectedRouteProps = {
	roles: Role[]
}

function ProtectedRoute({ roles }: ProtectedRouteProps) {
	const { auth } = useAuthContext();

	if (!auth) return <Navigate to='/unauthorized' replace />

	if (!auth) return null;
	const hasPermission = roles.some(role => auth?.roles.includes(role));

	if (!hasPermission) {
		return <Navigate to='/unauthorized' replace />
	}

	return <Outlet />
}

export default ProtectedRoute;