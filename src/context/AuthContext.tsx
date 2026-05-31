import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import type { AccountCredentials } from "../interfaces/auth/AccountCredentials";
import type { CatechistCredentials } from "../interfaces/auth/CatechistCredentials";
import type { Token } from "../interfaces/auth/Token";
import AuthService from "../services/AuthService";
import InvalidOrEmptyFields from "../exceptions/form/InvalidOrEmptyFields";

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
	const [auth, setAuth] = useState<Token | null>(null);
	const [username, setUsername] = useState<string | null>(null);
	const [fullName, setFullName] = useState<string | null>(null);

	const authService = useMemo(() => new AuthService(), []);

	const navigate = useNavigate();

	async function signIn(credentials: AccountCredentials) {
		const auth = await authService.signIn(credentials);

		sessionStorage.setItem(
			'auth',
			JSON.stringify(auth)
		)
		setAuth(auth);
		setUsername(auth.username);
		setFullName(auth.fullName);

		auth.roles.forEach(role => {
			if (role === 'ROLE_COORDINATOR' || role === 'ROLE_ADMIN') {
				sessionStorage.removeItem('communityOrParish');
			}
		});

		navigate('/inicio');
	}

	async function signInCatechist(credentials: CatechistCredentials) {
		if (credentials.catechistId === 0) {
			throw new InvalidOrEmptyFields('Selecione quem é você');
		}
		if (credentials.communityOrParish === null) {
			throw new InvalidOrEmptyFields('Selecione um código');
		}

		const auth = await authService.byCatechist(credentials);

		sessionStorage.setItem(
			'auth',
			JSON.stringify(auth)
		)
		setAuth(auth);
		setUsername(auth.username);
		setFullName(auth.fullName);

		if (auth.communityOrParish) {
			sessionStorage.setItem('communityOrParish', auth.communityOrParish);
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