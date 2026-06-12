import {
  AlertCircle,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Church,
  ClipboardCheck,
  History,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
  Zap
} from 'lucide-react';
import Footer from '../../components/layout/footer';

import { Link } from 'react-router-dom';
import logoImg from '../../assets/brasao_paroquia.png';

const ReleaseV1Page = () => {
  const features = [
    {
      title: "Registro de Presença",
      icon: <ClipboardCheck className="w-6 h-6 text-amber-500" />,
      description: "Permite registrar a presença dos catequizandos nas missas da paróquia de forma rápida e organizada."
    },
    {
      title: "Gestão de Missas",
      icon: <Church className="w-6 h-6 text-amber-500" />,
      description: "Controle total sobre o calendário litúrgico: cadastro, atualização e remoção de missas."
    },
    {
      title: "Etapas e Catequistas",
      icon: <Users className="w-6 h-6 text-amber-500" />,
      description: "Visualização completa das etapas da catequese e dos catequistas responsáveis por cada grupo."
    },
    {
      title: "Catequizandos",
      icon: <Users className="w-6 h-6 text-amber-500" />,
      description: "Consulta rápida e eficiente de todos os catequizandos cadastrados no ecossistema digital."
    },
    {
      title: "Calendário de Missas",
      icon: <Calendar className="w-6 h-6 text-amber-500" />,
      description: "Uma visão centralizada e intuitiva de todas as missas para facilitar o planejamento."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-amber-100">
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

      {/* --- HERO SECTION --- */}
      <header className="relative pt-20 pb-16 px-4 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-amber-50/50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* Brasão Placeholder */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center p-4">
              <img src={logoImg} alt="" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in">
            <Rocket className="w-3.5 h-3.5" />
            Lançamento Oficial
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-4">
            SPC <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-500">v1.0.0</span>
          </h1>

          <p className="text-xl md:text-2xl font-medium text-slate-500 mb-8 max-w-2xl mx-auto leading-relaxed">
            A primeira versão oficial do Sistema de Presença da Catequese marca o início de uma nova era na gestão pastoral.
          </p>

          <div className="flex items-center justify-center gap-4 text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              29 de Março de 2026
            </span>
          </div>
        </div>
      </header>

      {/* --- INTRO TEXT --- */}
      <section className="max-w-3xl mx-auto px-6 mb-20">
        <p className="text-lg text-slate-600 text-center leading-relaxed">
          O SPC nasceu para modernizar e simplificar. Com uma experiência digital
          <strong> simples, organizada e acessível</strong>, oferecemos as ferramentas
          necessárias para que catequistas e coordenadores foquem no que realmente importa:
          a missão evangelizadora.
        </p>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black mb-4">O que foi entregue?</h2>
          <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="group p-8 rounded-3xl border border-slate-100 bg-white hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-100 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">{f.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- IMPROVEMENTS & FIXES --- */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Improvements */}
          <div className="p-8 md:p-10 rounded-[40px] bg-slate-900 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="text-amber-400 w-6 h-6" />
                <h3 className="text-2xl font-bold">Melhorias implementadas</h3>
              </div>
              <ul className="space-y-4 text-slate-300">
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  Ajustes estruturais no fluxo de registro de presença.
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  Suporte otimizado para múltiplos acessos simultâneos.
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  Alta estabilidade e performance em dispositivos móveis.
                </li>
              </ul>
            </div>
            <Zap className="absolute right-[-20px] bottom-[-20px] w-64 h-64 text-white opacity-[0.03]" />
          </div>

          {/* Corrections */}
          <div className="p-8 md:p-10 rounded-[40px] border border-slate-100 bg-slate-50">
            <div className="flex items-center gap-3 mb-6">
              <Wrench className="text-indigo-500 w-6 h-6" />
              <h3 className="text-2xl font-bold">Correções realizadas</h3>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                <p className="text-slate-600 font-medium">
                  Ajuste na validação de presenças duplicadas:
                  <span className="block text-sm font-normal text-slate-400 mt-1">
                    Corrigimos a mensagem de aviso quando um catequizando já havia sido registrado na mesma missa.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- IMPACT SECTION --- */}
      <section className="bg-slate-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">O que mudou com o SPC?</h2>
            <p className="text-slate-500">Transformando dados em proximidade e cuidado pastoral.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <ShieldCheck className="w-8 h-8 text-emerald-500" />
              </div>
              <h4 className="text-xl font-bold">Organização</h4>
              <p className="text-slate-500 text-sm">Informações centralizadas e acessíveis a any moment.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Zap className="w-8 h-8 text-amber-500" />
              </div>
              <h4 className="text-xl font-bold">Agilidade</h4>
              <p className="text-slate-500 text-sm">Processos manuais substituídos por cliques rápidos e inteligentes.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <BarChart3 className="w-8 h-8 text-indigo-500" />
              </div>
              <h4 className="text-xl font-bold">Confiabilidade</h4>
              <p className="text-slate-500 text-sm">Dados precisos para uma melhor gestão das etapas e presenças.</p>
            </div>
          </div>
        </div>
      </section>

      { }
      {/* --- TIMELINE --- */}
      <section className="max-w-4xl mx-auto px-6 py-12 mb-20">
        <div className="flex items-center gap-4 mb-12">
          <History className="text-amber-500 w-8 h-8" />
          <h2 className="text-3xl font-black">História da Plaaforma</h2>
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

      { }
      {/* --- EXPLORE VERSIONS --- */}
      <section className="max-w-5xl mx-auto px-6 mb-24">
        <div className="p-1 md:p-2 bg-gradient-to-r from-amber-100 via-amber-400 to-amber-600 rounded-[42px]">
          <div className="bg-white rounded-[40px] p-8 md:p-12 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-slate-100 pb-6">
              <div>
                <h3 className="text-3xl font-black mb-2">Explorar versões</h3>
                <p className="text-slate-500 font-medium tracking-tight">Versões disponíveis no sistema.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 rounded-2xl border border-slate-200 font-bold hover:bg-slate-50 transition-colors flex items-center gap-2">
                  <Link to='/releases' className='text-black'>
                    Ver todas as versões
                  </Link>
                </button>
                <button className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 group">
                  <Link to='/releases/v1.1.0' className='flex items-center gap-2'>
                    Acessar v1.1.0
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </button>
              </div>
            </div>

            {/* Grid de Cards das Versões Lançadas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase mb-4">
                    <Rocket className="w-3 h-3" />
                    v1.0.0
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Lançamento Oficial</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Lançamento oficial do SPC. O início de uma nova etapa na informatização e facilidade pastoral.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase mb-4">
                    <Sparkles className="w-3 h-3" />
                    v1.1.0
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">Modernização e UX</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Grande atualização focada em modernização da interface, experiência do usuário, acessibilidade, novos indicadores, histórico individual de presença, melhorias visuais e refinamentos do sistema.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <Footer />

    </div>
  );
};

export default ReleaseV1Page;