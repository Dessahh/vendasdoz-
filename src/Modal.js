import React, { Component } from 'react'
import './Modal.css';
import './Forms/Forms.css';

class Modal extends Component {
  
  onClose = (e) => {
  		this.props.onClose && this.props.onClose(e);
  }

  render () {

  	if (!this.props.show) {
  		return null
  	}
    return (
      <div className="Modal">
        
	      <div className="Modal-Box">
	      	{this.props.children}
	      	<br />
	      	<button className="form-style-8"  onClick={(e) => {this.onClose(e)}} >
	      		Fechar
	      	</button>
	      </div>

	 </div>
    )
  }
}

export default Modal
