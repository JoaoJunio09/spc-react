import { BrowserRouter, Route, Routes } from "react-router-dom";

import CatechumensPage from "../pages/features/CatechumensPage";
import ConfirmPresencePage from "../pages/features/ConfirmPresencePage";
import HomePage from "../pages/features/HomePage";
import LoginPage from "../pages/features/LoginPage";
import MassesPage from "../pages/features/MassesPage";
import RegisterPresencePage from "../pages/features/RegisterPresencePage";
import StepsAndCatechistsPage from "../pages/features/StepsAndCatechistsPage";

import { AuthProvider } from "../context/AuthContext";
import { PresenceProvider } from "../context/PresenceContext";
import { StatusBannerProvider } from "../context/StatusBannerContext";
import InternalServerErrorPage from "../pages/errors/InternalServerErrorPage";
import PresencesPage from "../pages/features/PresencesPage";
import IndividualPresencePage from "../pages/features/IndividualPresencePage";
import ProtectedRoute from "./ProtectedRoute";
import UnauthorizedPage from "../pages/errors/UnauthorizedPage";
import NotFoundPage from "../pages/errors/NotFoundPage";
import ScrollToTop from "./ScrollToTop";
import ReleaseV1 from "../pages/release/ReleaseV1Page";
import ReleaseV1Page from "../pages/release/ReleaseV1Page";
import ReleaseV11Page from "../pages/release/ReleaseV11Page";
import ReleasesPage from "../pages/release/ReleasesPage";

function RoutesApp() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<StatusBannerProvider>
					<PresenceProvider>
						<ScrollToTop />
						<Routes>
							<Route path="/releases" element={<ReleasesPage />} />
							<Route path="/releases/1.0.0" element={<ReleaseV1Page />} />
							<Route path="/releases/1.1.0" element={<ReleaseV11Page />} />

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

							<Route path="*" element={<NotFoundPage />} />
						</Routes>
					</PresenceProvider>
				</StatusBannerProvider>
			</AuthProvider>
		</BrowserRouter>
	)
}

export default RoutesApp;