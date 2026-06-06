import { BrowserRouter, Route, Routes } from "react-router-dom";

import CatechumensPage from "../pages/CatechumensPage";
import ConfirmPresencePage from "../pages/ConfirmPresencePage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MassesPage from "../pages/MassesPage";
import RegisterPresencePage from "../pages/RegisterPresencePage";
import StepsAndCatechistsPage from "../pages/StepsAndCatechistsPage";

import { AuthProvider } from "../context/AuthContext";
import { PresenceProvider } from "../context/PresenceContext";
import { StatusBannerProvider } from "../context/StatusBannerContext";
import InternalServerErrorPage from "../pages/errors/InternalServerErrorPage";
import PresencesPage from "../pages/PresencesPage";
import IndividualPresencePage from "../pages/IndividualPresencePage";
import ProtectedRoute from "./ProtectedRoute";
import UnauthorizedPage from "../pages/errors/UnauthorizedPage";
import NotFoundPage from "../pages/errors/NotFoundPage";

function RoutesApp() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<StatusBannerProvider>
					<PresenceProvider>
						<Routes>

							<Route path="/" element={<LoginPage />} />
							<Route path="/error" element={<InternalServerErrorPage />} />
							<Route path="/unauthorized" element={<UnauthorizedPage />} />
							<Route path="/notfound" element={<NotFoundPage />} />
							
							<Route element={<ProtectedRoute roles={['ROLE_COORDINATOR', 'ROLE_ADMIN']} />}>
								<Route path="/etapas-e-catequistas" element={<StepsAndCatechistsPage />} />
								<Route path="/missas" element={<MassesPage />} />
							</Route>

							<Route element={<ProtectedRoute roles={['ROLE_CATECHIST', 'ROLE_COORDINATOR', 'ROLE_ADMIN']} />}>
									<Route path="/inicio" element={<HomePage />} />
									<Route path="/catequizandos" element={<CatechumensPage />} />
									<Route path="/presencas/registrar/:massId" element={<RegisterPresencePage />} />
									<Route path="/presencas/confirmar/:massId" element={<ConfirmPresencePage />} />
									<Route path="/presencas" element={<PresencesPage />} />
									<Route path="/presencas/catequizando/:catechumenId" element={<IndividualPresencePage />} />
							</Route>

						</Routes>
					</PresenceProvider>
				</StatusBannerProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default RoutesApp;