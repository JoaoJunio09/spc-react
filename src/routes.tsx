import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MassesPage from "./pages/MassesPage";
import StepsAndCatechistsPage from "./pages/StepsAndCatechistsPage";
import CatechumensPage from "./pages/CatechumensPage";
import RegisterPresencePage from "./pages/RegisterPresencePage";
import ConfirmPresencePage from "./pages/ConfirmPresencePage";

import { PresenceProvider } from "./context/PresenceContext";
import { StatusBannerProvider } from "./context/StatusBannerContext";
import PresencesPage from "./pages/PresencesPage";

function RoutesApp() {
	return (
		<BrowserRouter>
			<StatusBannerProvider>
				<PresenceProvider>
					<Routes>
						<Route path="/" element={<LoginPage />} />
						<Route path="/inicio" element={<HomePage />} />
						<Route path="/etapas-e-catequistas" element={<StepsAndCatechistsPage />} />
						<Route path="/catequizandos" element={<CatechumensPage />} />
						<Route path="/missas" element={<MassesPage />} />

						{/* Implementar proteção de rota */}
						{/* Verifico se o usuário que está registrando presença, está autenticado no sistema */}
						<Route path="/presencas/registrar/:massId" element={<RegisterPresencePage />} />
						<Route path="/presencas/confirmar/:massId" element={<ConfirmPresencePage />} />
						<Route path="/presencas" element={<PresencesPage />} />
					</Routes>
				</PresenceProvider>
			</StatusBannerProvider>
		</BrowserRouter>
	)
}

export default RoutesApp;