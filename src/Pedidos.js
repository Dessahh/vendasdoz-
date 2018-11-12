import React from 'react'
import './App.css'
import ReactTable from 'react-table'
import Sessao from './Sessao'
import PedidoItem from './PedidoItem'
import Link from 'react-router-dom/es/Link'

export default class Pedidos extends React.Component {
  constructor () {
    super()

    this.columns = []
    this.state = {
      data: []

    }

    this.fetchPedidos = this.fetchPedidos.bind(this)
  }

  componentDidMount () {
    // only update chart if the data has changed
    console.log('Pedido Component did mount.')
    this.fetchPedidos()
  }

  fetchPedidos () {
    console.log('Fetching Pedidos')

    var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    var url = `http://wsendereco.tk/site/pedidos/id/66666666666`

    let targetUrl = proxyUrl + url

    return fetch(targetUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        var pedidos = []

        for (var i = 0; i < responseJson.length; i++) {
          pedidos.push(responseJson[i])
        }

        this.setState({
          data: pedidos
        })
      })
  }

  getTheadThProps (state, rowInfo, column, instance) {
    return {
      style: {
        color: 'white'
      }
    }
  }

  render () {
    const { data } = this.state

    this.columns = [ // Define Table Columns
      {
        Cell: (row) => {
          return <PedidoItem
            data={data}
            row={row}
            orderClicked={this.orderClicked}
            edit />
        }
      }
    ]

    return (

      <div className='App-body'>

        <ReactTable
          loading={false}
          data={data}
          columns={this.columns}
          pages={1}
          pageSize={5}
          getTheadThProps={this.getTheadThProps}
          getTdProps={this.getTheadThProps}

        />

      </div>
    )
  }
}
