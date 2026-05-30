import InstitutionalSection from "./InstitutionalSection";
import LoginSelector from "./LoginSelector";

function Login() {
	return (
		<div className="bg-slate-900 text-slate-800 overflow-x-hidden min-h-screen select-none">
			<div className="flex flex-col lg:flex-row min-h-screen w-full bg-[#F8FAFC]">
				<InstitutionalSection />
				<main className="w-full lg:w-[45%] flex items-center justify-center p-8 lg:p-10 bg-[#F8FAFC]">
					<LoginSelector />
				</main>
  		</div>
		</div>
	)
}

export default Login;