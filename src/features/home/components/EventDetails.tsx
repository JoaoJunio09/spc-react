import { ArrowRight, CalendarDays, ChevronRight, Church, ClipboardCheck, Clock3, Info, MapPin, X } from "lucide-react";
import { Link } from "react-router-dom";
import TopProgressBar from "../../../components/feedback/TopProgressBar";
import { UtilsDate } from "../../../utils/UtilsDate";
import type { Event } from "../hooks/useLoadEvent";
import Skeleton from "react-loading-skeleton";
import type { PresenceUserSummary } from "../../../data/presence/PresenceUserSummaryByMass";
import type { CommunityOrParish } from "../../../enums/CommunityOrParish";
import { useState } from "react";

type NoMassesEmptyStateProps = {
	message: string | undefined
}

const NoMassesEmptyState = ({
	message
}: NoMassesEmptyStateProps) => {
	return (
		<div className='w-full rounded-2.5xl border p-8 sm:p-12 md:p-16 shadow-sm transition-all duration-300 text-center flex flex-col items-center justify-center group border-amber-100 bg-amber-50/10 hover:border-amber-200/60'>

			{/* Icon Frame with moderate visual focus */}
			<div className='w-16 h-16 rounded-2xl border flex items-center justify-center mb-6 shadow-sm transition-colors bg-amber-50/50 border-amber-100/50 text-amber-800'>
				<CalendarDays className='w-8 h-8 transition-transform duration-300 group-hover:scale-105 text-amber-500' />
			</div>

			{/* Primary Message */}
			<h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2.5">
				{message}
			</h3>

			<p className="text-sm sm:text-base text-slate-500 font-medium leading-relaxed max-w-md mb-6">
				Não há missas cadastradas ou agendadas para exibição.
			</p>

			{/* Divider Dot */}
			<span className="w-1.5 h-1.5 rounded-full bg-slate-300 mb-6 block" />

			{/* Secondary Message in a sutil, non-interactive informational badge */}
			<div className='inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold max-w-prose leading-normal bg-amber-50 border-amber-100'>
				<Info className="w-4 h-4 flex-shrink-0 opacity-80" />
				<span>As próximas missas aparecerão aqui automaticamente quando forem cadastradas.</span>
			</div>
		</div>
	);
};

type PresenceSummaryModalProps = {
	sumarry: PresenceUserSummary[],
	onClose: () => void
}

const PresenceSummaryModal = ({
	sumarry,
	onClose
}: PresenceSummaryModalProps) => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">

			{/* Backdrop do Modal com desfoque */}
			<div
				onClick={onClose}
				className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300"
			/>

			{/* Card Interno */}
			<section className="relative bg-white w-full max-w-lg rounded-2.5xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col text-left">

				{/* Top Bar decorativa */}
				<div className="h-2 w-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500" />

				{/* Cabeçalho do Modal */}
				<div className="p-6 sm:p-7 border-b border-slate-100 flex items-start justify-between bg-slate-50">
					<div className="text-left space-y-1">
						<span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded uppercase tracking-wider">
							Paróquia São Sebastiao
						</span>
						<h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
							Registros por Catequista
						</h3>
						<p className="text-sm text-slate-500 font-medium">
							10º Domingo do Tempo Comum
						</p>
					</div>
					<button
						onClick={onClose}
						className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
						aria-label="Fechar detalhes"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Conteúdo: Listagem dos Catequistas */}
				<div className="p-6 sm:p-7 space-y-4 max-h-[350px] overflow-y-auto">
					<span className="block text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
						Catequistas que já sincronizaram presença nesta missa:
					</span>

					<div className="space-y-3">
						{sumarry.map(sum => (
							<div
								className="p-4 bg-slate-50 border border-slate-150 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-none"
							>
								<div className="flex items-center gap-3">
									<div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
										{sum.fullName[0]}
									</div>
									<div className="leading-tight text-left">
										<h4 className="text-base font-extrabold text-slate-900">{sum.fullName}</h4>
										<span className="text-xs text-slate-400 font-semibold block mt-0.5">Registrado em: 07/07/2026 às 20:03</span>
									</div>
								</div>

								<div className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-center self-start sm:self-center">
									<span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Presenças</span>
									<span className="text-sm font-extrabold text-emerald-600 block mt-0.5">
										{sum.totalCatechumens}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Botão de Ação Primária */}
				<div className="p-6 sm:p-7 border-t border-slate-100 bg-slate-50 flex flex-col gap-3">
					<button
						onClick={() => {
							// setSelectedMass(null);
							// setSelectedMassStudents(selectedMass);
						}}
						className="w-full h-13 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-extrabold text-base rounded-2xl shadow-md hover:shadow-lg shadow-orange-600/15 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
					>
						Conferir Catequizandos Presentes
						<ArrowRight className="w-5 h-5" />
					</button>

					<button
						onClick={onClose}
						className="w-full h-11 bg-white border-2 border-slate-200 text-slate-600 hover:text-slate-800 hover:border-slate-300 font-bold text-sm sm:text-base rounded-xl transition-all flex items-center justify-center cursor-pointer"
					>
						Voltar
					</button>
				</div>

			</section>
		</div>
	)
}

