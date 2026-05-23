import './index.css';

import logoImg from '../../../assets/brasao_paroquia.png';
import type { CommunityOrParish } from '../../../enums/CommunityOrParish';
import { Link } from 'react-router-dom';
import { useState } from 'react';

type HeaderProps = {
	active: string
}

function Header({ active }: HeaderProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const communityOrParish = loadCommunityOrParish();

	function loadCommunityOrParish() {
		const communityOrParishForStorage: string | null = sessionStorage.getItem('communityOrParish');

		let communityOrParish: CommunityOrParish | null = null;

		communityOrParishForStorage === 'SAO_SEBASTIAO'
			? communityOrParish = 'SAO_SEBASTIAO'
			: communityOrParish = 'DIVINO_ESPIRITO_SANTO';

		return communityOrParish;
	}

	function activateTheMenu(menuActual: string): string {
		if (active === 'home' && menuActual === 'home') return 'active';
		else if (active === 'masses' && menuActual === 'masses') return 'active';
		else if (active === 'catechists' && menuActual === 'catechists') return 'active';
		else if (active === 'steps-and-catechists' && menuActual === 'steps-and-catechists') return 'active';
		else if (active === 'catechumens' && menuActual === 'catechumens') return 'active';
		else if (active === 'presences' && menuActual === 'presences') return 'active';
		else return '';
	}

	return (
		<header className="main-header">
			<div className="container header-container">
				<div className="logo-area">
					<div className="church-logo-placeholder">
						<img src={logoImg} alt="Logo Paróquia" />
					</div>
					<div className="system-title">
						<h1>SPC</h1>
						{
							communityOrParish === 'SAO_SEBASTIAO' ? <p>Paróquia <strong>São Sebastião</strong></p> 
							: (communityOrParish === 'DIVINO_ESPIRITO_SANTO' ? <p>Capela <strong>Divino Espírito Santo</strong></p>
							: <p>Presença da Catequese</p>)
						}
					</div>
				</div>

				<button
					className="menu-toggle"
					id="btnMenu"
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? '✕ FECHAR' : '☰ MENU'}	
				</button>
				
				<nav className={`main-nav ${isOpen ? 'open' : ''}`} id="mainNav">
					<ul>
						<li><Link to="/inicio" className={`${activateTheMenu('home')}`}>Início</Link></li>
						<li><Link to="/etapas-e-catequistas" className={`${activateTheMenu('steps-and-catechists')}`}>Etapas</Link></li>
						<li><Link to="/catequizandos" className={`${activateTheMenu('catechumens')}`}>Catequizandos</Link></li>
						<li><Link to="/missas" className={`${activateTheMenu('masses')}`}>Missas</Link></li>
						<li><Link to="/presencas" className={`${activateTheMenu('presences')}`}>Histórico</Link></li>
					</ul>
				</nav>
			</div>
    </header>
	)
}

export default Header;