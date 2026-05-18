import { ChevronDown, Search } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import useLoadSteps from '../hooks/useLoadSteps';
import useRegisterPresence from '../hooks/useRegisterPresence';
import '../styles/registerPresence.css';
import CardCatechumen from './CardCatechumen';
import CardCatechumenSkeleton from './CardCatechumenSkeleton';
import CardSteps from './CardSteps';

function RegisterPresence() {
	const [isOpenAccordionSteps, setIsOpenAccordionSteps] = useState<boolean>(false);
	const accordionRef = useRef<HTMLDivElement | null>(null);

	const { steps, error: errorLoadSteps, loading: loadingSteps } = useLoadSteps();
	const {
		catechumens,
		loading,
		error,
		fullName,
		markPresence,
		markAbsence,
		isPresent,
		search,
		listCatechumens,
		clear
	} = useRegisterPresence();
	
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

	function handleListCatechumens(stepId: number) {
		listCatechumens(stepId);
		setIsOpenAccordionSteps(false);
		handleAccordion();
	}

	function handleSearchCatechumens(fullName: string) {
		search(fullName);
		if (isOpenAccordionSteps) {
			setIsOpenAccordionSteps(false);
			handleAccordion();
		}
	}

	return (
		<main className="register-presence-container">
			{errorLoadSteps && toast.error(errorLoadSteps)}
			{loadingSteps && toast.loading(loadingSteps)}
			{error && toast.error(error.message)}
			<section className="page-intro">
				<h2>Registrar Presença na Missa</h2>
				<p>Selecione uma turma ou pesquise um catequizando específico.</p>
			</section>

			<section className="search-section">
				<div className="search-container">
					<Search className="search-icon" />
					<input
						type="text"
						id="inputSearch"
						placeholder="Pesquisar o nome do catequizando..."
						value={fullName}
						onChange={(e) => handleSearchCatechumens(e.target.value)}
					/>
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
								<CardSteps
									key={step.id}
									step={step}
									handleListCatechumens={() => handleListCatechumens(step.id)}
								/>
							))}
						</div>
					</div>
				</div>
			</section>

			<section
				className="attendance-section"
				style={{
					display: fullName || catechumens.length > 0
						? 'block'
						: 'none'
				}}
			>
				<div className="section-header">
					<h3 id="tituloListagem">
						{fullName ? `Resultados para: ${fullName}` : 'Catequizandos'}
					</h3>
					<button className="btn-clear" id="reset">Limpar Seleção</button>
				</div>
				
				<div className="catequizandos-list" id="listCatechumens">
					{
						loading
							? Array.from({ length: 4 }).map((_, index) => (
									<CardCatechumenSkeleton key={index} />
								))
							: catechumens.map(catechumen => (
								<CardCatechumen
									key={catechumen.id}
									catechumen={catechumen}
									isPresent={isPresent(catechumen)}
									handleMarkPresence={markPresence}
									handleMarkAbsence={markAbsence}
								/>
							))
					}
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