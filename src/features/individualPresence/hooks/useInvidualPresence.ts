import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { CatechumenResponse } from "../../../data/catechumen/CatechumenResponse";
import type { MassResponse } from "../../../data/mass/MassResponse";
import useCatechumenService from "../../../hooks/useCatechumenService";
import useMassService from "../../../hooks/useMassService";
import usePresenceService from "../../../hooks/usePresenceService";
import type { PresenceResponse } from "../../../data/presence/PresenceResponse";

export interface History {
	catechumen: CatechumenResponse | null,
	mass: MassResponse,
	presence: PresenceResponse | null,
	status: 'present' | 'absent'
}

function useInvidualPresence() {
	const [activeFilter, setActiveFilter] = useState<'all' | 'presents' | 'absents'>('presents');
	const { catechumenId } = useParams();
	
	const id = useMemo(() => Number(catechumenId), [catechumenId]);
	const now = useMemo(() => {
		const date = new Date();
		return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
			.toISOString()
			.slice(0, 19);
	}, []);

	const catechumenService = useCatechumenService();
	const presenceService = usePresenceService();
	const massService = useMassService();

	const queryCatechumen = useQuery({
		queryKey: [
			'catechumen',
			id
		],
		queryFn: () => catechumenService.getById(id)
	});

	const queryPresences = useQuery({
		queryKey: [
			'presences',
			id
		],
		queryFn: () => presenceService.getAll({
			catechumenId: id
		}),
		enabled: !!id,
		retry: 3
	});

	const queryMasses = useQuery({
		queryKey: ['masses'],
		queryFn: () => massService.getAll({
			occurredUntilByMassTitle: now
		})
	});

	const history = useMemo<History[]>(() => {
		if (!queryMasses.data) return [];

		return queryMasses.data.map(mass => {
			const presenceByCatechumen = queryPresences.data?.find(
				presence => presence.mass.title === mass.title
			) ?? null;

			return {
				catechumen: queryCatechumen.data ?? null,
				mass,
				presence: presenceByCatechumen,
				status: presenceByCatechumen ? "present" : "absent"
			};
		});
	}, [
		queryMasses.data,
		queryPresences.data,
		queryCatechumen.data
	]);

	const filteredHistory = useMemo<History[]>(() => {
		if (activeFilter === "presents") {
			return history.filter(record => record.status === 'present');
		}
		if (activeFilter === "absents") {
			return history.filter(record => record.status === 'absent');
		}
		return history;
	}, [history, activeFilter]);

	function filter(filter: 'presents' | 'absents' | 'all') {
		setActiveFilter(filter);
	}

	return {
		presences: queryPresences.data ?? [],
		masses: queryMasses.data ?? [],
		catechumen: queryCatechumen.data ?? null,
		filter,
		activeFilter,
		filteredHistory,
		isLoadingPresences: queryPresences.isLoading,
		isLoadingMasses: queryMasses.isLoading,
		isLoadingCatechumen: queryCatechumen.isLoading
	}
}

export default useInvidualPresence;