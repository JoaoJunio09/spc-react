import ConflictInTheDatabaseException from "../exceptions/database/ConflicInTheDatabaseException";
import InternalServerError from "../exceptions/server/InternalServerError";
import type { ParamsPresenceAPI } from "../interfaces/presence/ParamsPresenceAPI";
import type { PresenceRequest } from "../interfaces/presence/PresenceRequest";
import type { PresenceResponse } from "../interfaces/presence/PresenceResponse";
import api from "./api";

class PresenceService {
	BASE_URL: string = '';

	constructor() {
		this.BASE_URL = '/api/presences/v1';
	}

	public async getAll(params: ParamsPresenceAPI) {
		try {
			const response = await api.get<PresenceResponse[]>(this.BASE_URL, {
				headers: {
					'Content-Type': 'application/json'
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

	public async register(presence: PresenceRequest) {
		try {
			const response = await api.post<PresenceResponse>(this.BASE_URL, presence);
			
			if (response.status === 500) {
				throw new InternalServerError('Erro inesperado no servidor ao registrar');
			}

			if (response.status === 409) {
				throw new ConflictInTheDatabaseException('Conflit in the saved database this Presences.');
			}

			return response.data;
		}
		catch (err) {
			throw err;
		}
	}
}

export default PresenceService;