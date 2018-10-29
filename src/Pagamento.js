import React from 'react'
import './Carrinho.css'
import Sessao from './Sessao.js'
import ReactTable from 'react-table'

export default class Pagamento extends React.Component {
  constructor () {
    super()
    this.columns = []
    this.products = []

    this.calcularFrete = this.calcularFrete.bind(this)

  }

  state = {
	  	cep: '',
	}

  change = entry => {
		this.setState({
			[entry.target.name]: entry.target.value
		})
	}

  getTheadThProps (state, rowInfo, column, instance) {
    return {
      style: {
        color: 'white'
      }
    }
  }

  calcularFrete () {
    console.log('Frete query: ', this.state.cep)

    var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    var targetUrl = `https://shielded-caverns-17296.herokuapp.com/search`

    targetUrl = proxyUrl + targetUrl

    return fetch(targetUrl, {
      method: 'POST',
	      headers: {
	        Accept: 'application/json',
	        'Content-Type': 'application/x-www-form-urlencoded'
	      },
	      body: JSON.stringify({
	        CEP: this.state.cep
	      })
    }).then((response) => response.json())
      .then((responseJson) => {
        const keys = Object.keys(responseJson)
        console.log(keys[0])
        console.log(responseJson.response)
      })
  }

    aumentaCredito = input => {

        var url = 'http://ec2-54-233-234-42.sa-east-1.compute.amazonaws.com:3000/api/v1/pagamento'
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        var targetUrl = proxyUrl + url;


        return fetch(targetUrl, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-formurlencoded',
            },
            form: {
                cpf: Sessao.CPF_KEY,
                valor: 9000,
                loja: 'Vendas do Zé'
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log('tentou registrar cred :');
                console.log(responseJson);
            })
    }

  render () {

  	this.columns = [
	  	{
	        Header: 'Image',
	        Cell: (row) => {
	          return <div><img height={60} src={row.imageURLs ? row.imageURLs[0] : null} /></div>
	        },
	        accessor: 'images',
	        id: 'image'
	      },
      { Header: 'Produto', accessor: 'description', width: 400 },
      { Header: 'Quantidade', accessor: 'quantity', width: 100 },
      { Header: 'Preço',
        Cell: (row) => {
          return 'R$ ' + parseFloat(row.value).toFixed(2)
        },
        accessor: 'value',
        width: 100 }

    ]

    return (
      <div className='carrinho'>

      	<div className="leftSide">

	        <h2> Carrinho </h2>

	        <ReactTable
	          loading={false}
	          data={this.products}
	          columns={this.columns}
	          pages={1}
	          getTheadThProps={this.getTheadThProps}
	          getTdProps={this.getTheadThProps}

	        />

	        <input 
	            type = "number"
	            name = "cep"
	            placeholder = "CEP" 
	            value = {this.state.cep}  
	            onChange = { entry => this.change(entry) } 
	        />
	        <button onClick={this.calcularFrete}>Calcular Frete</button>

	    </div>

	    <div className="resumoPedido">
            <h3>Detalhes do Pagamento</h3>


	    </div>
      </div>
    )
  }
}
