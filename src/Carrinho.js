import React from 'react'
import './Carrinho.css'
import ReactTable from 'react-table'
import FreteBox from './FreteBox.js'
import Sessao from "./Sessao";
import ProdutoItem from "./ProdutoItem";
import Link from "react-router-dom/es/Link";

export default class Carrinho extends React.Component {
    constructor() {
        super();
        this.columns = [];

        this.pacValue = 10;
        this.pacPrazo = 5;

        this.sedexValue = 25;
        this.sedexPrazo = 3;
        this.userscore = 400;

        this.calcularSubTotal = this.calcularSubTotal.bind(this);
        this.calcularFrete = this.calcularFrete.bind(this);
        this.setFrete = this.setFrete.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);

        this.state = {
            cep: '',
            showFrete: false,
            frete: 0.00,
            total: 0.00,
            subtotal: 0.00,
            products: Sessao.getSessionShopCart(),
        };

        this.state.total = this.subTotal();
        this.state.subtotal = this.subTotal();
    }

    change = entry => {
        this.setState({
            [entry.target.name]: entry.target.value
        })
    };

    showFrete() {
        this.setState({
            showFrete: true
        });
    }

    setFrete(pacBool) {

        var sum = null;
        var freteValue = null;

        if (!pacBool) {
            sum = this.state.subtotal + this.pacValue;
            freteValue = this.pacValue

        } else {
            sum = this.state.subtotal + this.sedexValue;
            freteValue = this.sedexValue
        }

        this.setState({
            total: sum,
            frete: freteValue,
        })
    }

    calcularFrete() {
        console.log('Frete query: ', this.state.cep);

        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        var targetUrl = `https://frete-grupo06.herokuapp.com/search`;

        targetUrl = proxyUrl + targetUrl;

        return fetch(targetUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
                cep: this.state.cep
            })
        }).then((response) => {

            console.log(response)
            /// TODO: Quando o módulo estiver funcionando
            /// Setar os valores de pacValue, pacPrazo, sedexValue e sedexPrazo
            /// Chamar calcularFrete ou setar showFrete pra true aqui msm


        })
    }

    calcularSubTotal() {
        let subtotal = this.subTotal();

        const total = subtotal + this.state.frete;

        this.setState({
            subtotal: subtotal,
            total: total
        }, () => {
            console.log("Preco atualizado");
        });
    }

    subTotal() {
        let subtotal = 0;

        for (let p in this.state.products) {
            subtotal += this.state.products[p].value * this.state.products[p].cartQuantity;
        }

        return subtotal;
    }

    removeFromCart() {
        this.setState({products: Sessao.getSessionShopCart()}, () => {
            this.calcularSubTotal();
        });
    }

    getTheadThProps(state, rowInfo, column, instance) {
        return {
            style: {
                color: 'white'
            }
        }
    }

    render() {

        const {subtotal, frete, total, products} = this.state;

        this.columns = [ // Define Table Columns
            {
                Cell: (row) => {
                    return <ProdutoItem
                        dataSource={products}
                        row={row}
                        edit={false}
                        removeFromCart={this.removeFromCart}/>
                }
            }
        ];

        if(Sessao.getSessionUser()){
            this.userscore = Sessao.getUserScore();
        }

        console.log('carrinho userscore: ' + this.userscore);


        return (
            <div className='carrinho'>

                <div className="leftSide">

                    <h2> Carrinho </h2>

                    <ReactTable
                        loading={false}
                        data={products}
                        columns={this.columns}
                        pages={1}
                        pageSize={products.length === 0 ? 5 : products.length}
                        getTheadThProps={this.getTheadThProps}
                        getTdProps={this.getTheadThProps}
                        style={{'min-width': '700px'}}


                    />

                    <FreteBox show={this.state.showFrete} setFrete={this.setFrete} pacValue={this.pacValue}
                              pacPrazo={this.pacPrazo} sedexValue={this.sedexValue} sedexPrazo={this.sedexPrazo}/>


                </div>

                <div style={{'display': 'grid', 'padding-left': '20px'}}>
                    <div className="resumoPedido">
                        <h3>Resumo do Pedido</h3>
                        <div className="horizontalLayout">
                            <p className="leftSide">Subtotal</p>
                            <p className="rightSide">{'R$ ' + parseFloat(subtotal).toFixed(2)}</p>
                        </div>
                        <div className="horizontalLayout">
                            <p className="leftSide">Frete</p>
                            <p className="rightSide">{'R$ ' + parseFloat(frete).toFixed(2)}</p>
                        </div>

                        <div className="line"></div>
                        <div className="horizontalLayout">
                            <h4 className="leftSide">Total</h4>
                            <h4 className="rightSide">{'R$ ' + parseFloat(total).toFixed(2)}</h4>
                        </div>
                        <button>
                            {(total < 3500 || this.userscore >= 600) ? <Link to='/pagamento'>
                                Continuar
                            </Link> : 'Seu crédito está baixo demais' }
                        </button>

                    </div>

                    <div className="calcularFrete" style={{}}>

                        <input
                            type="number"
                            name="cep"
                            placeholder="CEP"
                            value={this.state.cep}
                            onChange={entry => this.change(entry)}
                        />
                        <button onClick={this.calcularFrete}>Calcular Frete</button>

                    </div>
                </div>
            </div>
        )
    }
}
