import React, { Component } from 'react';
import logo from './logo2.png';
import './App.css';
import ConsultaForms from './Forms/ConsultaForms.js'
import Modal from './Modal.js'

class Consulta extends Component {

  state = {
    show: false,
    message: '',
  }

  consulta = input => {
    console.log("CPF: ", input.cpf)

    // Trocar a proxyURL por uma url nossa
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    var targetUrl = 'http://ec2-18-231-28-232.sa-east-1.compute.amazonaws.com:3002/users/{input.cpf}'
    var fetchurl = proxyUrl + targetUrl

    return fetch(fetchurl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tokenSessao: "001"
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      const keys = Object.keys(responseJson)
      if(keys[0] == 'message'){
         {this.showModal(responseJson.message)}
      }
    })
    .catch((error) => {
      console.log(error);
    });
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

            <ConsultaForms authenticate = {input => this.consulta(input)} />
            
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

export default Consulta