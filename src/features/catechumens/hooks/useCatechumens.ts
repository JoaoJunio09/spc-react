import { useState } from "react";
import type { CatechistResponse } from "../../../data/catechist/CatechistResponse";
import type { CatechumenResponse } from "../../../data/catechumen/CatechumenResponse";
import useCatechumenService from "../../../hooks/useCatechumenService";

function useCatechumens() {
	const [catechumens, setCatechumens] = useState<CatechumenResponse[]>([]);

	const catechumenService = useCatechumenService();

	async function loadCatechumensByCatechist() {
		let catechist: CatechistResponse | null = null;
		const catechistStorage = sessionStorage.getItem('catechist');

		if (!catechistStorage) {
			return;
		}

		catechist = JSON.parse(catechistStorage);

		const data = await catechumenService.getAll({ catechistId: catechist?.id });
		setCatechumens(data);
	}

	return {
		loadCatechumensByCatechist,
		catechumens
	}
}

export default useCatechumens;