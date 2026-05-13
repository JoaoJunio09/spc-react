import { useState } from 'react';
import { toast } from 'react-toastify';
import useLoadMasses from '../hooks/useLoadMasses';
import { UtilsDate } from '../../../utils/UtilsDate';
import MassFormModal from './MassFormModal';

import '../styles/masses.css';
import type { MassResponse } from '../../../interfaces/mass/MassResponse';
import useMass from '../hooks/useMass';

function Masses() {
	const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
	const [mass, setMass] 							= useState<MassResponse | null>(null);

	const { masses, error: errorLoad, loadMasses } 		 = useLoadMasses();
	const { deleteMass, error: errorSavingMass } = useMass();

	function handleSaveOrUpdate(mass: MassResponse | null) {
		setIsOpenModal(true);
		setMass(mass);
	}

	return (
		<main>
			{errorLoad && toast.error(errorLoad)}
			{errorSavingMass && toast.error(errorSavingMass)}

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
										onClick={() => deleteMass(mass.id, loadMasses)}
									>
										Remover
									</button>
								</div>
							</div>
						))}
					</div>
        </section>
    	</div>

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