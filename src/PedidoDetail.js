import React from 'react'
import './Pedidos.css'
import './App.css'
import ReactTable from 'react-table'
import Sessao from './Sessao'
import PedidoDetailItem from './PedidoDetailItem'
import Link from 'react-router-dom/es/Link'

export default class Pedidos extends React.Component {
  constructor () {
    super()
    this.idPedido = ''
    this.columns = []
    this.state = {
      data: []

    }
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
