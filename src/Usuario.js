import React, {Component} from 'react';
import './App.css';
import UsuarioForms from './Forms/UsuarioForms.js'
import Modal from './Modal.js'
import Sessao from './Sessao.js'

class Usuario extends Component {

    state = {
        show: false,
        showedit: false,
        message: '',
    }

    editar = input => {
        console.log("Email: ", input.email)
        console.log("CPF: ", input.cpf)
        console.log("token: ", Sessao.getSessionToken())


        var targetUrl = 'http://ec2-18-231-28-232.sa-east-1.compute.amazonaws.com:3002/users/' + input.cpf + '/update'


        return fetch(targetUrl, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tokenSessao: Sessao.getSessionToken(),
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
                }
            })
    };

    change = boolean => {
        this.setState({showedit: boolean});
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
                    <input type="button" value="Editar" onClick={this.change(true)} />

                    { this.state.showedit ? <UsuarioForms editar={input => this.editar(input)}/>  : null }


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

export default Usuario