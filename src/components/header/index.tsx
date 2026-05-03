import './index.css';

import logoImg from '../../assets/brasao_paroquia.png';
import type { CommunityOrParish } from '../../types/CommunityOrParish';
import { Link } from 'react-router-dom';

type HeaderProps = {
	communityOrParish: CommunityOrParish | null
}

function Header({ communityOrParish }: HeaderProps) {
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

				<button className="menu-toggle" id="btnMenu">
					☰ MENU
				</button>
				
				<nav className="main-nav" id="mainNav">
					<ul>
						<li><Link to="/inicio" className="active">Início</Link></li>
						<li><Link to="/turmas">Turmas</Link></li>
						<li><Link to="/catequizandos">Catequizandos</Link></li>
						<li><Link to="/missas">Missas</Link></li>
					</ul>
				</nav>
			</div>
    </header>
	)
}

export default Header;