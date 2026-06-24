import logoImg from '../../../assets/brasao_paroquia.png';

function InstitutionalSection() {
	return (
		<aside className="relative w-full lg:w-[55%] bg-gradient-to-br from-[#1E293B] to-[#0F172A] flex items-center justify-center p-8 lg:p-[60px] overflow-hidden lg:border-r border-white/5">
			{/* Textura decorativa de grade litúrgica sutil */}
			<div className="absolute inset-0 bg-[radial-gradient(rgba(245,158,11,0.15)_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />
			
			<div className="max-w-[520px] w-full flex flex-col gap-9 relative z-10">
				{/* Logo SPC */}
				<div className="flex items-center gap-[14px]">
					<div className="w-12 h-12 bg-gradient-to-br from-[#F59E0B] text-white rounded-xl flex items-center justify-center shadow-lg shadow-[#EA580C]/25">
						<img src={logoImg} alt="" />
					</div>
					<span className="text-[1.8rem] font-extrabold text-white tracking-tight">SPC</span>
				</div>

				{/* Título e Texto Institucional */}
				<div className="text-left">
					<h2 className="text-3xl lg:text-[2.2rem] font-extrabold text-white leading-tight mb-3 tracking-tight">
						Sistema de Presença da Catequese
					</h2>
					<p className="text-base lg:text-[1.1rem] text-[#94A3B8] leading-relaxed font-normal">
						Gerencie presenças, acompanhe catequizandos e organize atividades da catequese de forma simples, moderna e integrada.
					</p>
				</div>

				{/* Ilustração Litúrgica SVG Integrada */}
				<div className="w-full max-w-[360px] mx-auto opacity-95">
					<svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
						<defs>
							<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
								<stop offset="0%" stopColor="#F59E0B" stopOpacity="0.15" />
								<stop offset="100%" stopColor="#EA580C" stopOpacity="0.05" />
							</linearGradient>
							<linearGradient id="gradCross" x1="0%" y1="0%" x2="0%" y2="100%">
								<stop offset="0%" stopColor="#F59E0B" />
								<stop offset="100%" stopColor="#EA580C" />
							</linearGradient>
						</defs>
						<circle cx="200" cy="180" r="100" fill="url(#grad1)" />
						<path d="M100,280 C130,220 270,220 300,280 Z" fill="rgba(245, 158, 11, 0.08)" />
						<path d="M50,280 C100,180 300,180 350,280 Z" fill="rgba(234, 88, 12, 0.04)" />
						
						<path d="M200,40 L130,130 L130,280 L270,280 L270,130 Z" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />
						<path d="M200,30 L200,280" stroke="url(#gradCross)" strokeWidth="3" />
						<path d="M170,80 L230,80" stroke="url(#gradCross)" strokeWidth="3" />
						
						<circle cx="160" cy="260" r="10" fill="#64748B" opacity="0.4" />
						<path d="M145,280 C145,270 175,270 175,280 Z" fill="#64748B" opacity="0.3" />
						
						<circle cx="240" cy="255" r="12" fill="#F59E0B" opacity="0.6" />
						<path d="M220,280 C220,265 260,265 260,280 Z" fill="#F59E0B" opacity="0.5" />

						<circle cx="200" cy="250" r="14" fill="#EA580C" opacity="0.8" />
						<path d="M175,280 C175,260 225,260 225,280 Z" fill="#EA580C" opacity="0.7" />
					</svg>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
					<div className="bg-slate-800/40 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 backdrop-blur-md transition-all duration-200 hover:translate-y-[-2px] hover:bg-slate-800/70 hover:border-[#F59E0B]/20 text-left">
						<div className="text-xl">📋</div>
						<div className="flex flex-col">
							<h4 className="text-[0.85rem] font-bold text-white mb-0.5">Registro rápido</h4>
							<p className="text-[0.72rem] text-[#94A3B8] leading-tight">Marque presenças de forma descomplicada</p>
						</div>
					</div>
					<div className="bg-slate-800/40 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 backdrop-blur-md transition-all duration-200 hover:translate-y-[-2px] hover:bg-slate-800/70 hover:border-[#F59E0B]/20 text-left">
						<div className="text-xl">👥</div>
						<div className="flex flex-col">
							<h4 className="text-[0.85rem] font-bold text-white mb-0.5">Gestão de turmas</h4>
							<p className="text-[0.72rem] text-[#94A3B8] leading-tight">Acompanhe todos os catequizandos</p>
						</div>
					</div>
					<div className="bg-slate-800/40 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 backdrop-blur-md transition-all duration-200 hover:translate-y-[-2px] hover:bg-slate-800/70 hover:border-[#F59E0B]/20 text-left">
						<div className="text-xl">📊</div>
						<div className="flex flex-col">
							<h4 className="text-[0.85rem] font-bold text-white mb-0.5">Frequência geral</h4>
							<p className="text-[0.72rem] text-[#94A3B8] leading-tight">Monitore o desempenho anual</p>
						</div>
					</div>
				</div>
			</div>
		</aside>
	)
}

export default InstitutionalSection;