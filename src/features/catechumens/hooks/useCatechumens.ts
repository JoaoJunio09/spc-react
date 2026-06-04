import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { CatechistResponse } from "../../../data/catechist/CatechistResponse";
import useCatechumenService from "../../../hooks/useCatechumenService";
import useDebounce from "../../../hooks/useDebounce";
import useMassService from "../../../hooks/useMassService";
import type { NumberOfMassesResponse } from "../../../data/mass/NumberOfMassesResponse";

export type GeneralDataType = {
	totalCatechumens: number,
  mediumFrequency: number,
  attention: number,
  totalMasses: number,
  massesOccurred: number
}

function useCatechumens() {
	const [isLoading, setIsLoading] = useState(false);
	const [fullName, setFullName] = useState('');
	const [catechistId, setCatechistId] = useState(0);
	const [numberOfMasses, setNumberOfMasses] = useState<NumberOfMassesResponse | null>(null);

	const catechumenService = useCatechumenService();
	const massService = useMassService();

	const debouncedName = useDebounce(fullName, 2000);

	const queryCatechumens = useQuery({
		queryKey: [
			'catechumens',
			debouncedName,
			catechistId
		],
		queryFn: async () => {
  await new Promise(resolve => setTimeout(resolve, 3000));

  return catechumenService.getAll({
    catechistId: catechistId ?? undefined,
    fullName: debouncedName ?? undefined
  });
},
		enabled: !!debouncedName || !!catechistId,
		retry: 3
	});

	const generalData: GeneralDataType = {
		totalCatechumens: queryCatechumens.data?.length ?? 0,
		mediumFrequency: calculateMediumFrequency() ?? 0,
		attention: inAttention(),
		totalMasses: numberOfMasses?.totalMasses ?? 0,
		massesOccurred: numberOfMasses?.totalMassesToThisToday ?? 0
	};

	function calculateMediumFrequency() {
		let frequency = 0;
		queryCatechumens.data?.forEach(catechumen => {
			frequency += catechumen.currentFrequency;
		});
		const size = queryCatechumens.data?.length;
		if (!size) {
			return;
		}
		return frequency / size;
	}

	function inAttention() {
		let attention = 0;
		queryCatechumens.data?.forEach(catechumen => {
			if (catechumen.currentFrequency < 50) {
				attention++;
			}
		});
		return attention;
	}

	async function loadCatechist() {
		let catechist: CatechistResponse | null = null;
		const catechistStorage = sessionStorage.getItem('catechist');

		if (!catechistStorage) {
			return;
		}

		catechist = JSON.parse(catechistStorage);
		setCatechistId(Number(catechist?.id));
		const numberOfMasses = await massService.getNumberOfMasses();
		setNumberOfMasses(numberOfMasses);
	}

	function search(value: string) {
		setFullName(value);
	}

	return {
		generalData,
		loadCatechist,
		catechumens: queryCatechumens.data ?? [],
		search,
		errorCatechumens: queryCatechumens.isError,
		isLoadingCatechumens: queryCatechumens.isLoading,
		isFetchingCatechumens: queryCatechumens.isFetching
	}
}

export default useCatechumens;