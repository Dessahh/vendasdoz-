import React, { Component } from 'react';
import logo from './logo2.png';
import './App.css';
import CadastroForms from './Forms/CadastroForms.js'
import Modal from './Modal.js'

class Cadastro extends Component {

  state = {
    show: false,
    message: '',
  }

  cadastrar = input => {
    console.log("Email: ", input.email)
    console.log("CPF: ", input.cpf)

    // Trocar a proxyURL por uma url nossa
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    var targetUrl = 'http://ec2-18-231-28-232.sa-east-1.compute.amazonaws.com:3002/login/'
    var fetchurl = proxyUrl + targetUrl

    return fetch(fetchurl, {
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
      if(keys[0] === 'message'){
         {this.showModal(responseJson.message)}
      }
    })
  }  

  showModal = (message) => {
    this.setState ({
      message: message,
      show: !this.state.show
    });
  }

  render () {
    return (
 

      <div className='App'>
              
              <header className="App-firstLine"/> 
              <header className="App-header">
                <img src={logo} alt="Logo: Carrinho de Vendas" width="55" height="38" />
                <h1 className="App-title">Vendas do Zé</h1>
              </header>

              <header className="App-secondLine"/> 
              <div className='App-body'>
                 
                  <header className="Blue-Rectangle" />

                  <CadastroForms cadastrar = {input => this.cadastrar(input)} />
                  
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