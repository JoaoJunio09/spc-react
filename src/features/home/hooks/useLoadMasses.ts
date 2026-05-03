import { useEffect, useState } from "react";
import MassService from "../../../services/MassService";
import { UtilsDate } from "../../../utils/UtilsDate";

function useLoadMasses() {
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
			const data: [] = await massService.getMassesDatesByCommunityOrParish({ communityOrParish: communityOrParish });
			setMassesDates(data.map(date => UtilsDate.formatDateTimeThisMissaForDate(date)));
		}
		catch (err) {
			setError('Erro ao carregar as datas das Missas');
		}
	}

	return {
		massesDates,
		error
	}
}

export default useLoadMasses;