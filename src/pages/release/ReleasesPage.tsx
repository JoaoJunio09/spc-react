import {
	ArrowRight,
	CheckCircle2,
	Heart,
	Layers,
	Rocket,
	ShieldCheck,
	Sparkles
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/brasao_paroquia.png';

interface Release {
	version: string;
	title: string;
	date: string;
	type: 'major' | 'initial' | 'minor';
	badge: string;
	summary: string;
	highlights: string[];
	improvements: string[];
	corrections: string[];
}

const RELEASES_DATA: Release[] = [
	{
		version: "v1.1.0",
		title: "Modernização do Sistema",
		date: "10 de Junho de 2026",
		type: "major",
		badge: "✨ Atualização Principal",
		summary: "Grande atualização focada em segurança, autenticação, permissões, experiência do usuário e modernização da interface.",
		highlights: [
			"Segurança com autenticação",
			"Perfis e permissões",
			"Histórico de frequência",
			"Histórico individual do catequizando",
			"Novo fluxo de login",
			"Página de erro 403 (Acesso Negado)",
			"Página de erro 404 (Destino não Encontrado)"
		],
		improvements: [
			"Interface totalmente modernizada com letras maiores e melhor contraste",
			"Navegação simplificada por abas no cabeçalho",
			"Cards interativos substituindo tabelas frias"
		],
		corrections: [
			"Ajustes de responsividade para celulares de menor porte",
			"Correções de layout e alinhamentos visuais estruturais"
		]
	},
	{
		version: "v1.0.0",
		title: "Lançamento do SPC",
		date: "29 de Março de 2026",
		type: "initial",
		badge: "🚀 Lançamento Oficial",
		summary: "Primeira versão estável oficial do Sistema de Presença da Catequese, modernizando o fluxo de papel para o meio digital.",
		highlights: [
			"Registro prático de presença nas missas",
			"Gestão estrutural de missas e turmas",
			"Visualização de etapas e catequistas responsáveis",
			"Consulta e gestão de catequizandos",
			"Calendário integrado de missas paroquiais"
		],
		improvements: [
			"Ajustes estruturais para suportar múltiplos catequistas registrando presença simultaneamente"
		],
		corrections: [
			"Correção de validação e mensagem de aviso para registros de presença duplicados"
		]
	}
];

function ReleasesPage() {
	const navigate = useNavigate();

	function redirectPageRelease(release: string) {
		if (release === 'v1.1.0') {
			navigate('/releases/1.1.0');
		}
		else if (release === 'v1.0.0') {
			navigate('/releases/1.0.0');
		}
	}

	return (
		<div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-100 text-left pb-20 animate-fadeIn">
			{/* DETALHES DE ESTILO ABSTRATO PARA FUNDO */}
			<div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.05] pointer-events-none" />

			{/* HEADER PRINCIPAL */}
			<header className="relative pt-20 pb-12 px-6 overflow-hidden">
				<div className="max-w-4xl mx-auto text-center">

					{/* Brasão em Destaque */}
					<div className="flex justify-center mb-6">
						<div className="w-24 h-24 rounded-3xl flex items-center justify-center p-4">
							<img src={logoImg} alt="" />
						</div>
					</div>

					<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase tracking-wider mb-5">
						📦 Histórico de Versões
					</div>

					<h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 mb-4">
						Atualizações do SPC
					</h1>

					<p className="text-lg sm:text-xl font-semibold text-slate-500 max-w-2xl mx-auto leading-relaxed">
						Acompanhe todas as versões, melhorias, correções e novidades adicionadas ao Sistema de Presença da Catequese.
					</p>

				</div>
			</header>

			{ }
			<section className="max-w-5xl mx-auto px-6 mb-16">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

					<div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-1 text-left hover:border-slate-300 transition-all">
						<span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Versões Publicadas</span>
						<span className="text-3xl font-black text-slate-950 mt-1">2</span>
						<p className="text-[11px] text-slate-400 font-semibold mt-1">Histórico ativo</p>
					</div>

					<div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-1 text-left hover:border-slate-300 transition-all">
						<span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Funcionalidades</span>
						<span className="text-3xl font-black text-emerald-600 mt-1">12+</span>
						<p className="text-[11px] text-slate-400 font-semibold mt-1">Disponíveis no sistema</p>
					</div>

					<div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-1 text-left hover:border-slate-300 transition-all">
						<span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Melhorias</span>
						<span className="text-3xl font-black text-indigo-600 mt-1">8+</span>
						<p className="text-[11px] text-slate-400 font-semibold mt-1">De usabilidade & performance</p>
					</div>

					<div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col gap-1 text-left hover:border-slate-300 transition-all">
						<span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Correções</span>
						<span className="text-3xl font-black text-amber-600 mt-1">5+</span>
						<p className="text-[11px] text-slate-400 font-semibold mt-1">Ajustes estruturais</p>
					</div>

				</div>
			</section>

			{ }
			<section className="max-w-5xl mx-auto px-6 mb-24">
				<div className="bg-slate-900 text-white rounded-[32px] p-8 md:p-12 shadow-xl relative overflow-hidden">
					<div className="absolute right-[-40px] bottom-[-40px] w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

					<div className="relative z-10 max-w-4xl mx-auto text-center lg:text-left">
						<span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-2">Evolução do SPC</span>
						<p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed font-semibold">
							Desde seu lançamento, o SPC vem evoluindo continuamente para oferecer mais segurança, praticidade e organização no acompanhamento da presença dos catequizandos.
						</p>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">

							<div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
								<div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
									<ShieldCheck className="w-5.5 h-5.5" />
								</div>
								<h4 className="text-base font-bold text-white mb-1.5">Segurança</h4>
								<p className="text-xs text-slate-400 leading-normal font-semibold">Autenticação robusta e controle inteligente de acessos por perfil.</p>
							</div>

							<div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
								<div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
									<Layers className="w-5.5 h-5.5" />
								</div>
								<h4 className="text-base font-bold text-white mb-1.5">Organização</h4>
								<p className="text-xs text-slate-400 leading-normal font-semibold">Gestão integrada e eficiente das turmas, missas e chamadas.</p>
							</div>

							<div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
								<div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
									<Sparkles className="w-5.5 h-5.5" />
								</div>
								<h4 className="text-base font-bold text-white mb-1.5">Experiência</h4>
								<p className="text-xs text-slate-400 leading-normal font-semibold">Interface 100% repensada e adaptável para telas de celulares.</p>
							</div>

						</div>
					</div>
				</div>
			</section>

			{ }
			<section className="max-w-4xl mx-auto px-6 mb-24 text-left">
				<div className="mb-12">
					<h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">Histórico Completo</h2>
					<p className="text-slate-500 text-sm font-semibold mt-1">Confira a evolução cronológica das nossas entregas de tecnologia.</p>
				</div>

				{/* Linha vertical da Timeline */}
				<div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 pl-8 sm:pl-10 space-y-16">

					{RELEASES_DATA.map((release) => {
						const isMajor = release.type === 'major';
						return (
							<div key={release.version} className="relative">

								{/* Indicador Flutuante na Linha da Timeline */}
								<div className={`absolute -left-[41px] sm:-left-[49px] top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center ${isMajor ? 'bg-amber-500 ring-4 ring-amber-100' : 'bg-indigo-500 ring-4 ring-indigo-100'
									}`}>
									{isMajor ? (
										<Sparkles className="w-2.5 h-2.5 text-white" />
									) : (
										<Rocket className="w-2.5 h-2.5 text-white" />
									)}
								</div>

								{/* Bloco de Data e Versão */}
								<div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
									<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${isMajor ? 'bg-amber-100 text-amber-800' : 'bg-slate-150 text-slate-700'
										}`}>
										{release.badge}
									</span>
									<span className="text-xs font-bold text-slate-400">
										Sincronizado em: {release.date}
									</span>
								</div>

								{/* Card do Lançamento */}
								<div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-all space-y-6">

									{/* Título & Resumo */}
									<div>
										<h3 className="text-xl sm:text-2.5xl font-black text-slate-900 tracking-tight leading-tight">
											SPC {release.version} • {release.title}
										</h3>
										<p className="text-slate-500 text-sm sm:text-base leading-relaxed mt-2.5 font-semibold">
											{release.summary}
										</p>
									</div>

									{/* Highlights Grid */}
									<div className="pt-4 border-t border-slate-100">
										<h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3.5">Funcionalidades de Destaque</h4>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
											{release.highlights.map((highlight, idx) => (
												<div key={idx} className="flex items-center gap-2">
													<CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
													<span className="font-bold text-slate-700">{highlight}</span>
												</div>
											))}
										</div>
									</div>

									{/* Melhorias */}
									<div className="pt-4 border-t border-slate-100">
										<h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">Melhorias de Experiência</h4>
										<ul className="space-y-2 text-xs sm:text-sm text-slate-500 font-semibold pl-1">
											{release.improvements.map((improvement, idx) => (
												<li key={idx} className="flex gap-2.5 items-start">
													<span className="text-indigo-500 font-extrabold text-lg leading-none select-none">•</span>
													<span>{improvement}</span>
												</li>
											))}
										</ul>
									</div>

									{/* Correções */}
									<div className="pt-4 border-t border-slate-100">
										<h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">Correções</h4>
										<ul className="space-y-2 text-xs sm:text-sm text-slate-500 font-semibold pl-1">
											{release.corrections.map((correction, idx) => (
												<li key={idx} className="flex gap-2.5 items-start">
													<span className="text-amber-500 font-extrabold text-lg leading-none select-none">•</span>
													<span>{correction}</span>
												</li>
											))}
										</ul>
									</div>

									{/* Botão de Ação */}
									<div className="pt-4 border-t border-slate-100 text-right">
										<button
											onClick={() => redirectPageRelease(release.version)}
											className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold rounded-xl transition-all text-xs cursor-pointer group"
										>
											Ver detalhes da versão
											<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
										</button>
									</div>

								</div>

							</div>
						);
					})}

				</div>
			</section>

			{ }
			<footer className="border-t border-slate-200 bg-white py-16 px-6 text-center -mx-4">
				<div className="max-w-4xl mx-auto">
					<div className="flex justify-center mb-6 text-amber-500">
						<Heart className="w-6 h-6 fill-current animate-pulse" />
					</div>
					<p className="text-slate-500 font-semibold mb-8 max-w-lg mx-auto leading-relaxed">
						O SPC continua evoluindo para apoiar a missão evangelizadora da Catequese através da tecnologia.
					</p>
					<div className="text-xs font-black uppercase tracking-widest text-slate-300">
						SPC • Sistema de Presença da Catequese
					</div>
				</div>
			</footer>

		</div>
	);
}

export default ReleasesPage;