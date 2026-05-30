import { useState } from "react";
import InstitutionalSection from "./InstitutionalSection";
import LoginSelector from "./LoginSelector";
import LoginCatechist from "./LoginCatechist";
import LoginCoordinatorOrAdmin from "./LoginCoordinatorOrAdmin";

export type SelectorType = 'Catechist' | 'Coordinator' | 'Admin' | null;

export type onLoginSelectorProps = {
	onSelectLogin: (param: SelectorType) => void,
	roleCoordinatorOrAdmin?: 'Coordenação' | 'Administrador' 
}

function Login() {
	const [selector, setSelector] = useState<SelectorType | null>(null);

	function handleSelect(selected: SelectorType) {
		setSelector(selected);

		if (selector) {
			localStorage.setItem('selectedLogin', selector);
		}
	}

	function isReturnedComponentLogin() {
		if (selector === null) {
			return <LoginSelector onSelectLogin={handleSelect} />;
		}
		else if (selector === 'Catechist') {
			return <LoginCatechist onSelectLogin={handleSelect} />
		}
		else {
			return <LoginCoordinatorOrAdmin
				onSelectLogin={handleSelect}
				roleCoordinatorOrAdmin={`${selector === "Coordinator" ? 'Coordenação' : 'Administrador'}`}
			/>
		}
	}
	
	return (
		<div className="bg-slate-900 text-slate-800 overflow-x-hidden min-h-screen select-none">
			<div className="flex flex-col lg:flex-row min-h-screen w-full bg-[#F8FAFC]">
				<InstitutionalSection />
				<main className="w-full lg:w-[45%] flex items-center justify-center p-8 lg:p-10 bg-[#F8FAFC]">
					{isReturnedComponentLogin()}
				</main>
  		</div>
		</div>
	)
}

export default Login;