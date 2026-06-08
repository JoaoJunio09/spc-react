import React from 'react';

interface GlobalFooterProps {
  systemVersion?: string;
}

/**
 * GlobalFooter Component
 * An ultra-clean, minimalist, single-line footer for professional systems.
 * Adheres strictly to the guidelines: no large slogans, no flashy badges,
 * and high professional maturity using subtle slate typography.
 */
export const GlobalFooter: React.FC<GlobalFooterProps> = ({ 
  systemVersion = "1.1.0"
}) => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 py-6 sm:py-7 px-4 sm:px-6 lg:px-8 select-none text-xs text-slate-500 font-medium mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: System identity, version and standard copyright */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-slate-600">
          <span className="font-bold text-slate-800 tracking-tight">SPC</span>
          <span className="text-slate-300">•</span>
          <span className="font-mono text-[11px] text-blue-700 bg-blue-50 border border-slate-150 px-1.5 py-0.5 rounded" title="Versão da release atual">
            v{systemVersion}
          </span>
          <span className="text-slate-300">•</span>
          <span>&copy; {new Date().getFullYear()} Todos os direitos reservados</span>
        </div>

        {/* Right Side: Professional social connect and developer attribution */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 text-slate-500">
          <span>Desenvolvido por</span>
          <a 
            href="https://github.com/JoaoJunio09" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-semibold text-slate-700 hover:text-slate-900 transition-colors hover:underline underline-offset-2 decoration-slate-200 hover:decoration-slate-400"
          >
            João Junio
          </a>
          <span className="text-slate-300">•</span>
          <a 
            href="https://github.com/JoaoJunio09" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-slate-800 transition-colors flex items-center gap-0.5 text-black"
            aria-label="GitHub do desenvolvedor"
          >
            GitHub
          </a>
          <span className="text-slate-300">•</span>
          <a 
            href="https://www.linkedin.com/in/joaojuniodev/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-slate-800 transition-colors flex items-center gap-0.5 text-black"
            aria-label="LinkedIn do desenvolvedor"
          >
            LinkedIn
          </a>
        </div>

      </div>
    </footer>
  );
};

function Footer() {
  return (
		<GlobalFooter systemVersion="1.1.0" />
  );
}

export default Footer;