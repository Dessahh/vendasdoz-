import React from 'react'
import './PedidoDetail.css'
import './App.css'
import ReactTable from 'react-table'
import Sessao from './Sessao'
import PedidoDetailItem from './PedidoDetailItem'
import Link from 'react-router-dom/es/Link'

export default class Pedidos extends React.Component {
  constructor () {
    super()
    this.columns = []
    this.state = {
      data: [],
      idpedido: ''
    }
  }

  getTheadThProps (state, rowInfo, column, instance) {
    return {
      style: {
        color: 'white'
      }
    }
  }

  componentDidMount () {
    const { idpedido } = this.props.location
    console.log('Component')
    console.log(idpedido)
    this.setState({
      idpedido: idpedido
    })

    this.fetchPedido(idpedido)
  }

  fetchPedido (idpedido) {
    console.log('Fetching Pedido Detail')

    var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    var url = `http://wsendereco.tk/site/produtospedido/id/${idpedido}`

    let targetUrl = proxyUrl + url

    return fetch(targetUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        var produtos = []

        for (var i = 0; i < responseJson.length; i++) {
          produtos.push(responseJson[i])
        }

        console.log(produtos)

        this.setState({
          data: produtos
        })
      })
  }

  render () {
    const { data } = this.state

    this.columns = [ // Define Table Columns
      {
        Cell: (row) => {
          return <PedidoDetailItem
            data={data}
            row={row}
            orderClicked={this.orderClicked}
            edit />
        }
      }
    ]

    return (

      <div className='App-body'>
        <h2 className='title'> Pedido {this.state.idpedido} </h2>
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
