import { useState } from "react";
import { toast } from "react-toastify";
import ConflictInTheDatabaseException from "../../../exceptions/database/ConflicInTheDatabaseException";
import InternalServerError from "../../../exceptions/server/InternalServerError";
import useMassService from "../../../hooks/useMassService";

function useMass() {
	const [error, setError] = useState<string | null>(null);

	const massService = useMassService();
	
	async function deleteMass(id: number, onSuccess: () => Promise<void>) {
		try {
			if (Number.isNaN(id) || id === 0) {
				setError('ID inválido');
				return;
			}

			setError(null);

			await massService.delete(id);
			await onSuccess();
			toast.success('Removido com sucesso');
		}
		catch (err) {
			if (err instanceof ConflictInTheDatabaseException) {
				toast.info(err.message);
			}
			else if (err instanceof InternalServerError) {
				toast.error('Erro ao remover Missa');
			}
			else {
				toast.error('Erro inesperado ao remover Missa');
			}
		}
	}

	return {
		deleteMass,
		error
	}
}

export default useMass;