import { Calendar, CalendarDays, CheckCircle, Church, Clock, User, XCircle } from "lucide-react";
import type { History } from "../hooks/useInvidualPresence";
import { UtilsDate } from "../../../utils/UtilsDate";

type TimeLineProps = {
	filteredHistory: History[],
	activeFilter: string
}

function TimeLine({
	filteredHistory,
	activeFilter
}: TimeLineProps) {
	return (
		<section className="relative text-left">
				{filteredHistory.length > 0 ? (
					<div className="relative pl-6 sm:pl-8">
						
						{/* Linha vertical dinâmica da timeline */}
						<div className={`absolute left-[10px] sm:left-[13px] top-4 bottom-4 w-[2px] transition-colors duration-300 ${
							activeFilter === 'presentes' ? 'bg-emerald-200' :
							activeFilter === 'ausentes' ? 'bg-rose-200' : 'bg-slate-200'
						}`} />

						{filteredHistory.map((history) => {
							const isPresent = history.status === 'present';
							
							// Variáveis estéticas dinâmicas baseadas nos filtros e no status
							const indicatorColor = isPresent ? 'bg-emerald-500 ring-emerald-100' : 'bg-rose-500 ring-rose-100';
							const badgeStyle = isPresent 
								? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
								: 'bg-rose-50 text-rose-700 border-rose-100';

							return (
								<article key={history.mass?.id} className="relative mb-6 last:mb-0 group">
									
									{/* Indicador Visual do Status na Timeline */}
									<div className={`absolute -left-[21px] sm:-left-[25px] top-2 w-3.5 h-3.5 rounded-full border-2 border-white ring-4 transition-all duration-300 ${
										activeFilter === 'presents' ? 'bg-emerald-500 ring-emerald-100' :
										activeFilter === 'absents' ? 'bg-rose-500 ring-rose-100' : indicatorColor
									}`} />

									{/* Card do Encontro / Missa */}
									<div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 transition-all hover:border-slate-300 hover:shadow-md">
										
										{/* Cabeçalho da Missa: Liturgia, Local e Status */}
										<div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3.5 border-b border-slate-100">
											<div>
												<h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-snug">
													{history.mass?.title}
												</h4>
												{history.status === 'present' && (
													<div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mt-1">
														<Church className="w-3.5 h-3.5 text-amber-500" />
														<span>
															{history.mass?.location === 'MATRIZ'
																? 'Matriz São Sebastião'
																: 'Capela do Divino Espiríto Santo'
															}
														</span>
													</div>
												)}
											</div>
											
											{/* Badge de Status de Presença */}
											<div className="flex items-start">
												<span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase border ${
													activeFilter === 'presents' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
													activeFilter === 'absents' ? 'bg-rose-50 text-rose-700 border-rose-100' : badgeStyle
												}`}>
													{activeFilter === 'presents' || (activeFilter === 'all' && isPresent) ? (
														<>
															<CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
															Presente
														</>
													) : (
														<>
															<XCircle className="w-3.5 h-3.5 text-rose-600" />
															Ausente
														</>
													)}
												</span>
											</div>
										</div>

										{/* Detalhes de Registro (Data, Hora e Registrador) */}
										<div className="pt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-semibold text-slate-500">
											{history.status === 'present' && (
												<div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
													<div className="flex items-center gap-1.5">
														<Calendar className="w-4 h-4 text-slate-400" />
														<span>{UtilsDate.formatDateTimeForDate(history.mass.dateTime)}</span>
													</div>
													<div className="flex items-center gap-1.5">
														<Clock className="w-4 h-4 text-slate-400" />
														<span>{UtilsDate.formatDateTimeThisMissaForTime(history.mass.dateTime)}</span>
													</div>
												</div>
											)}

											{/* Oculta registrador em caso de ausência por padrão */}
											{isPresent && history.presence && activeFilter !== 'ausentes' && (
												<div className="flex items-center gap-1.5 text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
													<User className="w-3.5 h-3.5 text-slate-400" />
													<span>Registrado por: <strong className="text-slate-700 font-bold">{history.presence.user.fullName}</strong></span>
												</div>
											)}
										</div>

									</div>
								</article>
							);
						})}
					</div>
				) : (
					<div className="bg-white rounded-2xl p-12 border border-slate-200 shadow-sm text-center max-w-md mx-auto my-6 animate-fade-in">
						<div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5 text-slate-400">
							<CalendarDays className="w-8 h-8 text-slate-400" />
						</div>
						<h3 className="text-lg font-black text-slate-900 tracking-tight mb-2">
							Nenhum registro encontrado
						</h3>
						<p className="text-sm text-slate-500 font-medium leading-relaxed">
							Não encontramos missas registradas para o filtro selecionado no histórico deste catequizando.
						</p>
					</div>
				)}
			</section>
	)
}

export default TimeLine;