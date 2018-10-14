import React from 'react'
import './Menu.css'
import './App.css'

const items = [
  { divider: true, label: 'Categorias', value: 'main-nav' },
  { label: 'Games', value: 'item1' },
  { label: 'Informática',
    value: 'item2',
    children: [
      { label: 'Notebook', value: 'item2.1' },
     	{ label: 'Celular', value: 'item2.2' }
    ] },
  { label: 'Eletrodomésticos', value: 'item3' }]



export default class Menu extends React.Component {

	teste = () => {
  		console.log('click')
	}

  render () {
    	return (
      
        <div className='sideBar'>
          <h4>Categorias</h4>
          <button onClick={this.teste}>Eletrodomésticos</button>
          <button onClick={this.teste}>Informática</button>
          <button onClick={this.teste}>Móveis</button>

          <h4>Preço</h4>
          <button onClick={this.confirm}>R$ 0,00 - R$ 100,00</button>
          <button onClick={this.confirm}>R$ 100,00 - R$ 200,00</button>
          <button onClick={this.confirm}>R$ 200,00 - R$ 300,00</button>
          <button onClick={this.confirm}>A partir de R$ 300,00</button>
        </div>


     
    )
  }
}
