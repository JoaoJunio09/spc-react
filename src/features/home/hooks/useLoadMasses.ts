import { useEffect, useState } from "react";
import useMassService from "../../../hooks/useMassService";
import type { MassResponse } from "../../../data/mass/MassResponse";
import { UtilsDate } from "../../../utils/UtilsDate";

function useLoadMasses() {
	const [masses, setMasses]						= useState<MassResponse[]>([]);
	const [massesDates, setMassesDates] = useState<string[]>([]);
	const [error, setError] 						= useState<string | null>(null);

	const massService = useMassService();

	useEffect(() => {		
		loadMasses();
	}, []);

	async function loadMasses() {
		try {
			setError(null);
			
			const dataMassesDates: string[] = await massService.getMassesDatesByCommunityOrParish({});
			setMassesDates(dataMassesDates.map(date => UtilsDate.formatDateTimeThisMissaForDate(date)));

			const dataMases: MassResponse[] = await massService.getAll({});
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