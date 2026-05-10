import { useEffect, useState } from "react";
import type { MassResponse } from "../../../interfaces/mass/MassResponse";
import { UtilsDate } from "../../../utils/UtilsDate";
import type { MassRequest } from "../../../interfaces/mass/MassRequest";
import MassService from "../../../services/MassService";
import LiturgicalCalendarService from "../../../services/LiturgicalCalendarService";
import { toast } from "react-toastify";
import type { CommunityOrParish } from "../../../enums/CommunityOrParish";

type MassFormData = {
	id: number | null,
	massTitleOfLicaturgicalCalendar: string,
	date: string,
	time: string,
	location: string,
	communityOrParish: string
}

function useMassFormModal(
	mass: MassResponse | null,
	onClose: () => void,
	onSuccess: () => Promise<void>
) {
	const [formData, setFormData] = useState<MassFormData>({
		id: null,
		massTitleOfLicaturgicalCalendar: '',
		date: '',
		time: '',
		location: '',
		communityOrParish: ''
	});
	const [error, setError] = useState<string | null>(null);

	let communityOrParish: CommunityOrParish | null = null;

	communityOrParish = sessionStorage.getItem('communityOrParish') === 'SAO_SEBASTIAO'
		? 'SAO_SEBASTIAO'
		: 'DIVINO_ESPIRITO_SANTO';

	const liturgicalCalendarService: LiturgicalCalendarService = new LiturgicalCalendarService();
	const massService: MassService = new MassService();

	useEffect(() => {
		if (!mass || !communityOrParish) return;
		setFormData({
			id: mass.id,
			massTitleOfLicaturgicalCalendar: mass.massOfLiturgicalCalendar.title,
			date: UtilsDate.formatDateTimeThisMissaForDate(mass.dateTime),
			time: UtilsDate.formatDateTimeThisMissaForTime(mass.dateTime),
			location: mass.location,
			communityOrParish: communityOrParish
		});
	}, [mass]);

	function handleOnChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	}
	
	async function saveOrUpdate(e: { preventDefault: () => void }) {
		e.preventDefault();

		let isEditing: boolean = false;

		if (!formData) return;
		if (formData.id !== null) isEditing = true;

		const massOfLiturgicalCalendar = await liturgicalCalendarService.getAll({ title: formData.massTitleOfLicaturgicalCalendar });
		const massLiturgicalCalendarId = massOfLiturgicalCalendar[0].id;

		if (!communityOrParish) return;

		let mass: MassRequest = {
			id: formData.id,
			massOfLiturgicalCalendarId: massLiturgicalCalendarId,
			dateTime: `${formData.date}T${formData.time}`,
			location: formData.location,
			communityOrParish: communityOrParish
		};

		try {
			setError(null);

			if (isEditing) {
				const massUpdated = await massService.update(mass);
				// atualiza cache e storage
				await onSuccess();
				toast.success('Atualizado com Sucesso');
				onClose();
			}
			else {
				const massCreated = await massService.create(mass);
				// atualiza cache e storage
				toast.success('Registrado com Sucesso');
				await onSuccess();
				onClose();
			}
		}
		catch (err) {
			setError('Erro ao salvar');
		}
	}

	return {
		formData,
		saveOrUpdate,
		handleOnChange,
		error
	}
}

export default useMassFormModal;