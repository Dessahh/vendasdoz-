import React from 'react';
import './Forms.css';
import { NavLink } from 'react-router-dom'

class ConsultaForms extends React.Component {
	state = {
		cpf: '',
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
			<h1>Consulta do usuario</h1>
			<br />
			<input 
				type = "number"
				name = "cpf"
				placeholder = "CPF" 
				value = {this.state.cpf}  
				onChange = { entry => this.change(entry) } 
			/>
			<br />
			<button className="form-style-8" onClick={input => this.authenticate(input)}>Enviar</button>
			<NavLink to="/cadastro" > Cadastrar </NavLink>
			<header className="App-boxLine" />
			</form>
		);
	}
}

export default ConsultaForms