import { useEffect, useState } from "react";
import MassService from "../../../services/MassService";
import type { MassResponse } from "../../../interfaces/mass/MassResponse";

function useLoadMasses() {
	const [masses, setMasses]						= useState<MassResponse[]>([]);
	const [errorLoad, setErrorLoad] 		= useState<string | null>(null);

	const massService:MassService = new MassService();

	useEffect(() => {
		loadMasses();
	}, []);

	async function loadMasses() {
		const communityOrParish = sessionStorage.getItem('communityOrParish');
		if (!communityOrParish) {
			setErrorLoad('Comunidade ou Pároquia indefinido');
			return;
		}

		try {
			setErrorLoad(null);
			const dataMases: MassResponse[] = await massService.getAll({ communityOrParish: communityOrParish });
			setMasses(dataMases);
		}
		catch (err) {
			setErrorLoad('Erro ao carregar as Missas');
		}
	}

	return {
		masses,
		errorLoad
	}
}

export default useLoadMasses;