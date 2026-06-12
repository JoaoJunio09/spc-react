import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import type { CatechistResponse } from "../../../data/catechist/CatechistResponse";
import type { CatechumenResponse } from "../../../data/catechumen/CatechumenResponse";
import { emptyPageable } from "../../../data/pageable/Pageable";
import type { PageableParamsAPI } from "../../../data/pageable/PageableParamsAPI";
import useCatechumenService from "../../../hooks/useCatechumenService";
import useDebounce from "../../../hooks/useDebounce";
import useMassService from "../../../hooks/useMassService";
import useStepService from "../../../hooks/useStepService";

export type GeneralDataType = {
	totalCatechumens?: number,
  mediumFrequency?: number,
  attention?: number,
  totalMasses?: number,
  massesOccurred?: number,
}

function useCatechumens(scope: string) {
	const [fullName, setFullName] = useState('');
	const [catechistId, setCatechistId] = useState(0);
	const [pageableParamsAPI, setPageableParamsAPI] = useState<PageableParamsAPI>({
		page: 0,
		size: 20,
		direction: 'asc'
	});

	const catechumenService = useCatechumenService();
	const massService = useMassService();
	const stepService = useStepService();

	const debouncedName = useDebounce(fullName, 1000);

	useEffect(() => {
		if (scope === 'mine') {
			loadCatechist();
		}
	}, []);

	const queryNumberOfMasses = useQuery({
		queryKey: ['numberOfMasses'],
		queryFn: () => massService.getNumberOfMasses(),
	});

	const numberOfMasses = queryNumberOfMasses.data;

	const queryStep = useQuery({
		queryKey: [
			'step',
			catechistId
		],
		queryFn: () => stepService.getAll({
			catechistId: catechistId ?? undefined
		}),
		enabled: !!catechistId,
		retry: 3
	});

	const queryMineCatechumensGeneral = useQuery({
		queryKey: [
			'mineGeneralData',
			catechistId
		],
		queryFn: () => catechumenService.getAll({
			catechistId: catechistId ?? undefined
		}),
		enabled: !!catechistId,
		retry: 3
	});

	const queryAllCatechumensGeneral = useQuery({
		queryKey: ['allGeneralData'],
		queryFn: () => catechumenService.retrieveDashboard(),
		retry: 3
	});

	const queryMineCatechumens = useQuery({
		queryKey: [
			'mineCatechumens',
			debouncedName,
			catechistId
		],
		queryFn: ({ signal }) => catechumenService.getAll({
			catechistId: catechistId ?? undefined,
			fullName: debouncedName ?? undefined,
			signal
		}),
		enabled: !!debouncedName || !!catechistId,
		retry: 3
	});

	const queryAllCatechumens = useQuery({
		queryKey: [
			'allCatechumens',
			pageableParamsAPI.page,
			debouncedName
		],
		queryFn: ({ signal }) => catechumenService.getAll({
			pageable: pageableParamsAPI,
			fullName: debouncedName ?? undefined,
			signal
		}),
		retry: 3
	});

	const generalDataMineCatechumens = useMemo<GeneralDataType>(() => ({
		totalCatechumens: queryMineCatechumensGeneral.data?._embedded.catechumens.length ?? 0,
		mediumFrequency: mediumFrequencyMineCatechumens() ?? 0,
		attention: inAttentionMineCatechumens(),
		totalMasses: numberOfMasses?.totalMasses ?? 0,
		massesOccurred: numberOfMasses?.totalMassesToThisToday ?? 0,
	}), [
		queryMineCatechumensGeneral.data,
		numberOfMasses
	]);

	const generalDataAllCatechumens = useMemo<GeneralDataType>(() => ({
		totalCatechumens: queryAllCatechumensGeneral.data?.total ?? 0,
		mediumFrequency: queryAllCatechumensGeneral.data?.mediumFrequency ?? 0,
		attention: queryAllCatechumensGeneral.data?.attention ?? 0,
		totalMasses: queryAllCatechumensGeneral.data?.totalMasses ?? 0,
		massesOccurred: queryAllCatechumensGeneral.data?.massesOccurred ?? 0,
	}), [
		queryAllCatechumensGeneral.data,
		numberOfMasses
	]);

	function mediumFrequencyMineCatechumens() {
		let frequency = 0;
		queryMineCatechumensGeneral.data?._embedded.catechumens.forEach(catechumen => {
			frequency += catechumen.currentFrequency;
		});
		const size = queryMineCatechumensGeneral.data?._embedded.catechumens.length;
		if (!size) {
			return;
		}
		return frequency / size;
	}

	function inAttentionMineCatechumens() {
		let attention = 0;
			queryMineCatechumensGeneral.data?._embedded.catechumens.forEach(catechumen => {
			if (catechumen.currentFrequency < 50) {
				attention++;
			}
		});
		return attention;
	}

	function loadCatechist() {
		let catechist: CatechistResponse | null = null;
		const catechistStorage = sessionStorage.getItem('catechist');

		if (!catechistStorage) {
			return;
		}

		catechist = JSON.parse(catechistStorage);
		setCatechistId(Number(catechist?.id));
	}

	function search(value: string) {
		setFullName(value);
		setPageableParamsAPI({
			page: 0,
			size: 20,
			direction: 'asc'
		});
	}

	function selectPage(page: number) {
		setPageableParamsAPI(prev => ({
			...prev,
			page
		}));	
	}

	function nextPage() {
		setPageableParamsAPI(prev => ({
			...prev,
			page: (prev.page ?? 0) + 1
		}));
	}

	function previousPage() {
		setPageableParamsAPI(prev => ({
			...prev,
			page: (prev.page ?? 0) - 1
		}));	
	}

	return {
		selectPage,
		nextPage,
		previousPage,
		generalDataMineCatechumens,
		generalDataAllCatechumens,
		mineCatechumens: queryMineCatechumens.data ?? emptyPageable<CatechumenResponse, 'catechumens'>('catechumens'),
		allCatechumens: queryAllCatechumens.data ?? emptyPageable<CatechumenResponse, 'catechumens'>('catechumens'),
		steps: queryStep.data,
		fullName,
		search,
		isLoadingMineCatechumens: queryMineCatechumens.isLoading,
		isLoadingAllCatechumens: queryAllCatechumens.isLoading,
	}
}

export default useCatechumens;