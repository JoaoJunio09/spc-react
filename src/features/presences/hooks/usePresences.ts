import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import useMassService from "../../../hooks/useMassService";
import usePresenceService from "../../../hooks/usePresenceService";

function usePresences() {
	const [titleLiturgicalCalendar, setTitleLigurticalCalendar] = useState<string>('');
	const [fullName, setFullName] = useState<string>('');
	const [massId, setMassId] = useState<number | null>(null);

	const massService = useMassService();
	const presenceService = usePresenceService();

	const debouncedName = useDebounce(fullName, 2000);
	
	const queryMasses = useQuery({
		queryKey: [
			'masses',
			titleLiturgicalCalendar
		],
		queryFn: () => massService.getAll({ title: titleLiturgicalCalendar }),
		retry: 3
	});

	const queryPresences = useQuery({
		queryKey: [
			'presences',
			titleLiturgicalCalendar,
			debouncedName,
			massId
		],
		queryFn: ({ signal }) => 
			presenceService.getAll({
				titleMass: titleLiturgicalCalendar ?? undefined,
				massId: massId ?? undefined,
				fullName: debouncedName ?? undefined,
				signal
			}),
		enabled: !!titleLiturgicalCalendar || !!massId || !!debouncedName,
		retry: 3,
		staleTime: 1000 * 60 * 5
	});

	function filterMasses(value: string) {
		setTitleLigurticalCalendar(value);
	}

	function filterByFullName(value: string) {
		setFullName(value);
	}

	function filterByMass(id: number) {
		setMassId(id);
	}

	return {
		masses: queryMasses.data ?? [],
		presences: queryPresences.data ?? [],
		loadingMasses: queryMasses.isLoading,
		errorMasses: queryMasses.isError,
		loadingPresences: queryPresences.isLoading,
		errorPresences: queryPresences.isError,
		filterMasses,
		filterByFullName,
		filterByMass
	}
}

export default usePresences;