import CardMedia from '@material-ui/core/CardMedia/CardMedia'
import CardContent from '@material-ui/core/CardContent/CardContent'
import Typography from '@material-ui/core/Typography/Typography'
import FormControl from '@material-ui/core/FormControl/FormControl'
import Select from '@material-ui/core/Select/Select'
import MenuItem from '@material-ui/core/MenuItem/MenuItem'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Card from '@material-ui/core/Card/Card'
import React from 'react'
import Sessao from './Sessao'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import DeleteIcon from '@material-ui/icons/Delete'

export default class ProdutoItem extends React.Component {
  constructor () {
    super()

    this.state = {
      data: []
    }

    this.removeFromCart = this.removeFromCart.bind(this)
  }

  selectQuantity (event, index) {
    this.props.dataSource[index].cartQuantity = event.target.value
    this.setState({ [event.target.name]: event.target.value })
  }

  addToCart (rowIndex) {
    if (this.props.dataSource[rowIndex].cartQuantity === 0) {
      return
    }

    Sessao.addProductToShopCart(this.props.dataSource[rowIndex])
    console.log(`Added ${this.props.dataSource[rowIndex].cartQuantity} ${this.props.dataSource[rowIndex].description} to cart`)
    if (this.props.dataSource[rowIndex].cartQuantity === 1) {
      this.props.showModal('Produto adicionado ao carrinho')
    } else {
      this.props.showModal('Produtos adicionados ao carrinho')
    }
  }

  removeFromCart (rowIndex) {
    Sessao.removeProductFromShopCart(this.props.dataSource[rowIndex])
    console.log(`Removed ${this.props.dataSource[rowIndex].description} from cart`)

    this.props.removeFromCart()
  }

  render () {
    const data = this.props.dataSource
    const row = this.props.row
    const edit = this.props.edit

    return <Card style={{ 'display': 'flex', 'padding': '10px' }}>
      <CardMedia
        component='img'
        image={data[row.index].images[0] ? data[row.index].images[0].url : null}
        height='140'
        style={{ 'width': 'initial' }} />
      <div>
        <CardContent>
          <Typography component='h5' variant='h5'
            style={{ 'paddingTop': '3px', 'paddingLeft': '3px' }}>
            {data[row.index].description}
          </Typography>
          <Typography variant='h5' style={{ 'paddingBottom': '3px', 'paddingLeft': '3px' }}>
            {'R$ ' + parseFloat(data[row.index].value).toFixed(2)}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'
            style={{ 'paddingTop': '3px', 'paddingLeft': '3px' }}>
                        Fabricante: {data[row.index].manufacturer}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary' style={{ 'paddingLeft': '3px' }}>
                        Categoria: {data[row.index].category}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'
            style={{ 'paddingBottom': '3px', 'paddingLeft': '3px' }}>
                        Quantidade em estoque: {data[row.index].quantityInStock}
          </Typography>
          {edit && (
            <div>
              <FormControl style={{
                'margin': 'theme.spacing.unit',
                'minWidth': '60px'
              }}>
                <Select
                  value={data[row.index].cartQuantity}
                  name='quantity'
                  onChange={(event) => this.selectQuantity(event, row.index)}
                  style={{ 'marginTop': 'theme.spacing.unit * 2' }}
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

              <IconButton color='primary' aria-label='Adicionar ao carrinho'
                onClick={() => this.addToCart(row.index)}>
                <AddShoppingCartIcon />
              </IconButton>
            </div>
          )}
          {!edit && (
            <div>
              <Typography component='h5' variant='h5'
                style={{ 'paddingTop': '3px', 'paddingLeft': '3px' }}>
                                Quantidade: {data[row.index].cartQuantity}
              </Typography>
              <IconButton aria-label='Delete' color='primary'
                onClick={() => this.removeFromCart(row.index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          )
          }
        </CardContent>
      </div>
    </Card>
  }
}
