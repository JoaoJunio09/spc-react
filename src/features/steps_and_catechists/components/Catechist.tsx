type CatechistProps = {
	firstName: string,
	stepName: string
}

function Catechist({ firstName, stepName }: CatechistProps) {
	return (
		<div className="card">
			<h3 id="firstName">{firstName}</h3>
			<p>Turma: <span className="tag-step">{stepName}</span></p>
			<div className="card-actions"></div>
		</div>
	)
}

export default Catechist;