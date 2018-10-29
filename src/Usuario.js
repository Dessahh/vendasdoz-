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
    static user = {email: "input.email",
        senha: "input.senha",
        cpf: 'cpf',
        nome: "input.nome",
        dataDeNascimento: "1995-03-10",
        telefone: "112222",
        idGrupo: '1',};


    editForm = boolean => {
        console.log(boolean);
        this.setState({showedit: boolean});
    };
    
    showModal = (message) => {
        this.setState({
            message: message,
            show: !this.state.show
        });
    };

    /*<input type="button" value="Editar" onClick={() => this.editForm(true)} />
    * { this.state.showedit ? <UsuarioForms editar = {(e) => this.editar(e)}/>  : null }*/

    render() {
        Usuario.user = Sessao.getSessionUser();
        console.log("cpf deu " + Sessao.CPF_KEY);
        Usuario.user.cpf = Sessao.CPF_KEY;
        console.log(Usuario.user);
            return (
                <div className='App'>


                    <div className='App-body'>


                        <UsuarioForms editar = {(e) => this.editar(e)}/>


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