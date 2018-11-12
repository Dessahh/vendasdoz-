import React from 'react';
import './Forms.css';
import {NavLink} from 'react-router-dom'
import Usuario from '../Usuario.js'
import { Redirect } from 'react-router-dom'


class UsuarioForms extends React.Component {

    state = {
        email: '',
        nome: '',
        dataDeNascimento: '',
        telefone: '',
    };

    user = {};

    change = entry => {
        this.setState({
            [entry.target.name]: entry.target.value
        })
    };

    alterar = (input) => {
        input.preventDefault();
        this.props.alterar(this.state)
    };


    render() {

        console.log(Usuario.user)
        return (

            <form className="form-style-8">
                <h1>Informações de Usuário</h1>
                <br/>
                <h3>Email</h3>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={entry => this.change(entry)}
                />
                <br/>
                <h3>Nome</h3>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={this.state.nome}
                    onChange={entry => this.change(entry)}
                />
                <br/>
                <h3>Data de Nascimento</h3>
                <input
                    type="date"
                    name="dataDeNascimento"
                    placeholder="Data de Nascimento"
                    value={this.state.dataDeNascimento}
                    onChange={entry => this.change(entry)}
                />
                <br/>
                <h3>Telefone</h3>
                <input
                    type="number"
                    name="telefone"
                    placeholder="Telefone"
                    value={this.state.telefone}
                    onChange={entry => this.change(entry)}
                />


                <button className="button-style-8" onClick={input => this.alterar(input)}>Salvar edições</button>
               
                <NavLink className="navline" to="/alterarSenha"> Alterar Senha </NavLink>
                <NavLink className="navline" to="/"> Home </NavLink>
        
                <header className="App-boxLine"/>
            </form>
        );
    }

}

export default UsuarioForms