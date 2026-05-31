import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../../../context/AuthContext";
import type { CommunityOrParish } from "../../../enums/CommunityOrParish";
import useLoadCatechists from "../hooks/useLoadCatechists";
import type { onLoginSelectorProps } from "./Login";
import LoginFooter from "./LoginFooter";
import LoginHeader from "./LoginHeader";
import type { CatechistCredentials } from "../../../interfaces/auth/CatechistCredentials";
import AuthenticationError from "../../../exceptions/auth/AuthenticationError";
import InvalidOrEmptyFields from "../../../exceptions/form/InvalidOrEmptyFields";
import InternalServerError from "../../../exceptions/server/InternalServerError";

function assingsCommunityOrParish(selectedCode: string): CommunityOrParish | null {
	if (selectedCode === '0') return 'SAO_SEBASTIAO';
	else if (selectedCode === '1') return 'DIVINO_ESPIRITO_SANTO';
	return null;
}

function LoginCatechist({ onSelectLogin }: onLoginSelectorProps) {
	const { catechists, error: errorLoadCatechists } = useLoadCatechists();

	const [catechistId, setCatechistId] = useState('');
	const [code, setCode]								= useState('');

	const { signInCatechist } = useAuthContext();

	async function handleSignIn() {
		let communityOrParish: CommunityOrParish | null = assingsCommunityOrParish(code);
		const id = Number(catechistId);

		if (!communityOrParish) {
			return;
		}

		const credentials: CatechistCredentials = {
			catechistId: id,
			communityOrParish: communityOrParish
		}

		try {
			await signInCatechist(credentials);
		}
		catch (err) {
			if (err instanceof InvalidOrEmptyFields) {
				toast.error(err.message);
			}
			if (err instanceof InternalServerError) {
				toast.error(err.message);
			}
		}
	}

	useEffect(() => {
		if (errorLoadCatechists) {
			toast.error(errorLoadCatechists);
		}
	}, [errorLoadCatechists]);

	return (
		<div className="max-w-[400px] w-full bg-white p-10 rounded-[20px] shadow-[0_20px_25px_-5px_rgba(15,23,42,0.08),0_10px_10px_-5px_rgba(15,23,42,0.03)] border border-slate-200 flex flex-col gap-6 relative transition-transform duration-500 ease-out">
			<LoginHeader
				title="Acesso do Catequista" 
				subTitle="Selecione seu nome e informe o código da paróquia." 
			/>

			<form className="flex flex-col gap-5 text-left" onSubmit={(e) => e.preventDefault()}>
				{/* Campo Seletor Catequista */}
				<div className="flex flex-col gap-2">
					<label htmlFor="catechist-select" className="text-[0.85rem] font-bold text-[#1E293B]">Selecione seu nome</label>
					<div className="relative flex items-center">
						<select
							id="selectedCatechistId" 
							name="selectedCatechistId"
							value={catechistId}
							onChange={(e) => setCatechistId(e.target.value)} 
							className="w-full py-[14px] pl-11 pr-11 border-[1.5px] border-slate-200 rounded-xl bg-slate-50 text-[#1E293B] text-[0.95rem] font-medium outline-none transition-all duration-200 focus:border-[#F59E0B] focus:bg-white focus:ring-4 focus:ring-[#F59E0B]/12 appearance-none"
						>
							<option value="" disabled>Quem é você?</option>							
							{catechists.map(catechist => (
								<option key={catechist.id} value={catechist.id}>
									{catechist.firstName} {catechist.lastName}
								</option>
							))}
						</select>
						<span className="absolute right-4 pointer-events-none text-[#64748B] text-xs">▼</span>
					</div>
				</div>

				{/* Campo Código da Paróquia */}
				<div className="flex flex-col gap-2">
					<label htmlFor="parish-code" className="text-[0.85rem] font-bold text-[#1E293B]">Selecione o código</label>
					<div className="relative flex items-center">
						<select
							id="catechist-select" 
							name="selectedCode"
							value={code}
							onChange={(e) => setCode(e.target.value)}
							className="w-full py-[14px] pl-11 pr-11 border-[1.5px] border-slate-200 rounded-xl bg-slate-50 text-[#1E293B] text-[0.95rem] font-medium outline-none transition-all duration-200 focus:border-[#F59E0B] focus:bg-white focus:ring-4 focus:ring-[#F59E0B]/12 appearance-none"
						>
							<option value="" disabled>Código da paróquia</option>
							<option value="0">0</option>
							<option value="1">1</option>
						</select>
						<span className="absolute right-4 pointer-events-none text-[#64748B] text-xs">▼</span>
					</div>
				</div>

				{/* Botão Entrar */}
				<button 
					type="submit"
					className="w-full bg-gradient-to-br from-[#F59E0B] to-[#EA580C] text-white border-none py-[14px] rounded-xl text-base font-extrabold cursor-pointer shadow-lg shadow-[#EA580C]/20 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-xl hover:shadow-[#EA580C]/30 hover:brightness-[1.05] flex items-center justify-center gap-2"
					onClick={() => handleSignIn()}
				>
					Entrar no Sistema
				</button>

				{/* Botão Voltar */}
				<button
					type="button"
					className="w-full bg-none border-[1.5px] border-slate-200 text-[#64748B] py-3 rounded-xl text-[0.9rem] font-bold cursor-pointer transition-all duration-200 hover:bg-slate-100 hover:text-[#1E293B] hover:border-slate-300 flex items-center justify-center gap-2"
					onClick={() => onSelectLogin(null)}
				>
					<ArrowLeft className="w-4 h-4" /> Voltar para seleção de perfil
				</button>
			</form>

			<LoginFooter />
		</div>
	)
}

export default LoginCatechist;