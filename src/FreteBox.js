import React from 'react'
import './Carrinho.css'

class FreteBox extends React.Component {

  constructor () {
    super()
    
    this.pacClicked = this.pacClicked.bind(this)
    this.sedexClicked = this.sedexClicked.bind(this)

  }


  state = {
    pac: false,
    sedex: false,
  }
  
  pacClicked = () => {
    if(!this.state.pac){
      this.setState ({
        pac: true,
        sedex: false,
      })

      this.props.setFrete(this.state.pac) 
    }

    
  }

  sedexClicked = () => {
    if(!this.state.sedex){
      this.setState ({
        pac: false,
        sedex: true,
      })

      this.props.setFrete(this.state.pac) 
    }

    
  }

  render () {

    if (!this.props.show) {
      return null
    }
    return (
      <div className="fretes">
        

      <div className="horizontalLayout"> 
        <input 
          type="checkbox"
          className="leftSide"
            checked={this.state.pac}
            onChange={this.pacClicked}
          />
        
        <p className="leftSide"> PAC: R${this.props.pacValue} entrega em {this.props.pacPrazo} dias</p>
      </div>

      <div className="horizontalLayout"> 
        <input 
          type="checkbox"
          className="leftSide"
            checked={this.state.sedex}
            onChange={this.sedexClicked}
          />
        <p className="leftSide"> Sedex: R${this.props.sedexValue} entrega em {this.props.sedexPrazo} dias</p>
      </div>
    </div>
    )
  }
}

export default FreteBox