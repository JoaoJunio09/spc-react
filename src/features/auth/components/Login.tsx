import '../styles/login.css';

import logoImg from '../../../assets/brasao_paroquia.png';
import useLoadCatechists from '../hooks/useLoadCatechists';
import useAuth from '../hooks/useAuth';

function Login() {
	const { catechists, error: loadCatechists } = useLoadCatechists();
	const {
		selectedCatechistId,
		setSelectedCatechistId,
		selectedCode,
		setSelectedCode,
		error,
		auth
	} = useAuth(catechists);

	return (
		<main className="login-container">
			<p>{loadCatechists}</p>
			<p>{error}</p>
			<section className="login-card">
				<header className="login-header">
					<div className="logo-wrapper">
						<img src={logoImg} alt="Brasão da Paróquia" />
					</div>
					<div className="brand">
						<h1>SPC</h1>
						<p>Sistema de Presença</p>
					</div>
				</header>
					
				<div className="login-form">
					<div className="input-group">
						<label htmlFor="access-code">Quem é você?</label>
						<select 
							name="selectedCatechistId"
							id="selectedCatechistId"
							value={selectedCatechistId}
							onChange={(e) => setSelectedCatechistId(e.target.value)}
							required
						>
							<option>Quem é você</option>
							{
								catechists.map(catechist => (
									<option 
										key={catechist.id}
										value={catechist.id}
									>
										{`${catechist.firstName} ${catechist.lastName}`}
									</option>
								))
							}
						</select>
					</div>
					<div className="input-group">
						<label htmlFor="access-code">Código de acesso</label>
						<select
							name="selectCode"
							id="selectCode"
							value={selectedCode}
							onChange={(e) => setSelectedCode(e.target.value)}
							required
						>
							<option value="default">Selecione o código</option>
							<option value="0">0</option>
							<option value="1">1</option>
						</select>
						<small className="input-hint">O código já foi fornecido pela paróquia.</small>
					</div>

					<button type="submit" className="btn-login" onClick={auth}>
						Entrar
					</button>
				</div>            

				<footer className="login-footer">
					<p>&copy; 2026 Paróquia São Sebastião</p>
				</footer>
			</section>
    </main>
	)
}

export default Login;