import { useEffect, useState } from "react";
import type { MassResponse } from "../../../data/mass/MassResponse";
import useMassService from "../../../hooks/useMassService";
import { UtilsDate } from "../../../utils/UtilsDate";
import type { InfoDialogState } from "../../../types/InfoDialogState";

function useLoadMasses() {
	const [masses, setMasses]						= useState<MassResponse[]>([]);
	const [massesDates, setMassesDates] = useState<string[]>([]);
	const [isLoading, setIsLoading] 		= useState(false);
	const [progress, setProgress]				= useState(0);
	const [error, setError] 						= useState<string | null>(null);
	const [infoDialog, setInfoDialog]		= useState<InfoDialogState>({
		open: false,
		variant: 'info',
		title: '',
		description: '',
		buttonText: '',
		path: undefined
	});

	const massService = useMassService();

	useEffect(() => {		
		loadMasses();
	}, []);

	function openInfoDialog(data: Omit<InfoDialogState, 'open'>) {
		setInfoDialog({
			open: true,
			...data
		});
	}

	function closeInfoDialog() {
		setInfoDialog((prev) => ({
			...prev,
			open: false
		}));
	}

	async function loadMasses() {
		try {
			setIsLoading(true);
			setError(null);
			
			const dataMassesDates: string[] = await massService.getMassesDatesByCommunityOrParish({});
			setMassesDates(dataMassesDates.map(date => UtilsDate.formatDateTimeThisMissaForDate(date)));

			setProgress(70);

			const dataMases: MassResponse[] = await massService.getAll({});
			setMasses(dataMases);

			setProgress(100);

			 setTimeout(() => {
				setIsLoading(false);
				setProgress(0);
			}, 400);
		}
		catch (err) {
			setError('Erro ao carregar as datas das Missas');
			setIsLoading(false);
			setProgress(0);
		}
	}

	return {
		masses,
		massesDates,
		isLoading,
		setIsLoading,
		progress,
		infoDialog,
		openInfoDialog,
		closeInfoDialog,
		error
	}
}

export default useLoadMasses;