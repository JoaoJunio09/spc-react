import '../styles/login.css';

import logoImg from '../../../assets/brasao_paroquia.png';
import useLoadCatechists from '../hooks/useLoadCatechists';

function Login() {

	const { catechists, error } = useLoadCatechists();

	<p>{error}</p>

	return (
		<main className="login-container">
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
							name="select-catechists" 
							id="select-catechists" 
							required
						>
							{
								catechists.map(catechist => (
									<option 
										key={catechist.id}
										value={catechist.firstName}
									>
										{`${catechist.firstName} ${catechist.lastName}`}
									</option>
								))
							}
						</select>
					</div>
					<div className="input-group">
						<label htmlFor="access-code">Código de acesso</label>
						<select name="select-code" id="select-code" required>
							<option value="default">Selecione o código</option>
							<option value="0">0</option>
							<option value="1">1</option>
						</select>
						<small className="input-hint">O código já foi fornecido pela paróquia.</small>
					</div>

					<button type="submit" className="btn-login">
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