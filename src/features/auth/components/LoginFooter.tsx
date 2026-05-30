import { Link } from "react-router-dom";

function LoginFooter() {
	return (
		<footer className="border-t border-slate-200 pt-5 text-center">
			<p className="text-[0.8rem] font-bold text-[#1E293B] mb-1">SPC — Sistema de Presença da Catequese</p>
			<p className="text-[0.72rem] text-[#64748B] font-medium">
				Versão 1.1 • Desenvolvido por / <Link className="text-blue-500 font-semibold" to='https://github.com/Joaojunio09'>joaojuniodev</Link>
			</p>
		</footer>
	)
}

export default LoginFooter;