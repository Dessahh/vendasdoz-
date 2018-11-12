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
import ViewButom from '@material-ui/icons/RemoveRedEye'
import { Link } from 'react-router-dom'

export default class PedidoItem extends React.Component {
  constructor () {
    super()

    this.state = {
      data: []
    }
  }

  render () {
    const data = this.props.data
    const row = this.props.row
    const edit = this.props.edit

    // Data - numpedido, val

    return <Card style={{ 'display': 'flex', 'padding': '10px' }}>

      <div>
        <CardContent>
          <Typography component='h5' variant='h5'
            style={{ 'paddingTop': '3px', 'paddingLeft': '3px' }}>
            {'Número do Pedido: ' + data[row.index].id}
          </Typography>
          <Typography variant='h5' style={{ 'paddingBottom': '3px', 'paddingLeft': '3px' }}>
            {'Forma de pagamento: ' + data[row.index].formaPagamento}
          </Typography>
          <Typography variant='h5' style={{ 'paddingBottom': '3px', 'paddingLeft': '3px' }}>
            {'Prazo de entrega: ' + data[row.index].prazoEntrega + ' dias'}
          </Typography>
          <Typography variant='h5' style={{ 'paddingBottom': '3px', 'paddingLeft': '3px' }}>
            {'Subtotal: R$ ' + parseFloat(data[row.index].valorProdutos).toFixed(2)}
          </Typography>
          <Typography variant='h5' style={{ 'paddingBottom': '3px', 'paddingLeft': '3px' }}>
            {'Frete: R$ ' + parseFloat(data[row.index].freteTotal).toFixed(2)}
          </Typography>
          <Typography variant='h5' style={{ 'paddingBottom': '3px', 'paddingLeft': '3px' }}>
            {'Total: R$ ' + parseFloat(data[row.index].valorTotal).toFixed(2)}
          </Typography>

          <Typography variant='h5' style={{ 'paddingBottom': '3px', 'paddingLeft': '3px' }}>
            {'Status: ' + data[row.index].statusPedido}
          </Typography>

          <Link
            to={{
              pathname: '/pedidoDetail',
              idpedido: data[row.index].id
            }}>
            Ver Pedido
          </Link>

        </CardContent>
      </div>
    </Card>
  }
}
