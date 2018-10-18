import React from 'react';
import './Forms.css';
import {NavLink} from 'react-router-dom'

class CadastroForms extends React.Component {
    state = {
        email: '',
        senha: '',
        cpf: '',
        nome: '',
        dataDeNascimento: '',
        telefone: '',
        idGrupo: '',
        cep: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: ''
    };

    change = entry => {
        this.setState({
            [entry.target.name]: entry.target.value
        })
    };

    cepChange = entry => {
        this.setState({
            [entry.target.name]: entry.target.value
        });

        if (entry.target.value.length !== 8) {
            return;
        }

        // var url = `http://wsendereco.tk`;
        var url = `http://localhost:5000`;
        var targetUrl = `${url}/api/enderecos/cep/${entry.target.value}`;

        console.log('Initiating cep search');

        return fetch(targetUrl, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then((response) => {
            console.dir('Response: ' + response);
            return response.json()
                .then((responseJson) => {
                    console.dir('ResponseJson: ' + responseJson);
                    if (!responseJson || !responseJson[0]) {
                        return;
                    }

                    this.setState({
                        cep: responseJson[0].cep,
                        logradouro: responseJson[0].logradouro,
                        bairro: responseJson[0].bairro,
                        cidade: responseJson[0].cidade,
                        estado: responseJson[0].estado
                    });
                })
        });
    };

    cadastrar = input => {
        input.preventDefault();
        this.props.cadastrar(this.state)
    };

    render() {
        return (

            <form className="form-style-8">
                <h1>Cadastro de Usuário</h1>
                <br/>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={entry => this.change(entry)}
                />
                <br/>
                <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    value={this.state.senha}
                    onChange={entry => this.change(entry)}
                />
                <br/>
                <input
                    type="number"
                    name="cpf"
                    placeholder="CPF"
                    value={this.state.cpf}
                    onChange={entry => this.change(entry)}
                />
                <br/>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={this.state.nome}
                    onChange={entry => this.change(entry)}
                />
                <br/>
                <input
                    type="date"
                    name="dataDeNascimento"
                    placeholder="Data de Nascimento"
                    value={this.state.dataDeNascimento}
                    onChange={entry => this.change(entry)}
                />
                <br/>
                <input
                    type="number"
                    name="telefone"
                    placeholder="Telefone"
                    value={this.state.telefone}
                    onChange={entry => this.change(entry)}
                />
                <br/>
                <input
                    type="text"
                    name="cep"
                    placeholder="CEP"
                    value={this.state.cep}
                    onChange={entry => this.cepChange(entry)}
                />
                <br/>
                <input
                    type="text"
                    name="logradouro"
                    placeholder="Endereço"
                    value={this.state.logradouro}
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
                <br/>

                <button className="button-style-8" onClick={input => this.cadastrar(input)}>Cadastrar</button>
                <NavLink to="/login"> Logar </NavLink>
                <header className="App-boxLine"/>
            </form>
        );
    }

}

export default CadastroForms 