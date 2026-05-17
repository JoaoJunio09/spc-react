import { toast } from 'react-toastify';
import useLoadSteps from '../hooks/useLoadSteps';
import '../styles/registerPresence.css';
import CardSteps from './CardSteps';
import { ChevronDown } from 'lucide-react';
import { useRef, useState } from 'react';

function RegisterPresence() {

	const [isOpenAccordionSteps, setIsOpenAccordionSteps] = useState<boolean>(false);

	const accordionRef = useRef<HTMLDivElement | null>(null);

	const { steps, error: errorLoadSteps } = useLoadSteps();

	function handleAccordion() {
		const accordion = accordionRef.current;

		if (!accordion) return;

		if (isOpenAccordionSteps) {
			accordion.style.maxHeight = accordion.scrollHeight + 'px';

			requestAnimationFrame(() => {
				accordion.style.maxHeight = '0px';
			});
		} 
		else {
			accordion.style.maxHeight = accordion.scrollHeight + 'px';
		}

		setIsOpenAccordionSteps(!isOpenAccordionSteps);
	}

	return (
		<main className="register-presence-container">
			{errorLoadSteps && toast.error(errorLoadSteps)}
			<section className="page-intro">
				<h2>Registrar Presença na Missa</h2>
				<p>Selecione uma turma ou pesquise um catequizando específico.</p>
			</section>

			<section className="search-section">
				<div className="search-container">
					<i data-lucide="search" className="search-icon"></i>
					<input type="text" id="inputSearch" placeholder="Pesquisar o nome do catequizando..." />
				</div>
			</section>

			<section className="accordion-section">
				<div className="accordion-item">
					<button
						className="accordion-header"
						onClick={handleAccordion}
					>
						<span>Turmas Disponíveis</span>
						<ChevronDown />
					</button>
					<div
						ref={accordionRef}
						className="accordion-content"
						id="accordionContent"
					>
						<div className="turmas-grid" id="listSteps">
							{steps.map(step => (
								<CardSteps step={step} handleListCatechumens={() => {}} />
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="attendance-section" id="attendanceSection" style={{ display: 'none' }}>
				<div className="section-header">
					<h3 id="tituloListagem">Catequizandos</h3>
					<button className="btn-clear" id="reset">Limpar Seleção</button>
				</div>
				
				<div className="catequizandos-list" id="listCatechumens">
						
				</div>

				<div className="actions-footer" id="actions-footer">
					<button className="btn-confirm-final">
						<i data-lucide="eye"></i>
						Revisar (<span id="countSelected">0</span>)
					</button>
				</div>
			</section>
    </main>
	)
}

export default RegisterPresence;