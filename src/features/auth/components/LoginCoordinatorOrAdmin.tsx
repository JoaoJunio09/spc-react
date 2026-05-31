import { ArrowLeft, Eye, Lock, User } from "lucide-react";
import LoginHeader from "./LoginHeader";
import LoginFooter from "./LoginFooter";
import type { onLoginSelectorProps } from "./Login";
import useAuthCoordinatorOrAdmin from "../hooks/useAuthCoordinatorOrAdmin";
import { useEffect } from "react";
import { toast } from "react-toastify";

const RememberAccess: React.FC = () => (
	<div className="flex items-center justify-between text-[0.85rem] mt-1">
		<label className="flex items-center gap-2 cursor-pointer select-none group">
			<div className="relative flex items-center">
				<input type="checkbox" name="remember" className="sr-only peer" />
				<div className="w-[18px] h-[18px] bg-slate-50 border-[1.5px] border-slate-200 rounded-[5px] transition-all group-hover:border-[#F59E0B] group-hover:bg-[#FEF3C7] peer-checked:bg-[#F59E0B] peer-checked:border-[#F59E0B] flex items-center justify-center">
					<svg className="w-2.5 h-2.5 text-white stroke-white stroke-[3px] fill-none" viewBox="0 0 24 24">
						<polyline points="20 6 9 17 4 12" />
					</svg>
				</div>
			</div>
			<span className="text-[#1E293B] font-semibold">Lembrar acesso</span>
		</label>
		<a 
			href="#forgot" 
			className="text-[#D97706] hover:text-[#EA580C] font-bold transition-colors hover:underline" 
			onClick={(e) => e.preventDefault()}
		>
			Esqueci minha senha
		</a>
	</div>
);


function LoginCoordinatorOrAdmin({ onSelectLogin, roleCoordinatorOrAdmin }: onLoginSelectorProps) {
	const { handleOnChange, error, auth } = useAuthCoordinatorOrAdmin();

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
	}, [error]);

	return (
		<div className="max-w-[400px] w-full bg-white p-10 rounded-[20px] shadow-[0_20px_25px_-5px_rgba(15,23,42,0.08),0_10px_10px_-5px_rgba(15,23,42,0.03)] border border-slate-200 flex flex-col gap-6 relative transition-transform duration-500 ease-out">
			<LoginHeader 
				title={`Acesso ${roleCoordinatorOrAdmin}`} 
				subTitle="Entre com suas credenciais administrativas." 
			/>

			<form className="flex flex-col gap-5 text-left" onSubmit={(e) => e.preventDefault()}>
				{/* Nome de usuário */}
				<div className="flex flex-col gap-2">
					<label htmlFor="admin-username" className="text-[0.85rem] font-bold text-[#1E293B]">Nome de usuário</label>
					<div className="relative flex items-center">
						<span className="absolute left-4 text-[#64748B] pointer-events-none select-none flex items-center">
							<User className="w-4 h-4" />
						</span>
						<input 
							type="text"
							name="username"
							id="username"
							onChange={handleOnChange}
							placeholder="Digite seu usuário" 
							className="w-full py-[14px] pl-11 pr-4 border-[1.5px] border-slate-200 rounded-xl bg-slate-50 text-[#1E293B] text-[0.95rem] font-medium outline-none transition-all duration-200 focus:border-[#F59E0B] focus:bg-white focus:ring-4 focus:ring-[#F59E0B]/12"
						/>
					</div>
				</div>

				{/* Senha */}
				<div className="flex flex-col gap-2">
					<label htmlFor="admin-password" className="text-[0.85rem] font-bold text-[#1E293B]">Senha</label>
					<div className="relative flex items-center">
						<span className="absolute left-4 text-[#64748B] pointer-events-none select-none flex items-center">
							<Lock className="w-4 h-4" />
						</span>
						<input 
							type="password" 
							name="password"
							id="password"
							onChange={handleOnChange}
							placeholder="Digite sua senha" 
							className="w-full py-[14px] pl-11 pr-12 border-[1.5px] border-slate-200 rounded-xl bg-slate-50 text-[#1E293B] text-[0.95rem] font-medium outline-none transition-all duration-200 focus:border-[#F59E0B] focus:bg-white focus:ring-4 focus:ring-[#F59E0B]/12"
						/>
						<button type="button" className="absolute right-3.5 bg-none border-none text-[#64748B] cursor-pointer flex items-center justify-center p-1 rounded-full transition-all duration-150 hover:text-[#1E293B] hover:bg-slate-100" aria-label="Mostrar senha">
							<Eye className="w-4 h-4" />
						</button>
					</div>
				</div>

				{/* Checkbox de Sessão */}
				<RememberAccess />

				{/* Botões de Acesso */}
				<button
					type="submit"
					className="w-full bg-gradient-to-br from-[#F59E0B] to-[#EA580C] text-white border-none py-[14px] rounded-xl text-base font-extrabold cursor-pointer shadow-lg shadow-[#EA580C]/20 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-xl hover:shadow-[#EA580C]/30 hover:brightness-[1.05] flex items-center justify-center gap-2"
					onClick={() => auth()}
				>
					Entrar como {roleCoordinatorOrAdmin}
				</button>

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

export default LoginCoordinatorOrAdmin;