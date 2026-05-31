import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { CommunityOrParish } from "../../../enums/CommunityOrParish";
import AuthenticationError from "../../../exceptions/auth/AuthenticationError";
import InvalidOrEmptyFields from "../../../exceptions/form/InvalidOrEmptyFields";
import type { CatechistResponse } from "../../../interfaces/catechist/CatechistResponse";
import { useAuthContext } from "../../../context/AuthContext";

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

function useAuthCatechist(catechists?: CatechistResponse[] | []) {
	const [selectedCatechistId, setSelectedCatechistId] = useState('');
	const [selectedCode, setSelectedCode]								= useState('');
	const [error, setError]															= useState<string | null>(null);

	const { signIn } = useAuthContext();

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

					// busco user no banco pelo id do catechist
					// autentico o user com signIn

					const userName = catechist.userName;

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

export default useAuthCatechist;