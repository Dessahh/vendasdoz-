import React from 'react';
import './App.css';
import Modal from './Modal.js'
import LoginForms from './Forms/LoginForms.js'
import {AsyncStorage} from "react-native"
import Sessao from "./Sessao";

class Login extends React.Component {

    state = {
        show: false,
        message: '',
    };

    authenticate = input => {
        var targetUrl = 'http://ec2-18-231-28-232.sa-east-1.compute.amazonaws.com:3002/login';


        return fetch(targetUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: input.email,
                senha: input.senha,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                const keys = Object.keys(responseJson);
                if (keys[0] === 'sessionToken') {
                    try {
                        console.log(input.cpf)
                        console.log(responseJson)

                        Sessao.login(responseJson.cpf, responseJson.sessionToken);
                        this.showModal('Usuario logado com sucesso.')
                    } catch (e) {
                        this.showModal(e.message);
                    }
                } else {
                    console.log(responseJson)
                }
            });
    };

    showModal = (message) => {
        this.setState({
            message: message,
            show: !this.state.show
        })
    };

    render() {
        return (
            <div className='App'>

                <div className='App-body'>

                    <LoginForms authenticate={input => this.authenticate(input)}/>

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

export default Login