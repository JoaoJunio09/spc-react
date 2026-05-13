type CatechumenProps = {
	firstName: string,
	birthDate?: string,
	currentFrequency: number,
	totalFrequency: number
}

function Catechumen({ 
	firstName,
	birthDate,
	currentFrequency,
	totalFrequency
}: CatechumenProps) {

	return (
		<div id="card" className="card-catechumen">
			<div className="catequizando-header">
				<span className="catechumen-firstName">{firstName}</span>
				<span className="catechument-birthDate">{birthDate && birthDate}</span>
			</div>
			<div className="progress-container">
				<div className="progress-label progress-label-actual">
					<span>Presença Atual</span>
					<strong className="presence-actual">{`${currentFrequency.toFixed(1) + '%'}`}</strong>
				</div>
				<div className="progress-bar"><div className="progress-fill bg-green" style={{width: `${currentFrequency.toFixed(1) + '%'}`}}></div></div>
			</div>
			<div className="progress-container">
				<div className="progress-label progress-label-total">
					<span>Presença Total Ano</span>
					<strong className="presence-total">{`${totalFrequency.toFixed(1) + '%'}`}</strong>
				</div>
				<div className="progress-bar"><div className="progress-fill bg-orange" style={{width: `${totalFrequency.toFixed(1) + '%'}`}}></div></div>
			</div>
		</div>
	)
}

export default Catechumen;