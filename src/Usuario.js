import React, {Component} from 'react';
import './App.css';
import UsuarioForms from './Forms/UsuarioForms.js'
import Modal from './Modal.js'
import Sessao from './Sessao.js'

class Usuario extends Component {

    state = {
        show: false,
        message: '',
    }

    static user = {};

    
    showModal = (message) => {
        this.setState({
            message: message,
            show: !this.state.show
        });
    };

    alterar = input => {

       // var targetUrl = 'http://ec2-18-231-28-232.sa-east-1.compute.amazonaws.com:3002/users/{userCpf}/update';
        var targetUrl = 'http://ec2-18-231-28-232.sa-east-1.compute.amazonaws.com:3002/users/66666666666/update';


        return fetch(targetUrl, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tokenSessao: Sessao.token,
                nome: input.nome,
                email: input.senha,
                data_nasc: input.senha,
                telefone: input.senha,

            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
            });
    };

    render() {
        Usuario.user = Sessao.getSessionUser();
        console.log("cpf deu " + Sessao.CPF_KEY);
        Usuario.user.cpf = Sessao.CPF_KEY;
        console.log(Usuario.user);
            return (
                <div className='App'>


                    <div className='App-body'>


                        <UsuarioForms alterar={input => this.alterar(input)}/>


                        <Modal
                            onClose={this.showModal}
                            show={this.state.show}>
                            {this.state.message}
                        </ Modal>

                    </div>
                </div>
        )}

}

export default Usuario