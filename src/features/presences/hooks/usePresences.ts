import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import MassService from "../../../services/MassService";

const massService: MassService = new MassService();

function usePresences() {
	const [titleLiturgicalCalendar, setTitleLigurticalCalendar] = useState<string>('');
	
	const queryMasses = useQuery({
		queryKey: [
			'masses',
			titleLiturgicalCalendar
		],
		queryFn: () => massService.getAll({ title: titleLiturgicalCalendar }),
		retry: 3
	});

	function filter(title: string) {
		setTitleLigurticalCalendar(title);
	}

	return {
		masses: queryMasses.data ?? [],
		loadingMasses: queryMasses.isLoading,
		errorMasses: queryMasses.isError,
		filter,
	}
}

export default usePresences;