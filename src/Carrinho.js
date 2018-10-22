import React from 'react'
import './Carrinho.css'
import ReactTable from 'react-table'
import Sessao from "./Sessao";

export default class Carrinho extends React.Component {
    constructor() {
        super();
        this.columns = [];
        this.products = Sessao.getSessionShopCart();

        this.calcularFrete = this.calcularFrete.bind(this)

    }

    state = {
        cep: '',
    };

    change = entry => {
        this.setState({
            [entry.target.name]: entry.target.value
        })
    };

    getTheadThProps(state, rowInfo, column, instance) {
        return {
            style: {
                color: 'white'
            }
        }
    }

    calcularFrete() {
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

    render() {

        this.columns = [
            {
                Header: 'Image',
                Cell: (row) => {
                    return <div><img height={60} src={row.imageURLs ? row.imageURLs[0] : null}/></div>
                },
                accessor: 'images',
                id: 'image'
            },
            {Header: 'Produto', accessor: 'description', width: 400},
            {Header: 'Quantidade', accessor: 'cartQuantity', width: 100},
            {
                Header: 'Preço',
                Cell: (row) => {
                    return 'R$ ' + parseFloat(row.value).toFixed(2)
                },
                accessor: 'value',
                width: 100
            }

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
                        type="number"
                        name="cep"
                        placeholder="CEP"
                        value={this.state.cep}
                        onChange={entry => this.change(entry)}
                    />
                    <button onClick={this.calcularFrete}>Calcular Frete</button>

                </div>

                <div className="resumoPedido">
                    <h3>Resumo do Pedido</h3>
                    <a href="../pagamento">Pagar</a>
                </div>
            </div>
        )
    }
}
