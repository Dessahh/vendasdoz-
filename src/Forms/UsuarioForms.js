import React from 'react';
import './Forms.css';
import {NavLink} from 'react-router-dom'
import Usuario from '../Usuario.js'


/*           /*<!--
                <br/>

                <input
                    type="text"
                    name="cep"
                    placeholder="CEP"
                    value={this.user.cep}
                    onChange={entry => this.change(entry)}
                />
                <br/>
                <input
                    type="text"
                    name="logradouro"
                    placeholder="Endereço"
                    value={this.user.logradouro}
                    onChange={entry => this.change(entry)}
                />
                <br/>
                <input
                    type="text"
                    name="numero"
                    placeholder="Número"
                    value={this.state.numero}
                    onChange={entry => this.change(entry)}
                />
                <br/>
                <input
                    type="text"
                    name="bairro"
                    placeholder="Bairro"
                    value={this.state.bairro}
                    onChange={entry => this.change(entry)}
                />
                <br/>
                <input
                    type="text"
                    name="cidade"
                    placeholder="Cidade"
                    value={this.state.cidade}
                    onChange={entry => this.change(entry)}
                />
                <br/>
                <input
                    type="text"
                    name="estado"
                    placeholder="Estado"
                    value={this.state.estado}
                    onChange={entry => this.change(entry)}
                />
                <br/> -->*/
class UsuarioForms extends React.Component {
    state = {
        email: '',
        senha: '',
        cpf: '',
        nome: '',
        dataDeNascimento: '',
        telefone: '',
        idGrupo: '',/*
        cep: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: ''*/
    };

    user = {};

    change = entry => {
        this.setState({
            [entry.target.name]: entry.target.value
        })
    };

    editar = (input) => {
        input.preventDefault();
        this.props.editar(this.state)
    };

    render() {

        console.log(Usuario.user)
        return (

            <form className="form-style-8">
                <h1>informações de Usuário</h1>
                <br/>
                <h3>Email</h3>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={Usuario.user.email}
                    onChange={entry => this.change(entry)}
                />
                <br/>
                {/*
                <h3>Senha</h3>
                <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    value={Usuario.user.senha}
                    onChange={entry => this.change(entry)}
                />*/}
                <br/>
                <h3>CPF</h3>
                <input
                    type="number"
                    name="cpf"
                    placeholder="CPF"
                    value={Usuario.user.cpf}
                    onChange={entry => this.change(entry)}
                />
                <br/>
                <h3>Nome</h3>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={Usuario.user.nome}
                    onChange={entry => this.change(entry)}
                />
                <br/>
                <h3>Data de Nascimento</h3>
                <input
                    type="date"
                    name="dataDeNascimento"
                    placeholder="Data de Nascimento"
                    value={Usuario.user.dataDeNascimento}
                    onChange={entry => this.change(entry)}
                />
                <br/>
                <h3>Telefone</h3>
                <input
                    type="number"
                    name="telefone"
                    placeholder="Telefone"
                    value={Usuario.user.telefone}
                    onChange={entry => this.change(entry)}
                />


                <button className="button-style-8" onClick={input => this.editar(input)}>Salvar edições</button>
                <NavLink to="/"> Home </NavLink>
                <header className="App-boxLine"/>
            </form>
        );
    }

}

export default UsuarioForms