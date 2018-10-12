import React from 'react';
import './Forms.css';
import { NavLink } from 'react-router-dom'

class CadastroForms extends React.Component {
	state = {
		email:'',
		senha:'',
		cpf:'',
		nome:'',
		dataDeNascimento:'',
		telefone:'',
		idGrupo:'',
	}

	change = entry => {
		this.setState({
			[entry.target.name]: entry.target.value
		})
	}

	cadastrar = input => {
		input.preventDefault()
		this.props.cadastrar(this.state)
	}

	render () {
		return (
			
			<form className="form-style-8">
			<h1>Cadastro de Usuário</h1>
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
			<input 
				type = "number"
				name = "cpf"
				placeholder = "CPF" 
				value = {this.state.cpf}  
				onChange = { entry => this.change(entry) } 
			/>
			<br />
			<input 
				type = "text"
				name = "nome"
				placeholder = "Nome" 
				value = {this.state.nome}  
				onChange = { entry => this.change(entry) } 
			/>
			<br />
			<input 
				type = "date"
				name = "dataDeNascimento"
				placeholder = "Data de Nascimento" 
				value = {this.state.dataDeNascimento}  
				onChange = { entry => this.change(entry) } 
			/>
			<br />
			<input 
				type = "number"
				name = "telefone"
				placeholder = "Telefone" 
				value = {this.state.telefone}  
				onChange = { entry => this.change(entry) } 
			/>
			<br />
			<button className="button-style-8" onClick={input => this.cadastrar(input)}>Cadastrar</button>
			<NavLink to="/login" > Logar </NavLink>
			<header className="App-boxLine" />
			</form>
		);
	}

}

export default CadastroForms 