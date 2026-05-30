import InvalidClientRequestException from "../exceptions/auth/InvalidClientRequestException";
import InternalServerError from "../exceptions/server/InternalServerError";
import type { AccountCredentials } from "../interfaces/auth/AccountCredentials";
import type { Token } from "../interfaces/auth/Token";
import api from "./api";

class AuthService {
	BASE_URL: string = ''; 

	constructor() {
		this.BASE_URL = '/api/admin';
	}

	public async signIn(credentials: AccountCredentials) {
		try {
			const response = api.post<Token>(this.BASE_URL, credentials);

			const data = (await response);

			if (data.status === 403) {
				throw new InvalidClientRequestException('Usuário inválido');
			}

			if (data.status === 500) {
				throw new InternalServerError('Não foi possível autenticar usuário');
			}

			return data;
		}
		catch (err) {
			throw err;
		}
	}
}

export default AuthService;