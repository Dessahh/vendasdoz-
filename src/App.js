import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import logo from './logo2.png'
import './App.css'
import 'react-table/react-table.css'

import Cadastro from './Cadastro.js'
import Consulta from './Consulta.js'
import Produto from './Produto.js'
import Error from './Error.js'

class App extends Component {
  render () {
    return (

      <BrowserRouter>
        <Switch>
          <Route path='/consulta' component={Consulta} />
          <Route path='/cadastro' component={Cadastro} />
          <Route path='/produto' component={Produto} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>

    )
  }
}

export default App
