import { useEffect, useState } from "react";
import type { MassResponse } from "../../../data/mass/MassResponse";
import useMassService from "../../../hooks/useMassService";

function useLoadMasses() {
	const [masses, setMasses] = useState<MassResponse[]>([]);
	const [error, setError] 	= useState<string | null>(null);

	const massService = useMassService();

	useEffect(() => {
		loadMasses();
	}, []);

	async function loadMasses() {
		try {
			setError(null);
			const dataMases: MassResponse[] = await massService.getAll({});
			setMasses(dataMases);
		}
		catch (err) {
			setError('Erro ao carregar as Missas');
		}
	}

	return {
		masses,
		error,
		loadMasses
	}
}

export default useLoadMasses;