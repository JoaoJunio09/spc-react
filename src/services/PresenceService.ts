import ConflictInTheDatabaseException from "../exceptions/database/ConflicInTheDatabaseException";
import InternalServerError from "../exceptions/server/InternalServerError";
import type { ParamsPresenceAPI } from "../data/presence/ParamsPresenceAPI";
import type { PresenceRequest } from "../data/presence/PresenceRequest";
import type { PresenceResponse } from "../data/presence/PresenceResponse";
import api from "./api";

class PresenceService {
	BASE_URL: string = '';
	private accessToken: string = '';

	constructor(accessToken: string) {
		this.BASE_URL = '/api/presences/v1';
		this.accessToken = accessToken;
	}

	public async getAll(params: ParamsPresenceAPI) {
		try {
			const response = await api.get<PresenceResponse[]>(this.BASE_URL, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${this.accessToken}`
				},
				params
			});

			if (response.status === 500) {
				throw new InternalServerError('Erro ao carregar as Presenças');
			}

			return response.data;
		}
		catch(err) {
			throw err;
		}
	}

	public async registerPresences(presences: PresenceRequest[]) {
		try {
			const response = await api.post<PresenceRequest[]>(this.BASE_URL, presences, {
				headers: {
					'Authorization': `Bearer ${this.accessToken}`
				}
			});
			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 409) {
				throw new ConflictInTheDatabaseException('Conflit in the saved database this Presences.');
			}
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro inesperado no servidor ao registrar');
			}

			throw err;
		}
	}

	public async registerRetroactive(presence: PresenceRequest) {
		const URL = `${this.BASE_URL}/retroactive`;
		try {
			const response = await api.post<PresenceResponse>(URL, presence, {
				headers: {
					'Authorization': `Bearer ${this.accessToken}`
				}
			});
			return response.data;
		}
		catch (err: any) {
			if (err?.response?.status === 409) {
				throw new ConflictInTheDatabaseException('Conflit in the saved database this Presences.');
			}
			if (err?.response?.status === 500) {
				throw new InternalServerError('Erro inesperado no servidor ao registrar');
			}

			throw err;
		}
	}
}

export default PresenceService;