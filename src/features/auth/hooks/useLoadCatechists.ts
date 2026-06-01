import { useEffect, useState } from "react";
import type { CatechistResponse } from "../../../data/catechist/CatechistResponse";
import useCatechistService from "../../../hooks/useCatechistService";

function useLoadCatechists() {
	const [catechists, setCatechists] = useState<CatechistResponse[] | []>([]);
	const [error, setError] 					= useState<string | null>(null);

	const catechistService = useCatechistService();

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