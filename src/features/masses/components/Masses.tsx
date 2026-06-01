import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useLoadMasses from '../hooks/useLoadMasses';
import { UtilsDate } from '../../../utils/UtilsDate';
import MassFormModal from './MassFormModal';

import '../styles/masses.css';
import type { MassResponse } from '../../../data/mass/MassResponse';
import useMass from '../hooks/useMass';
import ConfirmDialog from '../../../components/feedback/ConfirmDialog/ConfirmDialog';

function Masses() {
	const [isOpenModal, setIsOpenModal] 						= useState<boolean>(false);
	const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
	const [mass, setMass] 													= useState<MassResponse | null>(null);
	const [massIdDeleted, setMassIdDeleted]					= useState<number>(0);

	const { masses, error: errorLoad, loadMasses } = useLoadMasses();
	const { deleteMass, error: errorSavingMass } 	 = useMass();

	function handleSaveOrUpdate(mass: MassResponse | null) {
		setIsOpenModal(true);
		setMass(mass);
	}

	function handleDeleteMass(id: number) {
		setOpenConfirmDelete(true);
		setMassIdDeleted(id);
	}

	useEffect(() => {
		if (errorLoad) {
			toast.error(errorLoad)
		}
		if (errorSavingMass) {
			toast.error(errorSavingMass)
		}
	}, [errorLoad, errorSavingMass]);

	return (
		<main>
			<div className="masses-container">
        <section className="page-intro">
					<h2>Gerenciamento de Missas</h2>
					<p>Cadastre, edite ou remova as missas que aparecerão no calendário do sistema.</p>
        </section>

        <button
					className="btn-large"
					id="btnOpenModal"
					onClick={() => handleSaveOrUpdate(null)}
				>
					Registrar Missa
				</button>

        <section className="list-section-masses">
					<h3 className="list-header">Missas Registradas</h3>
					<div className="missas-grid" id="massesGrid">
						{masses.map(mass => (
							<div
								className="missa-card"
								key={mass.id}
								data-id={mass.id}
								data-liturgical-calendar-id={mass.massOfLiturgicalCalendar.id}
							>
								<div className="missa-info">
									<h3 id="title">{mass.title}</h3>
									<p id="date">{UtilsDate.formatDateTime(mass.dateTime)}</p>
								</div>
								<div className="missa-actions">
									<button
										className="btn-action btn-edit"
										onClick={() => handleSaveOrUpdate(mass)}
									>
										Editar
									</button>
									<button
										className="btn-action btn-remove"
										onClick={() => handleDeleteMass(mass.id)}
									>
										Remover
									</button>
								</div>
							</div>
						))}
					</div>
        </section>
    	</div>

			<ConfirmDialog
				open={openConfirmDelete}
				onOpenChange={setOpenConfirmDelete}
				title='Excluir Missa'
				description='Deseja remover essa Missa do Sistema? Não será possível recuperar após a confirmação'
				confirmText='Sim, excluir'
				cancelText='Cancelar'
				variant='danger'
				onConfirm={() => deleteMass(massIdDeleted, loadMasses)}
			/>

			{isOpenModal &&
				<MassFormModal
					mass={mass}
					onClose={() => setIsOpenModal(false)}
					onSuccess={loadMasses}
				/>
			}
		</main>
	)
}

export default Masses;