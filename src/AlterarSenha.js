import React, { Component } from 'react'
import './App.css'
import AlterarSenhaForms from './Forms/AlterarSenhaForms.js'
import Modal from './Modal.js'
import Sessao from './Sessao.js'

class AlterarSenha extends Component {

    state = {
        show: false,
        showedit: false,
        message: '',
    }

    showModal = (message) => {
        this.setState({
            message: message,
            show: !this.state.show
        });
    };

    concluir = (input) => {
        let senha = input.senha
        let confirm = input.confirmsenha

        if(senha === confirm) {
            console.log(senha)
        } else {
            this.showModal("Digite duas senhas iguais.")
        }

    }

    render() {
        
            return (
                <div className='App'>
                    <div className='App-body'>
                        <AlterarSenhaForms concluir={input => this.concluir(input)} />

                        <Modal
                            onClose={this.showModal}
                            show={this.state.show}>
                            {this.state.message}
                        </ Modal>
                    </div>
                </div>
        )}

}

export default AlterarSenha