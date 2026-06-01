import { ChevronDown, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmDialog from '../../../components/feedback/ConfirmDialog/ConfirmDialog';
import useLoadSteps from '../hooks/useLoadSteps';
import useRegisterPresence from '../hooks/useRegisterPresence';
import CatechumenCard from './CatechumenCard';
import CatechumenCardSkeleton from './CatechumenCardSkeleton';
import StepCard from './StepCard';

import type { CatechumenResponse } from '../../../data/catechumen/CatechumenResponse';
import '../styles/registerPresence.css';
import RetroactivePresenceModal from './RetroactivePresenceModal';

type RetroactivePresenceModalType = {
	openModal: boolean,
	catechumen?: CatechumenResponse
}

function RegisterPresence() {
	const [retroactiveModal, setRetroactiveModal] = useState<RetroactivePresenceModalType>({
		openModal: false
	});
	const [isOpenAccordionSteps, setIsOpenAccordionSteps] = useState(false);
	const [openClearDialog, setOpenClearDialog] = useState(false);
	
	const accordionRef = useRef<HTMLDivElement | null>(null);

	const { steps, error: errorLoadSteps, loading: loadingSteps } = useLoadSteps();
	const {
		catechumens,
		loading,
		error,
		checkExistingsPresences,
		fullName,
		markPresence,
		markAbsence,
		review,
		isPresent,
		isBlockButtonPresence,
		search,
		listCatechumens,
		countSelected,
		isRetroactive,
		clear
	} = useRegisterPresence();

	useEffect(() => {
		checkExistingsPresences();
	}, []);

	useEffect(() => {
		if (loadingSteps) {
			toast.loading('Carregando as Etapas');
		}	else {
			toast.dismiss();
		}

		if (errorLoadSteps) {
			toast.error(errorLoadSteps);
		}

		if (error) {
			toast.error(error.message);
		}
	}, [errorLoadSteps, loadingSteps, error]);

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

	function handleMarkPresence(catechumen: CatechumenResponse) {
		if (isRetroactive) {
			setRetroactiveModal({
				openModal: true,
				catechumen: catechumen
			})
		}

		markPresence(catechumen);
	}

	function handleReview() {
		if (countSelected === 0)  {
			toast.info('Marque no mínimo 1 catequizando');
			return;
		}

		review();
	}

	function handleClear() {
		clear();
		setOpenClearDialog(false);
	}

	function handleCloseRetroactiveModal() {
		setRetroactiveModal({
			openModal: false
		});
		clear();
	}

	return (
		<main className="register-presence-container">
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
								<StepCard
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
					<button
						className="btn-clear"
						id="reset"
						onClick={() => setOpenClearDialog(true)}
					>
						Limpar Seleção
					</button>
				</div>

				<ConfirmDialog
					open={openClearDialog}
					onOpenChange={setOpenClearDialog}
					title="Limpar seleção"
					description="Tem certeza que deseja limpar a seleção atual? Os catequizandos marcados serão removidos da revisão atual."
					confirmText="Sim, limpar"
					cancelText="Cancelar"
					variant="danger"
					onConfirm={handleClear}
				/>
				
				<div className="catequizandos-list" id="listCatechumens">
					{
						loading
							? Array.from({ length: 4 }).map((_, index) => (
									<CatechumenCardSkeleton key={index} />
								))
							: catechumens.map(catechumen => (
									<CatechumenCard
										key={catechumen.id}
										catechumen={catechumen}
										isPresent={isPresent(catechumen)}
										isBlockButtonPresence={isBlockButtonPresence(catechumen)}
										handleMarkPresence={() => handleMarkPresence(catechumen)}
										handleMarkAbsence={() => markAbsence(catechumen)}
									/>
								))
					}
				</div>

				<div className="actions-footer" id="actions-footer">
					<button className="btn-confirm-final" onClick={() => handleReview()}>
						<i data-lucide="eye"></i>
						Revisar (<span id="countSelected">{countSelected}</span>)
					</button>
				</div>
			</section>

			{retroactiveModal.openModal &&
				<RetroactivePresenceModal
					open={retroactiveModal.openModal}
					loading={false}
					catechumen={retroactiveModal.catechumen}
					onClose={handleCloseRetroactiveModal}
				/>
			}
    </main>
	)
}

export default RegisterPresence;