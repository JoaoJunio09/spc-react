import type { MassResponse } from "../../../interfaces/mass/MassResponse";
import useLoadLiturgicalCalendar from "../hooks/useLoadLiturgicalCalendar";
import useMassFormModal from "../hooks/useMassFormModal";

type MassFormModalProps = {
	mass: MassResponse | null,
	onClose: () => void,
	onSuccess: () => Promise<void>
}

function MassFormModal({ mass, onClose, onSuccess }: MassFormModalProps) {
	const { liturgicalCalendars, error: errorLoadingLiturgicalCalendar } = useLoadLiturgicalCalendar();
	const {
		formData,
		saveOrUpdate,
		handleOnChange,
		error
	} = useMassFormModal(mass, onClose, onSuccess);

	{error && console.log(error)};
	{errorLoadingLiturgicalCalendar && console.log(errorLoadingLiturgicalCalendar)};

	return (
		<div className="modal-overlay" id="missaModal">
			<div className="modal-content">
				<h2 id="modalTitle">
					{mass === null ? 'Registrar Missa' : 'Editar Missa'}
				</h2>
				<form onSubmit={saveOrUpdate}>
					<div className="form-group">
						<label htmlFor="massTitleOfLicaturgicalCalendar">Missa</label>
						<select
							name="massTitleOfLicaturgicalCalendar"
							id="massTitleOfLicaturgicalCalendar"
							value={formData.massTitleOfLicaturgicalCalendar}
							onChange={handleOnChange}
							required
						>
							<option hidden>Selecione no Calendário Litúrgico</option>
							{liturgicalCalendars?.map(liturgicalCalendar => (
								<option key={liturgicalCalendar.id} value={liturgicalCalendar.title}>{liturgicalCalendar.title}</option>
							))}
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="date">Data da Missa</label>
						<input
							type="date"
							id="date"
							name="date"
							className="date-register"
							value={formData.date}
							onChange={handleOnChange}
							required 
						/>
					</div>
					<div className="form-group">
						<label htmlFor="time">Horário</label>
						<input
							type="time"
							id="time"
							name="time"
							value={formData.time}
							onChange={handleOnChange}
							required
						/>
					</div>
					<div className="form-group">
						<label htmlFor="location">Localização</label>
						<select
							name="location"
							id="location"
							value={formData.location}
							onChange={handleOnChange}
							required
						>
							<option value="" hidden>Selecione o Local</option>
							{
								sessionStorage.getItem('communityOrParish') === 'SAO_SEBASTIAO'
								? <option value="MATRIZ">Matriz</option> 
								: <option value="CAPELA_DO_DIVINO">Capela do Divino</option>
							}
						</select>
					</div>
					<div className="modal-actions">
						<button type="button" className="btn-cancel" id="btnCancel" onClick={onClose}>Cancelar</button>
						<button type="submit" className="btn-save">Salvar Missa</button>
					</div>
				</form>
			</div>
    </div>
	)
}

export default MassFormModal;