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

export default class PedidoDetailItem extends React.Component {
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
            {'Número do Pedido: ' + data[row.index].idProduto}
          </Typography>
          <Typography variant='h5' style={{ 'paddingBottom': '3px', 'paddingLeft': '3px' }}>
            {'Forma de pagamento: ' + data[row.index].quantidade}
          </Typography>
          <Typography variant='h5' style={{ 'paddingBottom': '3px', 'paddingLeft': '3px' }}>
            {'Forma de pagamento: ' + data[row.index].statusProduto}
          </Typography>
          <Typography variant='h5' style={{ 'paddingBottom': '3px', 'paddingLeft': '3px' }}>
            {'Valor Unitário: R$ ' + parseFloat(data[row.index].valorUnitario).toFixed(2)}
          </Typography>
          <Typography variant='h5' style={{ 'paddingBottom': '3px', 'paddingLeft': '3px' }}>
            {'Valor Total: R$ ' + parseFloat(data[row.index].valorSoma).toFixed(2)}
          </Typography>

        </CardContent>
      </div>
    </Card>
  }
}
