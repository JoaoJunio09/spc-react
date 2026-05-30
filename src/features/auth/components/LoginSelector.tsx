import { BookOpen, ChevronRight, Settings, Users } from "lucide-react";
import LoginFooter from "./LoginFooter";
import LoginHeader from "./LoginHeader";

function LoginSelector() {
	return (
		<div className="max-w-[400px] w-full bg-white p-10 rounded-[20px] shadow-[0_20px_25px_-5px_rgba(15,23,42,0.08),0_10px_10px_-5px_rgba(15,23,42,0.03)] border border-slate-200 flex flex-col gap-6 relative transition-transform duration-500 ease-out">
			<LoginHeader
				title="Quem é você?" 
				subTitle="Selecione como deseja acessar o sistema." 
			/>
			
			<div className="flex flex-col gap-3.5">
				{/* Opção Catequista */}
				<button className="flex items-center gap-4 p-4 border-[1.5px] border-slate-200 hover:border-[#F59E0B] rounded-xl bg-white hover:bg-[#FFFDF5] cursor-pointer text-left transition-all duration-200 hover:-translate-y-[1px] hover:shadow-sm">
					<div className="w-11 h-11 rounded-lg flex items-center justify-center text-xl bg-[#FEF3C7] text-[#D97706]">
						<BookOpen className="w-5 h-5" />
					</div>
					<div className="flex-1">
						<h3 className="text-[0.98rem] font-extrabold text-[#1E293B] mb-0.5">Catequista</h3>
						<p className="text-[0.82rem] text-[#64748B] leading-tight">Acesso simplificado para registro rápido de presença.</p>
					</div>
					<ChevronRight className="text-[#64748B] w-4 h-4" />
				</button>

				{/* Opção Coordenação */}
				<button className="flex items-center gap-4 p-4 border-[1.5px] border-slate-200 hover:border-[#F59E0B] rounded-xl bg-white hover:bg-[#FFFDF5] cursor-pointer text-left transition-all duration-200 hover:-translate-y-[1px] hover:shadow-sm">
					<div className="w-11 h-11 rounded-lg flex items-center justify-center text-xl bg-[#DBEAFE] text-[#1E40AF]">
						<Users className="w-5 h-5" />
					</div>
					<div className="flex-1">
						<h3 className="text-[0.98rem] font-extrabold text-[#1E293B] mb-0.5">Coordenação</h3>
						<p className="text-[0.82rem] text-[#64748B] leading-tight">Gerenciamento completo das turmas e calendário.</p>
					</div>
					<ChevronRight className="text-[#64748B] w-4 h-4" />
				</button>

				{/* Opção Administrador */}
				<button className="flex items-center gap-4 p-4 border-[1.5px] border-slate-200 hover:border-[#F59E0B] rounded-xl bg-white hover:bg-[#FFFDF5] cursor-pointer text-left transition-all duration-200 hover:-translate-y-[1px] hover:shadow-sm">
					<div className="w-11 h-11 rounded-lg flex items-center justify-center text-xl bg-[#FEE2E2] text-[#EF4444]">
						<Settings className="w-5 h-5" />
					</div>
					<div className="flex-1">
						<h3 className="text-[0.98rem] font-extrabold text-[#1E293B] mb-0.5">Administrador</h3>
						<p className="text-[0.82rem] text-[#64748B] leading-tight">Controle global de usuários, configurações e paróquias.</p>
					</div>
					<ChevronRight className="text-[#64748B] w-4 h-4" />
				</button>
			</div>

			<LoginFooter />
		</div>
	)
}

export default LoginSelector;