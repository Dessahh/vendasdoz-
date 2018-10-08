import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import logo from './logo2.png'
import './App.css'

import Cadastro from './Cadastro.js'
import Consulta from './Consulta.js'
import Login from './Login.js'
import Error from './Error.js'

class App extends Component {
  render () {
    return (

      <BrowserRouter>
        <Switch>
          <Route path='/consulta' component={Consulta} />
          <Route path='/cadastro' component={Cadastro} />
          <Route path='/login' component={Login} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>

    )
  }
}

export default App
