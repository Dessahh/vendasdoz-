import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import logo from './logo2.png'
import './App.css'
import 'react-table/react-table.css'

import Navbar from './CustomNavBar.js'

import Cadastro from './Cadastro.js'
import Consulta from './Consulta.js'
import Produto from './Produto.js'
import Login from './Login.js'
import Home from './Home.js'
import Menu from './Menu.js'
import Carrinho from './Carrinho.js'
import Error from './Error.js'

class App extends Component {
  render () {
    return (

      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>

            <Route exact path='/' component={Produto} />
            <Route path='/consulta' component={Consulta} />
            <Route path='/cadastro' component={Cadastro} />
            <Route path='/login' component={Login} />
            <Route path='/carrinho' component={Carrinho} />
            <Route component={Error} />
          </Switch>

        </div>
      </BrowserRouter>

    )
  }
}

export default App
