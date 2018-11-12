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
            pacValue: '',
            pacPrazo: '',

            sedexValue: '',
            sedexPrazo: '',
        };

        this.state.total = this.subTotal();
        Sessao.setSessionTotal(this.state.total);

        this.state.subtotal = this.subTotal();
    }

    change = entry => {
        this.setState({
            [entry.target.name]: entry.target.value
        });
        if(entry.target.name == "total"){
            Sessao.setSessionTotal(entry.target.value);
        }
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
            sum = this.state.subtotal + this.state.pacValue;
            freteValue = this.state.pacValue

        } else {
            sum = this.state.subtotal + this.state.sedexValue;
            freteValue = this.state.sedexValue
        }

        this.setState({
            total: sum,
            frete: freteValue,
        })
    }

    calcularFrete() {
        console.log('Frete query: ', this.state.cep);

        var targetUrl = `https://shielded-caverns-17296.herokuapp.com/frete`;

        return fetch(targetUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CEP: this.state.cep
            })
        }).then((response) => response.json())
      .then((responseJson) =>{

            console.log(responseJson.pacPrice)
            console.log(responseJson.pacTime)
            console.log(responseJson.sedexPrice)
            console.log(responseJson.sedexTime)

            this.setState ({

              pacValue: responseJson.pacPrice,
              pacPrazo: responseJson.pacTime,
              sedexValue: responseJson.sedexPrice,
              sedexPrazo: responseJson.sedexTime,
              showFrete: true,

            })
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

                    <FreteBox show={this.state.showFrete} setFrete={this.setFrete} pacValue={this.state.pacValue}
                              pacPrazo={this.state.pacPrazo} sedexValue={this.state.sedexValue} sedexPrazo={this.state.sedexPrazo}/>


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
                            {(total < 10000) ? <Link to='/pagamento'>
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
