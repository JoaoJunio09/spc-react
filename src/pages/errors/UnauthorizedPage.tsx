import {
  HelpCircle,
  Home,
  Lock,
  LogIn,
  ShieldAlert
} from 'lucide-react';
import React from 'react';
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
        transform: translateY(16px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-card {
      animation: cardFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `}</style>
);

// Componente de ilustração com acabamento premium que sinaliza segurança sem alarmar o usuário
const ErrorIllustration: React.FC = () => (
  <div className="relative flex items-center justify-center w-36 h-36 mx-auto mb-6">
    {/* Brilho pulsante sutil ao fundo */}
    <div className="absolute inset-0 bg-rose-500/5 rounded-full animate-pulse duration-[3000ms]" />
    <div className="absolute w-28 h-28 bg-gradient-to-br from-rose-500/10 to-amber-500/5 rounded-full blur-lg" />
    
    {/* Base do Escudo protetor */}
    <div className="relative bg-white border border-slate-200/80 rounded-2xl p-4 shadow-md flex items-center justify-center w-20 h-20 transition-all hover:scale-105 duration-300">
      <ShieldAlert className="w-10 h-10 text-slate-700" />
    </div>

    {/* Ícone de Cadeado Flutuante com micro-animação */}
    <div className="absolute top-4 right-4 bg-gradient-to-br from-rose-500 to-red-600 text-white p-2 rounded-xl shadow-lg border-2 border-white flex items-center justify-center animate-bounce duration-[2500ms]">
      <Lock className="w-4.5 h-4.5" />
    </div>
  </div>
);

// Componente com o código do erro (403) e o título claro e legível
const ErrorHeader: React.FC = () => (
  <header className="text-center mb-4">
    {/* Badge discreta de Identificação HTTP 403 */}
    <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200/60 text-rose-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
      <span>Código 403</span>
      <span className="w-1 h-1 bg-rose-400 rounded-full" />
      <span className="font-semibold text-[0.7rem] text-rose-600">Acesso Restrito</span>
    </div>

    {/* Código do erro em fonte gigante e sutil para o fundo visual */}
    <div className="text-7xl font-extrabold text-slate-900 tracking-tighter mb-2 opacity-15">
      403
    </div>
    
    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
      Acesso Negado
    </h1>
  </header>
);

// Componente que evita jargões assustadores e foca na usabilidade para o público maduro
const ErrorMessage: React.FC = () => (
  <section className="text-center text-slate-600 text-[0.95rem] sm:text-base leading-relaxed space-y-3 max-w-[440px] mx-auto mb-8">
    <p>
      Não foi possível acessar a funcionalidade solicitada.
    </p>
    <p className="font-medium text-slate-500">
      Isso pode ter acontecido porque sua sessão expirou após um tempo sem uso, ou porque sua conta não possui permissão para ver esta página.
    </p>
  </section>
);

// Componente de ações do card (Reconectar / Voltar ao Dashboard)
const ErrorActions: React.FC = () => (
  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-[380px] mx-auto mb-8">
    {/* Botão Primário: Entrar novamente com destaque em Amber (SPC) */}
    <button 
      type="button" 
      className="w-full sm:flex-1 h-12 bg-gradient-to-r border-none from-amber-500 to-orange-600 text-white rounded-xl text-[0.95rem] font-bold shadow-md hover:shadow-lg shadow-orange-600/10 hover:shadow-orange-600/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
    >
      <Link className='flex items-center justify-center gap-2 cursor-pointer' to='/'>
        <LogIn className="w-4.5 h-4.5" />
        Fazer login novamente
      </Link> 
    </button>
    
    {/* Botão Secundário: Retornar de forma discreta */}
    <button 
      type="button" 
      className="w-full sm:flex-1 h-12 bg-white border-2 border-slate-200  hover:text-slate-800 hover:bg-slate-50 rounded-xl text-[0.95rem] font-bold hover:border-slate-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
    >
      <Link className='text-slate-600 flex items-center justify-center gap-2 cursor-pointer' to='/'>
        <Home className="w-4.5 h-4.5" />
        Voltar ao início
      </Link>
    </button>
  </div>
);

// Componente informativo de suporte para contato com a secretaria paroquial
const HelpSection: React.FC = () => (
  <div className="border-t border-slate-100 pt-5 mt-2 flex items-start gap-3 text-left bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50">
    <div className="bg-amber-100 text-amber-800 p-2.5 rounded-xl flex-shrink-0">
      <HelpCircle className="w-5 h-5" />
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="text-[0.9rem] font-bold text-slate-800 mb-0.5">Precisa de ajuda?</h4>
      <p className="text-[0.82rem] text-slate-500 leading-normal">
        Caso acredite que isso seja um erro ou precise de acesso, entre em contato com a coordenação do sistema.
      </p>
    </div>
  </div>
);

// ==========================================
// COMPONENTE PRINCIPAL: Error403Page (App)
// ==========================================
function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between p-4 sm:p-6 font-sans relative overflow-hidden text-left">
      <Styles />

      {/* Detalhe estético imitando vitral litúrgico abstrato ao fundo */}
      <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.06] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-bl from-amber-200/10 to-orange-300/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-slate-200/10 to-rose-200/5 rounded-full blur-3xl pointer-events-none" />

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

export default UnauthorizedPage;