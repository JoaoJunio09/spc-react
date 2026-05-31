import AuthenticationError from "../exceptions/auth/AuthenticationError";
import InternalServerError from "../exceptions/server/InternalServerError";
import type { AccountCredentials } from "../interfaces/auth/AccountCredentials";
import type { CatechistCredentials } from "../interfaces/auth/CatechistCredentials";
import type { Token } from "../interfaces/auth/Token";
import api from "./api";

class AuthService {
	BASE_URL: string = ''; 

	constructor() {
		this.BASE_URL = '/auth';
	}

	public async signIn(credentials: AccountCredentials) {
		const URL = `${this.BASE_URL}/sign`;
		try {
			const response = await api.post<Token>(URL, credentials);
			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 403) {
				throw new AuthenticationError('Não foi possível autenticar usuário');
			}

			if (err?.response?.status === 500) {
				throw new InternalServerError('Usuário ou senha inválidos');
			}

			throw err;
		}
	}

	public async byCatechist(credentials: CatechistCredentials) {
		const URL = `${this.BASE_URL}/catechist`;
		try {
			const response = await api.post<Token>(URL, credentials);
			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 403) {
				throw new AuthenticationError('Não foi possível autenticar usuário');
			}

			if (err?.response?.status === 500) {
				throw new InternalServerError('Catequista inválido');
			}

			throw err;
		}
	}
}

export default AuthService;