import React from 'react';
import './Forms.css';

class Consulta extends React.Component {
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
			<input 
				type = "number"
				name = "cpf"
				placeholder = "CPF" 
				value = {this.state.cpf}  
				onChange = { entry => this.change(entry) } 
			/>
			<br />
			<button className="form-style-8" onClick={input => this.authenticate(input)}>Enviar</button>
			<header className="App-boxLine" />
			</form>
		);
	}
}

export default Forms