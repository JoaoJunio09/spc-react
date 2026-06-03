import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { AccountCredentials } from "../data/auth/AccountCredentials";
import type { CatechistCredentials } from "../data/auth/CatechistCredentials";
import type { Token } from "../data/auth/Token";
import AuthService from "../services/AuthService";
import useCatechistService from "../hooks/useCatechistService";
import CatechistService from "../services/CatechistService";

type AuthContextType = {
	auth: Token | null;

	username: string | null;

	fullName: string | null;

	isAuthenticated: boolean;

	signIn(
		credentials: AccountCredentials
	): Promise<void>;

	signInCatechist(
		credentials: CatechistCredentials
	): Promise<void>;

	logout(): void;

	hasRole(role: string): boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
	children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [auth, setAuth] = useState<Token | null>(() => {
		const stored = sessionStorage.getItem('auth');
		return stored ? JSON.parse(stored) : null;
	});
	
	const username = auth?.username ?? null;
	const fullName = auth?.fullName ?? null;

	const authService = useMemo(() => new AuthService(), []);
	const catechistService = useMemo(() => new CatechistService(''), []);

	const navigate = useNavigate();

	async function signIn(credentials: AccountCredentials) {
		const auth = await authService.signIn(credentials);

		sessionStorage.setItem(
			'auth',
			JSON.stringify(auth)
		)
		setAuth(auth);

		auth.roles.forEach(role => {
			if (role === 'ROLE_COORDINATOR' || role === 'ROLE_ADMIN') {
				sessionStorage.removeItem('communityOrParish');
			}
		});

		navigate('/inicio');
	}

	async function signInCatechist(credentials: CatechistCredentials) {		
		const auth = await authService.byCatechist(credentials);
		const catechist = await catechistService.getAll({ username: auth.username });

		sessionStorage.setItem(
			'auth',
			JSON.stringify(auth)
		)
		setAuth(auth);

		if (auth.communityOrParish && catechist) {
			sessionStorage.setItem('communityOrParish', auth.communityOrParish);
			sessionStorage.setItem(
				'catechist',
				JSON.stringify(catechist[0])
			);
		}
		
		navigate('/inicio');
	}
	
	function logout() {
		sessionStorage.removeItem('auth');
		setAuth(null);
	}

	function hasRole(role: string): boolean {
		if (!auth) {
			return false;
		}
		return auth.roles.includes(role);
	}

	return (
		<AuthContext
			value={{
				auth,
				username,
				fullName,
				isAuthenticated: auth !== null,
				signIn,
				signInCatechist,
				logout,
				hasRole
			}}
		>
			{children}
		</AuthContext>
	)
}

export function useAuthContext() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuthContext deve ser usado dentro de AuthProvider");
	}

	return context;
}