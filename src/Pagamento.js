import React from 'react'
import './Carrinho.css'
import './Pagamento.css'
import Sessao from './Sessao.js'
import ReactTable from 'react-table'
import FreteBox from './FreteBox.js'
import ProdutoItem from "./ProdutoItem"

export default class Pagamento extends React.Component {
  constructor () {
    super()
    this.columns = []
    this.products = []

    this.calcularFrete = this.calcularFrete.bind(this)
    this.pay = this.pay.bind(this)

  }

  state = {
      metodo: 'cartao',
      cep: '',
      cpf:'',
      valor: Sessao.getSessionTotal(),
      cnpj_site: '123321',
      data_emissao_pedido : new Date(),
      num_cartao : null,
      nome_cartao : null,
      cvv_cartao : null,
      data_vencimento_cartao : null,
      credito: null,
      num_parcelas: null,
      banco_gerador_boleto : "Banco do Brasil",
      data_vencimento_boleto : new Date(),
      endereco_fisico_site : "Rua Joaquim 123",
      nome_site : "Vendas do Zé",
      products: Sessao.getSessionShopCart()
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

  pay () {
      alert("Efetuando pagamento!");

      var url = 'http://pagamento.4pmv2bgufu.sa-east-1.elasticbeanstalk.com/servico/';
      var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
      var targetUrl = proxyUrl + url;
      var body = {
          cpf_comprador: this.state.cpf,
          valor_compra: this.state.valor,
          cnpj_site: this.state.cnpj_site,
          data_emissao_pedido: new Date()
      };
      var cardInfo;
      if(this.state.metodo == 'cartao'){
          targetUrl += 'pagamento_cartao';
          cardInfo = {
              num_cartao: this.state.num_cartao,
              nome_cartao: this.state.nome_cartao,
              cvv_cartao: this.state.cvv_cartao,
              data_vencimento_cartao: this.state.data_vencimento_cartao,
              credito: this.state.credito,
              num_parcelas: this.state.num_parcelas
          };
      } else { // boleto
          targetUrl += 'pagamento_boleto';
          cardInfo = {
              banco_gerador_boleto: this.state.banco_gerador_boleto,
              data_vencimento_boleto: this.state.data_vencimento_boleto,
              endereco_fisico_site: this.state.endereco_fisico_site

          };
      }
      for(var p in cardInfo) body[p] = cardInfo[p];

      var encodeCredentials = btoa('endereco:ZKUS7FGH');

      console.log('Initiating payment');

      return fetch(targetUrl, {
          method: 'POST',
          headers: {
          },
          body: JSON.stringify(body)
      }).then(function(response) {
          if (!response.ok) {
              alert("Erro no Pagamento!");
              return;
          }
          return response;
      }).then((responseJson) => {
              console.dir('ResponseJson: ' + responseJson);
              this.state.data = responseJson.pk_pedido;
              this.aumentaCredito();
              if(this.state.metodo == "boleto"){
                  alert("Boleto gerado com sucesso!\n codigo:" + responseJson.num_boleto);
              } else {
                  alert("Pagamento efetuado com sucesso!");
              }
              this.props.history.push('/');
      }).catch(function(error) {
          console.log(error);
      });
  }

    aumentaCredito () {

        var url = 'http://ec2-54-233-234-42.sa-east-1.compute.amazonaws.com:3000/api/v1/pagamento'
        var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        var targetUrl = proxyUrl + url;

        var formBody = [];
        var details = {
            cpf: this.state.cpf,
            valor: this.state.valor,
            loja: this.state.nome_site,
            pago: true,
        }
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        console.dir(formBody);
        console.log("formbody credito");
        console.log(formBody);
        return fetch(targetUrl, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody,
        })/*.then((response) => response.json())
            .then((responseJson) => {
                console.log('tentou registrar cred :');
                console.log(responseJson);
            })*/
    }

  removeFromCart(){
      alert("cannot remove from cart here!");
  }

  render () {

      this.columns = [ // Define Table Columns
          {
              Cell: (row) => {
                  return <ProdutoItem
                      dataSource={this.state.products}
                      row={row}
                      edit={false}
                      removeFromCart={this.removeFromCart}/>
              }
          }
      ];

    return (
        <div className='carrinho'>

            <div className="leftSide">

                <h2> Carrinho </h2>

                <ReactTable
                    loading={false}
                    data={this.state.products}
                    columns={this.columns}
                    pages={1}
                    pageSize={this.state.products.length === 0 ? 5 : this.state.products.length}
                    getTheadThProps={this.getTheadThProps}
                    getTdProps={this.getTheadThProps}
                    style={{'min-width': '700px'}}


                />

                <FreteBox show={this.state.showFrete} setFrete={this.setFrete} pacValue={this.state.pacValue}
                          pacPrazo={this.state.pacPrazo} sedexValue={this.state.sedexValue} sedexPrazo={this.state.sedexPrazo}/>

        </div>

	    <div className="infoPedido">
            <h3>Detalhes do Pagamento</h3>

            <label>CPF</label>
            <input
                type = "cpf"
                name = "cpf"
                placeholder = "CPF"
                value = {this.state.cpf}
                onChange = { entry => this.change(entry) }
            /><br/>

            <label>Valor</label>
            <label>{'R$ ' + parseFloat(this.state.valor).toFixed(2)}
            </label><br/>

            <label>Cartão ou Boleto?</label>
            <select
                type = "metodo"
                name = "metodo"
                value = {this.state.metodo}
                onChange = { entry => this.change(entry) }
            >
                <option value='cartao'>Cartão
                </option>
                <option value='boleto'>Boleto
                </option>
            </select><br/>

            {this.state.metodo=='cartao' && <div>
                <label >Número Cartão</label>
                <input
                    type = "num_cartao"
                    name = "num_cartao"
                    placeholder = "0000.0000.0000.0000"
                    value = {this.state.num_cartao}
                    onChange = { entry => this.change(entry) }
                /><br/>

                <label>Nome Cartão</label>
                <input
                    type = "nome_cartao"
                    name = "nome_cartao"
                    placeholder = "Joao da Silva"
                    value = {this.state.nome_cartao}
                    onChange = { entry => this.change(entry) }
                /><br/>

                <label>CVV do cartão</label>
                <input
                    type = "cvv_cartao"
                    name = "cvv_cartao"
                    placeholder = "CVV"
                    value = {this.state.cvv_cartao}
                    onChange = { entry => this.change(entry) }
                /><br/>

                <label>Data de Vencimento do Cartão</label>
                <input
                    type = "data_vencimento_cartao"
                    name = "data_vencimento_cartao"
                    placeholder = "MM/AAAA"
                    value = {this.state.data_vencimento_cartao}
                    onChange = { entry => this.change(entry) }
                /><br/>

                <label>Crédito ou débito</label>
                <input
                    type = "credito"
                    name = "credito"
                    placeholder = "Credito"
                    value = {this.state.credito}
                    onChange = { entry => this.change(entry) }
                /><br/>

                <label>Números de Parcelas</label>
                <input
                    type = "parcelas"
                    name = "parcelas"
                    placeholder = "10"
                    max="12"
                    value = {this.state.num_parcelas}
                    onChange = { entry => this.change(entry) }
                /><br/>
            </div>
            }

            <button className="payButton" onClick={this.pay}>Pagar</button>
        </div>
      </div>
    )
  }
}
