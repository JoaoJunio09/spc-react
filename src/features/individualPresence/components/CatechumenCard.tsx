import { BookOpen, Users } from "lucide-react";
import type { CatechumenResponse } from "../../../data/catechumen/CatechumenResponse";
import { FormatStep } from "../../../utils/FormatStep";

type CatechumenCardProps = {
	catechumen: CatechumenResponse
	presences: number,
	massesOccurred: number
}

function CatechumenCard({
	catechumen,
	presences,
	massesOccurred
}: CatechumenCardProps) {
	const getRateColor = (rate: number) => {
    if (rate >= 75) return "bg-emerald-500";
    if (rate >= 50) return "bg-amber-500";
    return "bg-rose-500";
  };

	const getRateTextColor = (rate: number) => {
    if (rate >= 75) return "text-emerald-700 bg-emerald-50 border-emerald-200";
    if (rate >= 50) return "text-amber-700 bg-amber-50 border-amber-200";
    return "text-rose-700 bg-rose-50 border-rose-200";
  };
	
	return (
		<section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7 mb-8 transition-all hover:border-slate-300">  
				{/* Dados Gerais do Estudante */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
					<div className="text-left">
						<span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Catequizando</span>
						<h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
							{catechumen.firstName} {catechumen.lastName}
						</h2>
						
						<div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5 text-xs font-semibold text-slate-500">
							<div className="flex items-center gap-1.5">
								<BookOpen className="w-4 h-4 text-amber-500" />
								<span className="text-slate-400">Turma:</span>
								<span className="font-bold text-slate-800">{FormatStep.format(catechumen.step.stepName)}</span>
							</div>
							<div className="hidden sm:inline text-slate-300">•</div>
							<div className="flex items-center gap-1.5">
								<Users className="w-4 h-4 text-slate-400" />
								<span className="text-slate-400">
									{catechumen.step.catechists.length > 1? "Catequistas:" : "Catequista:"}
								</span>
								<span className="font-bold text-slate-800">
									{catechumen.step.catechists.map((catechist, index) => (
										<span key={catechist.id}>
											{index > 0 && " • "}
											{catechist.firstName}
										</span>
									))}
								</span>
							</div>
						</div>
					</div>

					{/* Badge de Status de Frequência */}
					<div className="flex sm:justify-end">
						<span
							className={`
								inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-extrabold tracking-wide uppercase border
								${getRateTextColor(catechumen.currentFrequency)}
							`}
						>
							{catechumen.currentFrequency >= 75 ? "Boa Frequência" : catechumen.currentFrequency >= 50 ? "Atenção" : "Baixa Frequência"}
						</span>
					</div>
				</div>

				{/* Indicadores de Frequência Corrigidos */}
				<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
					<div className="bg-slate-50 rounded-xl p-4 border border-slate-100 transition-colors hover:bg-slate-100/50">
						<span className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-1">Frequência Atual</span>
						<div className="flex items-baseline gap-1">
							<span className="text-2xl font-black text-slate-950">{catechumen.currentFrequency}</span>
							<span className="text-xs font-extrabold text-slate-400">%</span>
						</div>
					</div>

					<div className="bg-slate-50 rounded-xl p-4 border border-slate-100 transition-colors hover:bg-slate-100/50">
						<span className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-1">Presenças</span>
						<div className="flex items-baseline gap-1">
							<span className="text-2xl font-black text-emerald-600">{presences}</span>
							<span className="text-[0.68rem] font-bold text-emerald-500/80 uppercase">missas</span>
						</div>
					</div>

					<div className="bg-slate-50 rounded-xl p-4 border border-slate-100 transition-colors hover:bg-slate-100/50">
						<span className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-1">Ausências</span>
						<div className="flex items-baseline gap-1">
							<span className="text-2xl font-black text-rose-500">{massesOccurred - presences}</span>
							<span className="text-[0.68rem] font-bold text-rose-400/80 uppercase">faltas</span>
						</div>
					</div>

					<div className="bg-slate-50 rounded-xl p-4 border border-slate-100 transition-colors hover:bg-slate-100/50">
						<span className="block text-[0.68rem] font-bold text-slate-400 uppercase tracking-wider mb-1">Missas Ocorridas</span>
						<div className="flex items-baseline gap-1">
							<span className="text-2xl font-black text-slate-700">{massesOccurred}</span>
							<span className="text-[0.68rem] font-bold text-slate-400 uppercase">celebradas</span>
						</div>
					</div>
				</div>

				{/* Barra Visual de Frequência */}
				<div className="pt-4 border-t border-slate-100 text-left">
					<div className="flex items-center justify-between text-xs font-bold mb-2">
						<span className="text-slate-400 uppercase tracking-wider">Aproveitamento</span>
						<span className="text-slate-800">{catechumen.currentFrequency}%</span>
					</div>
					<div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
						<div 
							className={`h-full ${getRateColor(catechumen.currentFrequency)} rounded-full transition-all duration-500`}
							style={{ width: `${catechumen.currentFrequency}%` }}
						/>
					</div>
				</div>

			</section>
	)
}

export default CatechumenCard;