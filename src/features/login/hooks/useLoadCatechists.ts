import { useEffect, useState } from "react";
import type { CatechistResponse } from "../../../interfaces/catechist/CatechistResponse";
import CatechistService from "../../../services/CatechistService";

function useLoadCatechists() {
	const [catechists, setCatechists] = useState<CatechistResponse[] | []>([]);
	const [error, setError] 					= useState<string | null>(null);

	let catechistService:CatechistService | null = null;

	useEffect(() => {
		useLoadCatechists();
	}, []);

	async function useLoadCatechists() {
		catechistService = new CatechistService();

		try {
			setError(null);
			const data: CatechistResponse[] = await catechistService.getAll({});
			console.log(data);
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