import React, {Component} from 'react';
import './App.css';
import CadastroForms from './Forms/CadastroForms.js'
import Modal from './Modal.js'

class Cadastro extends Component {

    state = {
        show: false,
        message: '',
    };

    cadastrar = input => {
        console.log("Email: ", input.email)
        console.log("CPF: ", input.cpf)


        var targetUrl = 'http://ec2-18-231-28-232.sa-east-1.compute.amazonaws.com:3002/register'


        return fetch(targetUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: input.email,
                senha: input.senha,
                cpf: input.cpf,
                nome: input.nome,
                dataDeNascimento: input.dataDeNascimento,
                telefone: input.telefone,
                idGrupo: '1',
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                const keys = Object.keys(responseJson)
                if (keys[0] === 'message') {
                    this.showModal(responseJson.message)
                } else {
                    this.showModal(responseJson.registerToken)
                    this.confirm(responseJson.registerToken)
                }
            })
            .then(() => { this.cadastraCredito(input); })
    };

    cadastraCredito = input => {

        var url = 'http://ec2-54-233-234-42.sa-east-1.compute.amazonaws.com:3001/api/v1/inserir'
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        var targetUrl = proxyUrl + url;


        return fetch(targetUrl, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'x-www-formurlencoded',
            },
            body: JSON.stringify({
                score: 500,
                cpf: input.cpf
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('tentou registrar cred :');
                console.log(responseJson);
            })
    }

    confirm = input => {

        const token = input.split(':')[1];
        console.log("Token:", token);

        var targetUrl = 'http://ec2-18-231-28-232.sa-east-1.compute.amazonaws.com:3002/confirm'

        return fetch(targetUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                registerToken: input,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                const keys = Object.keys(responseJson)

                if (keys[0] === 'message') {
                    console.log(responseJson.message)
                } else {
                    console.log(responseJson)
                }
            })


    };

    showModal = (message) => {
        this.setState({
            message: message,
            show: !this.state.show
        });
    };

    render() {
        return (


            <div className='App'>


                <div className='App-body'>


                    <CadastroForms cadastrar={input => this.cadastrar(input)}/>

                    <Modal
                        onClose={this.showModal}
                        show={this.state.show}>
                        {this.state.message}
                    </ Modal>

                </div>
            </div>

        )

    }
}

export default Cadastro