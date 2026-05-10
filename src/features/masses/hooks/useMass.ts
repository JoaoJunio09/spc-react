import { useState } from "react";
import MassService from "../../../services/MassService";

function useMass() {
	const [error, setError] = useState<string | null>(null);

	const massService: MassService = new MassService();
	
	async function deleteMass(id: number, onSuccess: () => Promise<void>) {
		try {
			if (Number.isNaN(id) || id === null) {
				setError('ID inválido');
				return;
			}

			setError(null);
			await massService.delete(id);
			onSuccess();
		}
		catch (err) {
			throw err;
		}
	}

	return {
		deleteMass
	}
}

export default useMass;