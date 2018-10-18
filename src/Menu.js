import React from 'react'
import './Menu.css'
import './App.css'

const items = [
    {divider: true, label: 'Categorias', value: 'main-nav'},
    {label: 'Games', value: 'item1'},
    {
        label: 'Informática',
        value: 'item2',
        children: [
            {label: 'Notebook', value: 'item2.1'},
            {label: 'Celular', value: 'item2.2'}
        ]
    },
    {label: 'Eletrodomésticos', value: 'item3'}];


//TODO: ec2-18-218-218-216.us-east-2.compute.amazonaws.com:8080/api/products/categories
export default class Menu extends React.Component {

    constructor(props) {
        super(props);
    }

    eletroFilter = () => {
        this.props.categoryFilter('ELETRODOMESTICO');
    };

    techFilter = () => {
        this.props.categoryFilter('INFORMATICA');
    };

    moveisFilter = () => {
        this.props.categoryFilter('MOVEIS');
    };

    lowPrice = () => {
        this.props.priceFilter(0.00, 100.00);
    };

    mediumPrice = () => {
        this.props.priceFilter(100.00, 200.00);
    };

    highPrice = () => {
        this.props.priceFilter(200.00, 300.00);
    };

    unlimitedPrice = () => {
        this.props.priceFilter(300.00, 100000.00);
    };

    render() {
        return (

            <div className='sideBar'>
                <h4>Categorias</h4>
                <button onClick={this.eletroFilter}>Eletrodomésticos</button>
                <button onClick={this.techFilter}>Informática</button>
                <button onClick={this.moveisFilter}>Móveis</button>

                <h4>Preço</h4>
                <button onClick={this.lowPrice}>R$ 0,00 - R$ 100,00</button>
                <button onClick={this.mediumPrice}>R$ 100,00 - R$ 200,00</button>
                <button onClick={this.highPrice}>R$ 200,00 - R$ 300,00</button>
                <button onClick={this.unlimitedPrice}>A partir de R$ 300,00</button>
                <h4/>
                <button onClick={this.props.clearFilters}>Limpar Filtros</button>
            </div>


        )
    }
}
