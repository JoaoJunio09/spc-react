import { useState } from "react";
import type { CatechistResponse } from "../../../interfaces/catechist/CatechistResponse";
import type { CommunityOrParish } from "../../../types/CommunityOrParish";
import { useNavigate } from "react-router-dom";
import AuthenticationError from "../../../exceptions/auth/AuthenticationError";
import InvalidOrEmptyFields from "../../../exceptions/form/InvalidOrEmptyFields";
import { toast } from "react-toastify";

function fieldValidation(id: number, communityOrParish: CommunityOrParish | null): void {
	if (id === 0) {
		throw new InvalidOrEmptyFields('Selecione quem é você');
	}
	if (communityOrParish === null) {
		throw new InvalidOrEmptyFields('Selecione um codigo');
	}
}

function assingsCommunityOrParish(selectedCode: string): CommunityOrParish | null {
	if (selectedCode === '0') return 'SAO_SEBASTIAO';
	else if (selectedCode === '1') return 'DIVINO_ESPIRITO_SANTO';
	return null;
}

function useAuth(catechists?: CatechistResponse[] | []) {
	const [selectedCatechistId, setSelectedCatechistId] = useState('');
	const [selectedCode, setSelectedCode]						= useState('');
	const [error, setError]													= useState<string | null>(null);

	const nagivate = useNavigate();

	async function auth() {
		let communityOrParish: CommunityOrParish | null = assingsCommunityOrParish(selectedCode);
		const id = Number(selectedCatechistId);

		let authenticated: boolean = false;

		try {
			fieldValidation(id, communityOrParish);
			setError(null);

			catechists?.forEach(catechist => {
				if (catechist.id === id && catechist.communityOrParish === communityOrParish) {
					sessionStorage.setItem('communityOrParish', communityOrParish);
					sessionStorage.setItem('catechist', JSON.stringify(catechist));
					sessionStorage.setItem('userName', catechist.firstName);
					authenticated = true;
				}
			});

			if (authenticated) {
				nagivate('/inicio');
				toast.dismiss();
				toast.success('Logado com sucesso', { autoClose: 2000 });
				return;
			}

			throw new AuthenticationError('Catequista inválido');
		}
		catch (err) {
			if (err instanceof AuthenticationError) {
				setError(err.message);
			}
			else if (err instanceof InvalidOrEmptyFields) {
				setError(err.message);
			}
			else { 
				setError('Não foi possível fazer login');
			}
		}
	}

	return {
		selectedCatechistId, 
		setSelectedCatechistId, 
		selectedCode, 
		setSelectedCode,
		error,
		auth,
	}
}

export default useAuth;