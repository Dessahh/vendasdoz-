import React from 'react'
import './Menu.css'
import './App.css'


export default class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.categorys = []

    }

    componentDidMount () {

        var targetUrl = `http://ec2-18-218-218-216.us-east-2.compute.amazonaws.com:8080/api/products?searchType=${null}&searchString=${null}&page=0&itemsPerPage=100`

        var encodeCredentials = btoa('endereco:ZKUS7FGH');

        console.log('Initiating category search');

        return fetch(targetUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + encodeCredentials
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                
                
                for (var json in responseJson.content) {
                    
                    var category = responseJson.content[json].category
                    
                    if(this.categorys.indexOf(category) === -1){
                         this.categorys.push(category)
                    }
                      
                }

                console.log("Categorias: ", this.categorys)  
               
            })
    };

    capitalize(text) {
        return text.slice(0,1).toUpperCase() + text.slice(1, text.length).toLowerCase()
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

    categoryFilter = (category) => {
        console.log("1: ", category)
        this.props.categoryFilter(category)
    }

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
                    {this.categorys.map((category, index) =>
                        <button key={index} onClick={() => this.categoryFilter(category)}>{this.capitalize(category)}</button>
                    )}

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
