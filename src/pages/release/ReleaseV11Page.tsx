import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Compass,
  History,
  Lock,
  LockKeyhole,
  Rocket,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Wrench,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../../components/layout/footer';

import logoImg from '../../assets/brasao_paroquia.png';

const ReleaseV11Page = () => {
  const features = [
    {
      title: "Segurança com Autenticação",
      icon: <Lock className="w-6 h-6 text-amber-500" />,
      description: "O sistema agora conta com autenticação robusta para usuários administrativos e de coordenação, garantindo que os dados paroquiais estejam sempre protegidos."
    },
    {
      title: "Perfis e Permissões",
      icon: <ShieldCheck className="w-6 h-6 text-amber-500" />,
      description: "Níveis de acesso dedicados para Catequistas, Coordenadores e Administradores. Cada perfil visualiza apenas o que é pertinente à sua função."
    },
    {
      title: "Histórico de Frequência",
      icon: <BarChart3 className="w-6 h-6 text-amber-500" />,
      description: "Nova área centralizada para consultar o histórico completo de presenças registradas nas missas, com filtros flexíveis por período litúrgico."
    },
    {
      title: "Histórico do Catequizando",
      icon: <UserCheck className="w-6 h-6 text-amber-500" />,
      description: "Visualização individual e detalhada do progresso de cada catequizando, incluindo taxas de presença, ausências e alertas de baixa frequência."
    },
    {
      title: "Novo Fluxo de Login",
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      description: "Uma experiência de login em duas etapas totalmente redesenhada, mais intuitiva e adaptada para todos os tipos de dispositivos."
    },
    {
      title: "Página de Acesso Negado (403)",
      icon: <LockKeyhole className="w-6 h-6 text-amber-500" />,
      description: "Tratamento de segurança elegante para impedir acessos não autorizados sem assustar o usuário, facilitando o retorno à navegação segura."
    },
    {
      title: "Página de Destino Não Encontrado (404)",
      icon: <Compass className="w-6 h-6 text-amber-500" />,
      description: "Nova página amigável e instrutiva com mapa de caminhos para auxiliar o usuário caso digite ou acesse uma URL inválida."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-100 text-left">
      <div className="max-w-6xl mx-auto px-6 pt-8">
				<button
					className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all font-bold text-sm cursor-pointer group"
				>
          <Link to='/releases' className='flex items-center text-black gap-2'>
            <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
					  Voltar para Central de Versões
          </Link>
				</button>
			</div>
      
      {}
      <header className="relative pt-24 pb-20 px-4 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-amber-50/60 to-orange-50/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* Brasão em Destaque */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center p-4">
              <img src={logoImg} alt="" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-black uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Grande Atualização
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-4">
            SPC <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">v1.1.0</span>
          </h1>

          <p className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-6 max-w-3xl mx-auto tracking-tight">
            Modernização da Plataforma de Registro de Presenças
          </p>

          <div className="flex items-center justify-center gap-4 text-slate-400 font-semibold text-sm">
            <span className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/60 px-3 py-1.5 rounded-xl">
              <Calendar className="w-4 h-4 text-amber-600" />
              Lançamento Oficial: 10 de Junho de 2026
            </span>
          </div>
        </div>
      </header>

      {}
      <section className="max-w-3xl mx-auto px-6 mb-24">
        <p className="text-lg sm:text-xl text-slate-600 text-center leading-relaxed font-medium">
          A versão <strong>1.1.0</strong> representa uma das maiores evoluções do SPC desde o seu nascimento. 
          Esta atualização introduziu autenticação segura, controle de permissões por perfil, novas páginas de histórico e uma completa modernização visual da experiência de uso.
        </p>
      </section>

      {}
      <section className="max-w-5xl mx-auto px-6 mb-28">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-[40px] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute right-[-50px] bottom-[-50px] w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <h3 className="text-3.5xl font-black tracking-tight mb-4 flex items-center gap-3">
              <ShieldCheck className="text-amber-400 w-8 h-8" />
              O que mudou nesta versão?
            </h3>
            <p className="text-slate-350 text-base sm:text-lg mb-8 leading-relaxed font-medium">
              Deixamos de ser apenas uma ferramenta de registro para nos tornarmos uma plataforma de gestão pastoral de alta fidelidade. O foco total esteve em garantir segurança institucional, modernizar a usabilidade móvel dos catequistas e oferecer controle analítico para a coordenação.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {[
                "Segurança reforçada contra vazamento de dados",
                "Controle de acesso exclusivo por tipo de perfil",
                "Novo fluxo de login rápido e simplificado",
                "Histórico de frequência individualizado",
                "Interface 100% repensada para telas móveis"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-slate-200 font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <span className="text-xs font-black text-amber-600 uppercase tracking-widest block mb-2">Entregas de Tecnologia</span>
          <h2 className="text-3.5xl sm:text-4xl font-black tracking-tight mb-4">Funcionalidades Adicionadas</h2>
          <div className="h-1.5 w-16 bg-amber-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group p-8 rounded-3xl border border-slate-100 bg-white hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-100/60 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-amber-700 transition-colors">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-semibold">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Melhorias de Experiência */}
          <div className="p-8 md:p-10 rounded-[40px] bg-slate-900 text-white relative overflow-hidden flex flex-col justify-between min-h-[420px]">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-amber-400 w-7 h-7" />
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Melhorias de Experiência</h3>
              </div>
              <ul className="space-y-4 text-slate-300 font-semibold">
                {[
                  "Interface totalmente modernizada com letras maiores e melhor contraste",
                  "Organização visual limpa e focada no essencial para evitar cansaço",
                  "Navegação simplificada por abas na parte superior da tela",
                  "Cards modernos para catequizandos substituindo tabelas frias",
                  "Aproveitamento inteligente de espaço em telas pequenas de celulares"
                ].map((text, idx) => (
                  <li key={idx} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base leading-snug">{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative z-10 mt-8 bg-white/5 border border-white/10 rounded-2xl p-4 text-slate-300 text-xs">
              <span className="font-extrabold text-amber-400 uppercase tracking-wider block mb-1">Destaque: Cards para Catequizandos</span>
              Os antigos registros em lista foram atualizados para cards interativos, facilitando a identificação imediata das taxas de frequência.
            </div>
          </div>

          {/* Correções e Estabilidade */}
          <div className="p-8 md:p-10 rounded-[40px] border border-slate-200 bg-slate-50 flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Wrench className="text-indigo-600 w-7 h-7" />
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Correções e Estabilidade</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    title: "Ajustes de Responsividade",
                    desc: "Eliminamos barras de rolagem horizontais indesejadas em celulares de menor porte."
                  },
                  {
                    title: "Consistência de Identidade Visual",
                    desc: "Ajustamos os espaçamentos, cabeçalhos e menus para garantir que todas as telas sigam o mesmo padrão estético."
                  },
                  {
                    title: "Otimização de Transições",
                    desc: "Correções no carregamento de telas para evitar oscilações abruptas no layout (Cumulative Layout Shift)."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 flex gap-3.5 items-start">
                    <AlertCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                    <div className="text-left">
                      <h4 className="text-sm font-bold text-slate-950 mb-0.5">{item.title}</h4>
                      <p className="text-slate-500 text-xs font-semibold leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="bg-slate-50 py-24 px-6 mb-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-black text-indigo-600 uppercase tracking-widest block mb-2">Evolução do Sistema</span>
            <h2 className="text-3.5xl sm:text-4xl font-black tracking-tight mb-4">Comparativo Visual: Antes x Depois</h2>
            <div className="h-1.5 w-16 bg-indigo-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Versão v1.0.0 */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-150 text-slate-600 text-xs font-bold uppercase mb-4">
                  SPC v1.0.0
                </span>
                <h4 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-150">Apenas o Essencial</h4>
                
                <ul className="space-y-4 text-slate-500 text-sm font-bold text-left">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-slate-300 flex-shrink-0" />
                    Registro básico de presença nas missas
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-slate-300 flex-shrink-0" />
                    Gestão estrutural de missas e turmas
                  </li>
                  <li className="flex items-center gap-3 text-slate-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-slate-200 flex-shrink-0" />
                    Sem controle de autenticação ou login
                  </li>
                  <li className="flex items-center gap-3 text-slate-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-slate-200 flex-shrink-0" />
                    Histórico visual limitado de presenças
                  </li>
                </ul>
              </div>
            </div>

            {/* Versão v1.1.0 */}
            <div className="bg-white p-8 rounded-3xl border-2 border-amber-500 shadow-xl shadow-amber-500/5 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-black px-4 py-1 uppercase tracking-wider rounded-bl-xl">
                Atual
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase mb-4">
                  SPC v1.1.0
                </span>
                <h4 className="text-xl font-bold text-slate-900 mb-6 pb-4 border-b border-slate-150">Robustez e Praticidade</h4>
                
                <ul className="space-y-4 text-slate-800 text-sm font-bold text-left">
                  <li className="flex items-center gap-3 text-amber-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    Controle de login em duas etapas
                  </li>
                  <li className="flex items-center gap-3 text-amber-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    Acesso inteligente por perfil e permissão
                  </li>
                  <li className="flex items-center gap-3 text-amber-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    Histórico individual de frequência
                  </li>
                  <li className="flex items-center gap-3 text-amber-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    Páginas de erro tratadas com acolhimento (403/404)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="max-w-6xl mx-auto px-6 mb-28 text-center">
        <div className="mb-14">
          <span className="text-xs font-black text-amber-600 uppercase tracking-widest block mb-2">Resultados Práticos</span>
          <h2 className="text-3.5xl sm:text-4xl font-black tracking-tight mb-4">Impacto da Atualização</h2>
          <div className="h-1.5 w-16 bg-amber-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto border border-amber-100">
              <ShieldCheck className="w-8 h-8 text-amber-600" />
            </div>
            <h4 className="text-xl font-bold">Segurança</h4>
            <p className="text-slate-500 text-sm font-semibold leading-relaxed">Controle rígido de acesso, blindando informações paroquiais através de perfis restritos de usuários.</p>
          </div>
          
          <div className="space-y-4 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto border border-amber-100">
              <Users className="w-8 h-8 text-amber-600" />
            </div>
            <h4 className="text-xl font-bold">Organização</h4>
            <p className="text-slate-500 text-sm font-semibold leading-relaxed">Informações e relatórios de presença mais estruturados, limpos e fáceis de filtrar a qualquer momento.</p>
          </div>

          <div className="space-y-4 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto border border-amber-100">
              <Zap className="w-8 h-8 text-amber-600" />
            </div>
            <h4 className="text-xl font-bold">Experiência</h4>
            <p className="text-slate-500 text-sm font-semibold leading-relaxed">Interface simplificada de fácil leitura e interação, reduzindo drasticamente o tempo necessário para o catequista.</p>
          </div>
        </div>
      </section>

      {}
      <section className="max-w-4xl mx-auto px-6 py-12 mb-20">
        <div className="flex items-center gap-4 mb-12">
          <History className="text-amber-500 w-8 h-8" />
          <h2 className="text-3xl font-black">História da Plataforma</h2>
        </div>

        <div className="relative border-l-2 border-slate-100 ml-4 pl-8 space-y-12 text-left">
          <div className="relative">
            <div className="absolute left-[-41px] top-1 w-5 h-5 rounded-full bg-slate-300 ring-4 ring-slate-100" />
            <div className="flex items-center gap-2 text-slate-500 font-bold mb-1 text-sm">
              <Calendar className="w-4 h-4" />
              29 de Março de 2026
            </div>
            <h4 className="text-xl font-bold text-slate-900">SPC v1.0.0 — Lançamento Oficial</h4>
            <p className="text-slate-500 mt-2 leading-relaxed text-sm font-semibold">
              O início de tudo. A primeira versão pública estável é disponibilizada, focada em substituir as folhas de papel pelo registro digital.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-[-41px] top-1 w-5 h-5 rounded-full bg-amber-500 ring-4 ring-amber-100" />
            <div className="flex items-center gap-2 text-amber-600 font-extrabold mb-1 text-sm">
              <Calendar className="w-4 h-4" />
              Versão Recente (10/06/2026)
            </div>
            <h4 className="text-xl font-bold text-slate-900">SPC v1.1.0 — Modernização e Segurança</h4>
            <p className="text-slate-500 mt-2 leading-relaxed text-sm font-semibold text-left">
              Grande atualização estrutural. A plataforma amadurece para oferecer um ambiente protegido por senha, fluxos amigáveis para catequistas e controle analítico de presenças individuais para coordenadores.
            </p>
          </div>
        </div>
      </section>

      {}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="p-1 md:p-2 bg-gradient-to-r from-amber-100 via-amber-400 to-amber-600 rounded-[42px]">
          <div className="bg-white rounded-[40px] p-8 md:p-12 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-slate-100 pb-6">
              <div className="text-left">
                <h3 className="text-3xl font-black mb-2">Explorar versões</h3>
                <p className="text-slate-500 font-semibold tracking-tight">Verifique as melhorias disponibilizadas ao longo do tempo.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 rounded-2xl border border-slate-200 font-extrabold hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm cursor-pointer">
                  <Link to='/releases' className='text-black'>
                    Ver todas as versões
                  </Link>
                </button>
                <button className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-extrabold hover:bg-slate-800 transition-colors group text-sm cursor-pointer">
                  <Link to='/releases/1.0.0' className='flex items-center gap-2'>
                    Voltar para v1.0.0
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </button>
              </div>
            </div>

            {/* Grid de Cards das Versões Lançadas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="p-6 rounded-2xl border border-slate-150 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-black uppercase mb-4">
                    <Rocket className="w-3 h-3" />
                    v1.0.0
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Lançamento Oficial</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                    Lançamento oficial do SPC. Informatização inicial e facilidade pastoral com os primeiros módulos de turmas, missas e chamadas.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-amber-200 bg-amber-50/20 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-150 text-amber-800 text-xs font-black uppercase mb-4">
                    <Sparkles className="w-3 h-3" />
                    v1.1.0
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Modernização e Autenticação</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-semibold">
                    Grande atualização focada em segurança, perfis de controle de acesso, novos indicadores analíticos e refinamento completo da experiência.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <Footer />

    </div>
  );
};

export default ReleaseV11Page;