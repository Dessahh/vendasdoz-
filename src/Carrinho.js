import React from 'react'
import './Carrinho.css'
import ReactTable from 'react-table'
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FreteBox from './FreteBox.js'
import Sessao from "./Sessao";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import Renew from '@material-ui/icons/Autorenew';
import MenuItem from '@material-ui/core/MenuItem';


export default class Carrinho extends React.Component {
    constructor() {
        super();
        this.columns = [];
        this.products = Sessao.getSessionShopCart();

        this.pacValue = 10
        this.pacPrazo = 5

        this.sedexValue = 25
        this.sedexPrazo = 3
        
        this.calcularFrete = this.calcularFrete.bind(this)
        this.setFrete = this.setFrete.bind(this)
        this.updateTotalValue = this.updateTotalValue.bind(this)
        

    }

  state = {
      cep: '',
      showFrete: false,
      frete: 0,
      total: 0,
      subtotal: 0,
  }

  change = entry => {
    this.setState({
      [entry.target.name]: entry.target.value
    })
  }

  componentDidMount() {
    this.updateTotalValue()
    
  }

  updateTotalValue () {
      var subTotalValue = 0

      for (var i in this.products) {
        subTotalValue = subTotalValue + (this.products[i].cartQuantity * this.products[i].value)
      }

      this.setState({
          subtotal: subTotalValue,
          total: subTotalValue,
      })
  }

  getTheadThProps (state, rowInfo, column, instance) {
    return {
      style: {
        color: 'white'
      }
    }
  }

  cF () {
      this.setState({
          showFrete: true
        })
  }

  setFrete (pacBool) {

    var sum = null
    var freteValue = null

    if (!pacBool) {
      sum = this.state.subtotal + this.pacValue
      freteValue = this.pacValue
      
    } else {
      sum = this.state.subtotal + this.sedexValue
      freteValue = this.sedexValue
    }

    this.setState ({
      total: sum,
      frete: freteValue,
    })
  }

  calcularFrete () {
    console.log('Frete query: ', this.state.cep)

    var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    var targetUrl = `https://frete-grupo06.herokuapp.com/search`

        targetUrl = proxyUrl + targetUrl

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

  updateQuantity (index) {
    console.log(this.products[index].cartQuantity)
    this.updateTotalValue()


  }

  selectQuantity(event, index) {
        this.products[index].cartQuantity = event.target.value;
        this.setState({ [event.target.name]: event.target.value });
  }

    render() {

        var colunas = [
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

      var data = this.products

      this.columns = [ // Define Table Columns
            {
                Cell: (row) => {
                    return <Card style={{'display': 'flex', 'padding': '10px'}}>
                        <CardMedia
                            component="img"
                            image={data[row.index].images[0] ? data[row.index].images[0].url : null}
                            height='140'
                            style={{'width': 'initial'}}/>
                        <div>
                            <CardContent>
                                <Typography component="h5" variant="h5"
                                            style={{'paddingTop': '3px', 'paddingLeft': '3px'}}>
                                    {data[row.index].description}
                                </Typography>
                                <Typography variant="h5" style={{'paddingBottom': '3px', 'paddingLeft': '3px'}}>
                                    {'R$ ' + parseFloat(data[row.index].value).toFixed(2)}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary"
                                            style={{'paddingTop': '3px', 'paddingLeft': '3px'}}>
                                    Fabricante: {data[row.index].manufacturer}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" style={{'paddingLeft': '3px'}}>
                                    Categoria: {data[row.index].type}
                                </Typography>


                                <FormControl style={{
                                    'margin': 'theme.spacing.unit',
                                    'minWidth': '60px'

                                }}>

                                    <Select
                                        value={this.products[row.index].cartQuantity}
                                        name="quantity"
                                        onChange={(event) => this.selectQuantity(event, row.index,)}
                                        style={{
                                          'marginTop': 'theme.spacing.unit * 2',
                                        }}
                                    >
                                        <MenuItem value={0}>
                                            <em>0</em>
                                        </MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                    </Select>
                                </FormControl>
                                <IconButton color="primary" aria-label="Atualizar Quantidade" onClick={() => this.updateQuantity(row.index)}>
                                    <Renew/>
                                </IconButton>
                                
                                
                            </CardContent>
                        </div>
                        <div>

                        </div>
                    </Card>
                },
                id: 'images'
            }
        ];

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

          <div className="calcularFrete">

            <input 
                type = "number"
                name = "cep"
                placeholder = "CEP" 
                value = {this.state.cep}  
                onChange = { entry => this.change(entry) } 
            />
            <button onClick={this.calcularFrete}>Calcular Frete</button>

            
        </div>

       <FreteBox show={this.state.showFrete} setFrete={this.setFrete} pacValue={this.pacValue} pacPrazo={this.pacPrazo} sedexValue={this.sedexValue} sedexPrazo={this.sedexPrazo}/>

        

      </div>

      <div className="resumoPedido">
        <h3>Resumo do Pedido</h3>
        <div className="horizontalLayout">
          <p className="leftSide">Subtotal</p>
          <p className="rightSide">{'R$ ' + parseFloat(this.state.subtotal).toFixed(2)}</p>
        </div>
        <div className="horizontalLayout">
          <p className="leftSide">Frete</p>
          <p className="rightSide">{'R$ ' + parseFloat(this.state.frete).toFixed(2)}</p>
        </div>

        <div className="line"></div>
        <div className="horizontalLayout">
          <h4 className="leftSide">Total</h4>
          <h4 className="rightSide">{'R$ ' + parseFloat(this.state.total).toFixed(2)}</h4>
        </div>
        <button href="../pagamento">Continuar</button>
            
      </div>
      </div>
    )
  }
}