type EventDetailsProps = {
	events: Event[] | [],
	loading: boolean
}

function EventDetails({ events, loading }: EventDetailsProps) {
	const [openSummaryModal, setOpenSummaryModal] = useState(false);
	const [summary, setSummary] = useState<PresenceUserSummary[]>([]);

	function handleOpenSummaryModal(summary: PresenceUserSummary[] | undefined) {
		if (!summary) return;
		setOpenSummaryModal(true);
		setSummary(summary);
	}

	function handleCloseSummaryModal() {
		setOpenSummaryModal(false);
		setSummary([]);
	}

	return (
		<section className="flex flex-col gap-6 w-full">
			{loading && (
				<TopProgressBar />
			)}

			{openSummaryModal && (
				<PresenceSummaryModal
					sumarry={summary}
					onClose={handleCloseSummaryModal}
				/>
			)}

			{events.length > 0 ? (
				events.map((event) => (
					event.isEvent
						? <article
							key={event.massId}
							className="bg-white rounded-2.5xl border border-slate-200/80 p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col gap-6 text-left"
						>
							{/* Parte Superior: Tag e Nome da Celebração */}
							<div>
								<div className="flex items-start justify-between gap-3 mb-3">
									<span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-lg text-xs font-bold uppercase tracking-wider text-amber-800">
										<Church className="w-3.5 h-3.5 text-amber-600" />
										Missa
									</span>
									<span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">Atividade Recente</span>
								</div>

								<h4 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
									{event.title}
								</h4>
							</div>

							{/* Grid Central de Informações de Tempo e Localização (Igual Peso Visual) */}
							<div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-5 border-t border-b border-slate-100 bg-slate-50/50 -mx-6 sm:-mx-8 px-6 sm:px-8">

								{/* Data */}
								<div className="flex items-center gap-3.5">
									<div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 text-amber-600">
										<CalendarDays className="w-5.5 h-5.5" />
									</div>
									<div className="leading-tight">
										<span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Data</span>
										<span className="text-base sm:text-lg font-black text-slate-800">{event.massDate}</span>
									</div>
								</div>

								{/* Horário */}
								<div className="flex items-center gap-3.5">
									<div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 text-amber-600">
										<Clock3 className="w-5.5 h-5.5" />
									</div>
									<div className="leading-tight">
										<span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Horário</span>
										<span className="text-base sm:text-lg font-black text-slate-800">{UtilsDate.formatDateTimeThisMissaForTime(event.massDateTime ?? '')}</span>
									</div>
								</div>

								{/* Localização / Comunidade */}
								<div className="flex items-center gap-3.5">
									<div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0 text-indigo-600">
										<MapPin className="w-5.5 h-5.5" />
									</div>
									<div className="leading-tight">
										<span className="block text-[10px] font-bold text-indigo-500 uppercase tracking-wider">Comunidade/Paróquia</span>
										<span className="text-base sm:text-lg font-black text-slate-800">{event.massLocation}</span>
									</div>
								</div>

							</div>

							{/* Sincronização e Status dos Catequistas */}
							<div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center justify-between gap-4 flex-wrap">
								<div className="flex items-center gap-2.5">
									<div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
									<p className="text-sm sm:text-base font-bold text-slate-700">
										{event.summary?.length === 1
											? "1 catequista registrou presença"
											: `${event.summary?.length} catequistas registraram presença`}

									</p>
								</div>
								<span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md uppercase border border-emerald-100">Ativo</span>
							</div>

							{/* Ações Estruturadas (Desktop Horizontal, Mobile Empilhado) */}
							<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">

								{/* 1. Registrar Presença */}
								<button
									className="border-none flex-1 h-13 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-extrabold text-sm sm:text-base transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-md shadow-orange-500/10 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-amber-500/20"
								>
									<ClipboardCheck className="w-5.5 h-12" />
									<Link to={`/presencas/registrar/${event.massId}`}>
										Registrar Presença
									</Link>
								</button>

								{/* 2. Conferir Catequizandos Presentes */}
								<button
									onClick={() => handleOpenSummaryModal(event.summary)}
									className="flex-1 h-13 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-300 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-4 focus:ring-slate-100"
								>
									Detalhes do Registro
									<ChevronRight className="w-4.5 h-12" />
								</button>
							</div>
						</article>
						:
						<NoMassesEmptyState message={event.title} />
				))
			) : (
				<div className="col-span-1 md:col-span-2 bg-white rounded-2.5xl p-12 border border-slate-200 shadow-sm text-center max-w-md mx-auto my-6">
					<div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5 text-slate-400">
						<Church className="w-8 h-8 text-slate-400" />
					</div>
					<h3 className="text-lg font-black text-slate-900 tracking-tight mb-2">
						Nenhuma celebração encontrada
					</h3>
					<p className="text-sm text-slate-500 font-medium leading-relaxed">
						Não encontramos celebrações que correspondam à sua pesquisa de nome ou comunidade.
					</p>
				</div>
			)}


		</section>
	)
}

export default EventDetails;