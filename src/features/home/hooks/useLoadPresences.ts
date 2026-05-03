import { useEffect, useState } from "react";
import type { PresenceResponse } from "../../../interfaces/presence/PresenceResponse";
import PresenceService from "../../../services/PresenceService";

function useLoadPresences() {
	const [presences, setPresences] = useState<PresenceResponse[]>([]);
	const [error, setError]				 = useState<string | null>(null);

	const presenceService: PresenceService = new PresenceService();

	useEffect(() => {
		loadPresences();
	}, []);

	async function loadPresences() {
		try {
			setError(null);
			const data = await presenceService.getAll({});
			setPresences(data);
		}
		catch (err) {
			setError('Erro ao carregar as Presenças');
		}
	}

	return {
		presences,
		error
	}
}

export default useLoadPresences;