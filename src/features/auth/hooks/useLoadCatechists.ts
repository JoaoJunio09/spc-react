import { useEffect, useState } from "react";
import type { CatechistResponse } from "../../../interfaces/catechist/CatechistResponse";
import CatechistService from "../../../services/CatechistService";

function useLoadCatechists() {
	const [catechists, setCatechists] = useState<CatechistResponse[] | []>([]);
	const [error, setError] 					= useState<string | null>(null);

	const catechistService:CatechistService = new CatechistService();

	useEffect(() => {
		loadCatechists();
	}, []);

	async function loadCatechists() {
		try {
			setError(null);
			const data: CatechistResponse[] = await catechistService.getAll({});
			setCatechists(data);
		}
		catch (err) {
			setError('Erro ao carregar os Catequistas');
		}
		const data = await catechistService.getAll({});
		setCatechists(data);
	}

	return {
		catechists,
		error
	}
}

export default useLoadCatechists;