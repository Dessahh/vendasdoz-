import React, { Component } from 'react';
import logo from './logo2.png';
import './App.css';
import ConsultaForms from './Forms/ConsultaForms.js'
import Modal from './Modal.js'
import { AsyncStorage } from "react-native"


class Consulta extends Component {

  state = {
    show: false,
    message: '',
  }

  consulta = input => {
    console.log("CPF: ", input.cpf)

    var targetUrl = 'http://ec2-18-231-28-232.sa-east-1.compute.amazonaws.com:3002/users/'
    
    targetUrl = targetUrl + input.cpf

    this.getToken().then((token) => {

      return fetch(targetUrl, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           //TODO: pegar token do confirm request
           tokenSessao: token,
        }),
      }).then((response) => response.json())
      .then((responseJson) => {
        let info = "Nome: " + responseJson.nome + "    Email: " + responseJson.email + "    Telefone: " + responseJson.telefone
        {this.showModal(info)}
      })

      }).catch((error) =>{

        console.log(error.message)
      })

   }

  showModal = (message) => {
    this.setState ({
      message: message,
      show: !this.state.show
    });
  }

  getToken = async () => {
    try {
      const retrievedItem =  await AsyncStorage.getItem('tokenSessao');
      
      console.log("Deu certo: ", retrievedItem)
      return retrievedItem;
    } catch (error) {
      console.log(error);
    }
    
    return
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