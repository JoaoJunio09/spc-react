import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { usePresenceContext } from "../../../context/PresenceContext";
import type { CatechumenResponse } from "../../../data/catechumen/CatechumenResponse";
import type { MassResponse } from "../../../data/mass/MassResponse";
import { emptyPageable } from "../../../data/pageable/Pageable";
import useCatechumenService from "../../../hooks/useCatechumenService";
import useDebounce from "../../../hooks/useDebounce";
import useMassService from "../../../hooks/useMassService";
import usePresenceService from "../../../hooks/usePresenceService";

function useRegisterPresence() {
	const [fullName, setFullName]						= useState<string>('');
	const [stepId, setStepId]								= useState<number | null>(null);
	const [countSelected, setCountSelected] = useState(0);
	const [titleMass, setTitleMass] 				= useState<string>('');

	const {
		catechumensPresent,
		setCatechumensPresent,
		presencesOfCatechumensSavedInDatabase,
		setPresencesOfCatechumensSavedInDatabase
	} = usePresenceContext();

	const catechumenService = useCatechumenService();
	const presenceService = usePresenceService();
	const massService = useMassService();

	const navigate = useNavigate();

	const { massId } = useParams();
	const [searchParams] = useSearchParams();

	const isRetroactive = searchParams.get('retroativo') === 'true';

	const debouncedName = useDebounce(fullName, 400);

	const query = useQuery({
		queryKey: [
			'catechumens',
			debouncedName,
			stepId
		],

		queryFn: ({ signal }) =>
			catechumenService.getAll({
				fullName: debouncedName ?? undefined,
				stepId: stepId ?? undefined,
				signal
			}),

		enabled: !!debouncedName || !!stepId,

		staleTime: 1000 * 60 * 5
	});

	useEffect(() => {
		checkExistingsPresences();
		setCountSelected(catechumensPresent.length);
	}, [debouncedName]);

	async function checkExistingsPresences() {
		let currentTitle = titleMass;

		if (!currentTitle) {
			const mass: MassResponse = await massService.getById(Number(massId));
			currentTitle = mass.title;
			setTitleMass(currentTitle);
		}

		const catechumensIsPresent = await presenceService.getAll({ titleMass: currentTitle });
		setPresencesOfCatechumensSavedInDatabase(catechumensIsPresent);
	}

	function markPresence(catechumen: CatechumenResponse) {
		if (!isPresent(catechumen)) {
			setCatechumensPresent([...catechumensPresent, catechumen]);
			setCountSelected(countSelected+1);
		}
	}

	function markAbsence(catechumen: CatechumenResponse) {
		if (isPresent(catechumen)) {
			setCatechumensPresent(prev => prev.filter(
				catechumenPresent => catechumenPresent.id !== catechumen.id
			));
			setCountSelected(countSelected-1);
		}
	}

	function review() {
		sessionStorage.setItem('@catechumensPresent', JSON.stringify(catechumensPresent));
		navigate(`/presencas/confirmar/${massId}`);
	}

	function isPresent(catechumen: CatechumenResponse): boolean {
		return catechumensPresent.some(catechumenPresent => catechumenPresent.id === catechumen.id);
	}

	function isBlockButtonPresence(catechumen: CatechumenResponse): boolean {
		return presencesOfCatechumensSavedInDatabase.some(catechumensPresent => catechumensPresent.catechumen.id === catechumen.id);
	}

	function search(value: string) {
		setStepId(null);
		setFullName(value);
	}

	function listCatechumens(stepId: number) {
		setFullName('');
		setStepId(stepId);
	}

	function clear(): boolean {
		setFullName('');
		setStepId(null);
		setCatechumensPresent([]);
		setCountSelected(0);
		sessionStorage.removeItem('@catechumensPresent');

		if (catechumensPresent.length === 0) return true;
		return false;
	}

	return {
		pageable: query.data ?? emptyPageable<CatechumenResponse, 'catechumens'>('catechumens'),
		loading: query.isPending,
		error: query.error,
		checkExistingsPresences,
		fullName,
		stepId,
		markPresence,
		markAbsence,
		review,
		isPresent,
		isBlockButtonPresence,
		search,
		listCatechumens,
		countSelected,
		isRetroactive,
		clear,
	}
}

export default useRegisterPresence;