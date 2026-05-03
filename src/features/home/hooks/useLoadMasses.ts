import { useEffect, useState } from "react";
import MassService from "../../../services/MassService";
import { UtilsDate } from "../../../utils/UtilsDate";
import type { MassResponse } from "../../../interfaces/mass/MassResponse";

function useLoadMasses() {
	const [masses, setMasses]						= useState<MassResponse[]>([]);
	const [massesDates, setMassesDates] = useState<string[]>([]);
	const [error, setError] 	= useState<string | null>(null);

	const massService:MassService = new MassService();

	useEffect(() => {
		loadMasses();
	}, []);

	async function loadMasses() {
		const communityOrParish = sessionStorage.getItem('communityOrParish');
		if (!communityOrParish) {
			setError('Comunidade ou Pároquia indefinido');
			return;
		}

		try {
			setError(null);
			const dataMassesDates: string[] = await massService.getMassesDatesByCommunityOrParish({ communityOrParish: communityOrParish });
			setMassesDates(dataMassesDates.map(date => UtilsDate.formatDateTimeThisMissaForDate(date)));

			const dataMases: MassResponse[] = await massService.getAll({ communityOrParish: communityOrParish });
			setMasses(dataMases);
		}
		catch (err) {
			setError('Erro ao carregar as datas das Missas');
		}
	}

	return {
		masses,
		massesDates,
		error
	}
}

export default useLoadMasses;