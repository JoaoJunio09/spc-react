import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { MassRequest } from "../../../data/mass/MassRequest";
import type { MassResponse } from "../../../data/mass/MassResponse";
import type { CommunityOrParish } from "../../../enums/CommunityOrParish";
import useLiturgicalCalendarService from "../../../hooks/useLiturgicalCalendarService";
import useMassService from "../../../hooks/useMassService";
import { ObtainCommunityOrParish } from "../../../utils/ObtainCommunityOrParish";
import { UtilsDate } from "../../../utils/UtilsDate";
import type { MassLocation } from "../../../enums/MassLocation";

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

	const liturgicalCalendarService = useLiturgicalCalendarService();
	const massService = useMassService();

	function communityOrParishByLocation(location: MassLocation) {
		let communityOrParish: CommunityOrParish | null = null; 
		if (location === 'MATRIZ') {
			communityOrParish = "SAO_SEBASTIAO";
		} else {
			communityOrParish = 'DIVINO_ESPIRITO_SANTO';
		}
		return communityOrParish;
	}

	useEffect(() => {
		if (!mass) return;
		setFormData({
			id: mass.id,
			massTitleOfLicaturgicalCalendar: mass.massOfLiturgicalCalendar.title,
			date: UtilsDate.formatDateTimeThisMissaForDate(mass.dateTime),
			time: UtilsDate.formatDateTimeThisMissaForTime(mass.dateTime),
			location: mass.location,
			communityOrParish: communityOrParishByLocation(mass.location)
		});
	}, [mass]);

	async function handleOnChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value
		}));

		if (name === "massTitleOfLicaturgicalCalendar" && value) {
			try {
				const massOfLiturgicalCalendar = await liturgicalCalendarService.getAll({ title: value });
				
				if (massOfLiturgicalCalendar.length === 0) return;

				setFormData((prev) => ({
					...prev,
					massTitleOfLicaturgicalCalendar: value,
					date: UtilsDate.formatDateTimeThisMissaForDate(massOfLiturgicalCalendar[0].date)
				}));
			}
			catch (err) {
				toast.error('Erro ao buscar Missa do Calendário Litúrgico');
			}
		}
	}
	
	async function saveOrUpdate(e: { preventDefault: () => void }) {
		e.preventDefault();

		let isEditing: boolean = false;
		let massLiturgicalCalendarId: number = 0;

		if (!formData) return;
		if (formData.id !== null) isEditing = true;

		try {
			const massOfLiturgicalCalendar = await liturgicalCalendarService.getAll({ title: formData.massTitleOfLicaturgicalCalendar });
			massLiturgicalCalendarId = massOfLiturgicalCalendar[0].id;
		}
		catch (err) {
			toast.error('Erro ao buscar Missa do Calendário Litúrgico');
		}

		let mass: MassRequest = {
			id: formData.id,
			massOfLiturgicalCalendarId: massLiturgicalCalendarId,
			dateTime: `${formData.date}T${formData.time}`,
			location: formData.location,
			communityOrParish: formData.location === 'MATRIZ' ? 'SAO_SEBASTIAO' : 'DIVINO_ESPIRITO_SANTO'
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