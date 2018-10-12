import React from 'react';
import './Forms.css';
import { NavLink } from 'react-router-dom'

class LoginForms extends React.Component {
	state = {
		email: '',
		senha: '',
	}

	change = entry => {
		this.setState({
			[entry.target.name]: entry.target.value
		})
	}

	authenticate = input => {
		input.preventDefault()
		this.props.authenticate(this.state)
	}

	render () {
		return (
			
			<form className="form-style-8">
				<h1>Login</h1>
				<br />
				<input 
					type = "email"
					name = "email"
					placeholder = "Email" 
					value = {this.state.email}  
					onChange = { entry => this.change(entry) } 
				/>
				<br />
				<input 
					type = "password"
					name = "senha"
					placeholder = "Senha" 
					value = {this.state.senha}  
					onChange = { entry => this.change(entry) } 
				/>
				<br />
				<button className="button-style-8" onClick={input => this.authenticate(input)} >Enviar</button>
				<NavLink to="/consulta" > Consultar </NavLink>
				<header className="App-boxLine" />
			</form>
		);
	}
}

export default LoginForms