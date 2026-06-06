import React from 'react';
import { 
  Compass, 
  ArrowLeft, 
  Home, 
  Church, 
  HelpCircle, 
  ChevronRight, 
  MapPin, 
  FileQuestion 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Styles: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
    body, .font-sans {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    }
    @keyframes cardFadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes pulseSoft {
      0%, 100% {
        opacity: 0.15;
        transform: scale(1);
      }
      50% {
        opacity: 0.25;
        transform: scale(1.05);
      }
    }
    @keyframes floatCompass {
      0%, 100% {
        transform: translateY(0) rotate(0deg);
      }
      50% {
        transform: translateY(-6px) rotate(8deg);
      }
    }
    .animate-card {
      animation: cardFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    .animate-pulse-soft {
      animation: pulseSoft 3s ease-in-out infinite;
    }
    .animate-float {
      animation: floatCompass 4s ease-in-out infinite;
    }
  `}</style>
);

// Componente de ilustração com acabamento premium e o breadcrumb didático de "caminho sem saída"
const ErrorIllustration: React.FC = () => (
  <div className="relative flex flex-col items-center justify-center w-full mb-6 select-none">
    {/* Brilho pulsante de fundo sutil para dar profundidade */}
    <div className="absolute w-36 h-36 bg-gradient-to-br from-indigo-500/10 to-amber-500/5 rounded-full blur-xl animate-pulse-soft" />
    
    {/* Ícone flutuante centralizado de bússola */}
    <div className="relative bg-white border border-slate-200/80 rounded-2xl p-4 shadow-md flex items-center justify-center w-20 h-20 transition-all hover:scale-105 duration-300 mb-6 z-10 animate-float">
      <Compass className="w-10 h-10 text-indigo-500" />
    </div>

    {/* DIFERENCIAL VISUAL: Representação visual do caminho de navegação perdido */}
    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-500 shadow-sm max-w-full overflow-hidden">
      <span className="text-slate-400 hover:text-slate-600 transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5 text-slate-400" />
        Início
      </span>
      <ChevronRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
      <span className="text-slate-400 flex-shrink-0">Catequizandos</span>
      <ChevronRight className="w-3 h-3 text-slate-300 flex-shrink-0" />
      {/* Nó de destino inexistente com sinal de interrogação e cor de aviso discreta */}
      <span className="inline-flex items-center gap-1 text-indigo-600 bg-indigo-50/50 border border-indigo-100/60 px-2 py-0.5 rounded-md font-bold animate-pulse flex-shrink-0">
        <FileQuestion className="w-3.5 h-3.5" />
        Destino desconhecido
      </span>
    </div>
  </div>
);

// Componente com o código do erro (404) estilizado de forma discreta com azul/indigo e o título explicativo
const ErrorHeader: React.FC = () => (
  <header className="text-center mb-4">
    {/* Badge discreta de Identificação HTTP 404 */}
    <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-200/50 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
      <span>Código 404</span>
      <span className="w-1 h-1 bg-indigo-400 rounded-full" />
      <span className="font-semibold text-[0.7rem] text-indigo-600">Não Encontrado</span>
    </div>

    {/* Código do erro em fonte gigante e sutil para o fundo visual */}
    <div className="text-8xl font-black text-slate-200 tracking-tighter mb-1 select-none leading-none">
      404
    </div>
    
    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight mt-1">
      Não foi possível localizar esta página
    </h1>
  </header>
);

// Mensagem explicativa focada em usabilidade e acolhimento para o público da catequese
const ErrorMessage: React.FC = () => (
  <section className="text-center text-slate-600 text-[0.95rem] sm:text-base leading-relaxed space-y-3.5 max-w-[440px] mx-auto mb-8">
    <p>
      A página que você tentou acessar não existe ou foi movida para outro endereço.
    </p>
    <p className="font-medium text-slate-500">
      Verifique se o endereço digitado está correto ou utilize as opções abaixo para continuar navegando normalmente pelo sistema.
    </p>
  </section>
);

// Componente de ações do card (Retornar ao Início / Voltar à Página Anterior)
const ErrorActions: React.FC = () => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-[390px] mx-auto mb-8">
    {/* Botão Primário: Voltar ao Início com destaque em Amber (SPC) */}
    <button 
      type="button" 
      className="w-full border-none sm:flex-1 h-12 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl text-[0.95rem] font-bold shadow-md hover:shadow-lg shadow-orange-600/10 hover:shadow-orange-600/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
    >
			<Link className='flex items-center justify-center gap-2 cursor-pointer' to='/'>
				<Home className="w-4.5 h-4.5" />
      	Voltar ao início
			</Link>
      
    </button>
    
    {/* Botão Secundário: Voltar à página anterior (Discreto) */}
    <button 
      type="button" 
      className="w-full sm:flex-1 h-12 bg-white border-2 border-slate-200  hover:text-slate-800 hover:bg-slate-50 rounded-xl text-[0.95rem] font-bold hover:border-slate-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
    >
			<Link className='text-slate-600 flex items-center justify-center gap-2 cursor-pointer' to='/'>
				<ArrowLeft className="w-4.5 h-4.5" />
      	Voltar página
			</Link>
    </button>
  </div>
);

// Componente de suporte discreto para contato com a secretaria paroquial
const HelpSection: React.FC = () => (
  <div className="border-t border-slate-100 pt-5 mt-2 flex items-start gap-3 text-left bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
    <div className="bg-indigo-50 text-indigo-800 p-2.5 rounded-xl flex-shrink-0 border border-indigo-100/30">
      <HelpCircle className="w-5 h-5 text-indigo-500" />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-[0.9rem] font-bold text-slate-800 mb-0.5">Dúvidas sobre o caminho?</h4>
      <p className="text-[0.82rem] text-slate-500 leading-normal">
        Se você acredita que esta página deveria estar ativa, por favor entre em contato com a coordenação para obter ajuda.
      </p>
    </div>
  </div>
);

// ==========================================
// COMPONENTE PRINCIPAL: Error404Page (App)
// ==========================================
function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 font-sans relative overflow-hidden text-left">
      <Styles />

      {/* Detalhe estético imitando vitral litúrgico abstrato ao fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.06] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-bl from-indigo-200/10 to-amber-300/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-slate-200/10 to-indigo-200/5 rounded-full blur-3xl pointer-events-none" />

      {/* CARD CENTRALIZADO DO ERRO */}
      <main className="flex-1 flex items-center justify-center py-8 relative z-10">
        <div className="max-w-[480px] w-full bg-white p-6 sm:p-8 md:p-10 rounded-[24px] shadow-xl border border-slate-200/80 text-center animate-card">
          <ErrorIllustration />
          <ErrorHeader />
          <ErrorMessage />
          <ErrorActions />
          <HelpSection />
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;