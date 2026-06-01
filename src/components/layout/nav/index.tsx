import { Link } from "react-router-dom";

type OptionsProps = {
	onActiveMenu(param: string): string,
}

const OptionsCatechist = ({
	onActiveMenu
}: OptionsProps) => {
	return (
		<ul>
			<li><Link to="/inicio" className={`${onActiveMenu('home')}`}>Início</Link></li>
			<li><Link to="/catequizandos" className={`${onActiveMenu('catechumens')}`}>Meus catequizandos</Link></li>
			<li><Link to="/presencas" className={`${onActiveMenu('presences')}`}>Histórico</Link></li>
		</ul>
	)
}

const OptionsCoordinator = ({
	onActiveMenu
}: OptionsProps) => {
	return (
		<ul>
			<li><Link to="/inicio" className={`${onActiveMenu('home')}`}>Início</Link></li>
			<li><Link to="/etapas-e-catequistas" className={`${onActiveMenu('steps-and-catechists')}`}>Etapas</Link></li>
			<li><Link to="/catequizandos" className={`${onActiveMenu('catechumens')}`}>Catequizandos</Link></li>
			<li><Link to="/missas" className={`${onActiveMenu('masses')}`}>Missas</Link></li>
			<li><Link to="/presencas" className={`${onActiveMenu('presences')}`}>Histórico</Link></li>
		</ul>
	)
}

const OptionsAdmin = ({
	onActiveMenu
}: OptionsProps) => {
	return (
		<ul>
			<li><Link to="/inicio" className={`${onActiveMenu('home')}`}>Início</Link></li>
			<li><Link to="/etapas-e-catequistas" className={`${onActiveMenu('steps-and-catechists')}`}>Etapas</Link></li>
			<li><Link to="/catequizandos" className={`${onActiveMenu('catechumens')}`}>Catequizandos</Link></li>
			<li><Link to="/missas" className={`${onActiveMenu('masses')}`}>Missas</Link></li>
			<li><Link to="/presencas" className={`${onActiveMenu('presences')}`}>Histórico</Link></li>
		</ul>
	)
}

type NavProps = {
	isOpen: boolean,
	activateTheMenu(param: string): string,
	roles: string[]
}

function Nav({
	isOpen,
	activateTheMenu,
	roles
}: NavProps) {

	function getOptions(roles: string[]) {
		if (roles.includes('ROLE_CATECHIST')) {
			return <OptionsCatechist onActiveMenu={activateTheMenu} />
		}
		else if (roles.includes('ROLE_COORDINATOR')) {
			return <OptionsCoordinator onActiveMenu={activateTheMenu} />
		}
		else if (roles.includes('ROLE_ADMIN')) {
			return <OptionsAdmin onActiveMenu={activateTheMenu} />
		}
		else {
			return null;
		}
	}

	return (
		<nav className={`main-nav ${isOpen ? 'open' : ''}`} id="mainNav">
			{getOptions(roles)}
		</nav>
	)
}

export default Nav;