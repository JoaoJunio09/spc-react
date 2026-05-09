import { useEffect, useState } from "react";
import type { MassResponse } from "../../../interfaces/mass/MassResponse";
import { UtilsDate } from "../../../utils/UtilsDate";

type MassFormData = {
	id: number | null,
	massTitleOfLicaturgicalCalendar: string,
	date: string,
	time: string,
	location: string
}

function useMassFormModal(mass: MassResponse | null) {
	const [formData, setFormData] = useState<MassFormData>({
		id: null,
		massTitleOfLicaturgicalCalendar: '',
		date: '',
		time: '',
		location: ''
	});
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!mass) return;
		setFormData({
			id: mass.id,
			massTitleOfLicaturgicalCalendar: mass.massOfLiturgicalCalendar.title,
			date: UtilsDate.formatDateTimeThisMissaForDate(mass.dateTime),
			time: UtilsDate.formatDateTimeThisMissaForTime(mass.dateTime),
			location: mass.location
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

		try {
			
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