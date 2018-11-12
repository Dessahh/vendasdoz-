import React from 'react'
import './Forms.css'
import { NavLink } from 'react-router-dom'


class AlterarSenha extends React.Component {

    constructor() {
        super();

        this.concluir = this.concluir.bind(this)
    }

    state = {
        senha: '',
        confirmsenha: '',
    }

    change = entry => {
        this.setState({
            [entry.target.name]: entry.target.value
        })
    };
    
    concluir = (input) => {
        input.preventDefault();
        this.props.concluir(this.state)
    }

    render () {
        return (
            <form className="form-style-8">
              <h3>Senha</h3>
                <input
                    type="password"
                    name="senha"
                    placeholder="Senha"
                    value={this.state.senha}
                    onChange={entry => this.change(entry)}
                />
                <br/>

                <h3>Confirmar Senha</h3>
                <input
                    type="password"
                    name="confirmsenha"
                    placeholder="Confirmar Senha"
                    value={this.state.confirmsenha}
                    onChange={entry => this.change(entry)}
                />
                <br/>
                <button className="button-style-8" onClick={input => this.concluir(input)}>Concluir altereção</button>
                </ form>
        )
    }
}

export default AlterarSenha