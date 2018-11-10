import React from 'react'
import './Menu.css'
import './App.css'


//TODO: ec2-18-218-218-216.us-east-2.compute.amazonaws.com:8080/api/products/categories
export default class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.categorys = []
        this.buttonStyles = []
        
        
    }

    state = {
        min: 0.00,
        max: 100000.00,
        nameQuery: "",
        showPromo: false,
    };

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
                    
                    var category = responseJson.content[json].category;
                    
                    if(this.categorys.indexOf(category) === -1){
                         this.categorys.push(category);
                         this.buttonStyles.push("unclicked")  
                    }
                      
                }
 
               
            })
    };

    capitalize(text) {
        return text.slice(0,1).toUpperCase() + text.slice(1, text.length).toLowerCase()
    }

    categoryFilter = (category, index) => {

        if(this.buttonStyles[index] === "unclicked"){
            for( let i = 0; i < this.buttonStyles.length; i++ ){
                this.buttonStyles[i] = "unclicked"
            }
            this.buttonStyles[index] = "clicked"
            this.props.categoryFilter(category)
        } else {
            
            this.buttonStyles[index] = "unclicked"
            this.clearFilters()
        }
        
    };

    change = entry => {
        this.setState({
            [entry.target.name]: entry.target.value
        })
    };

    nameFilter = query => {
        if(query !== ""){
            this.props.nameFilter(query)
        } else {
            this.clearFilters();
        }
    };

    filterPrice = input => {
        input.preventDefault()
        console.log(this.state.min);
        this.props.priceFilter(this.state.min, this.state.max)
    };

    filterPromo = input => {
        input.preventDefault()
        console.log(this.state.showPromo);
        this.props.promoFilter(this.state.showPromo)
    }

    clearFilters = () => {
        for( let i = 0; i < this.buttonStyles.length; i++ ){
                this.buttonStyles[i] = "unclicked"
        }
        this.setState({
            min: 0.00,
            max: 100000.00,
            showPromo: false,
        });
        this.props.clearFilters()
    };

    promoChecked = () => {

        if (this.state.showPromo === false) {
            this.setState ({
                showPromo: true,
            })
        } else {
            this.setState ({
                showPromo: false,
            })
        }
        
        this.props.promoFilter(!this.state.showPromo)
    }

    render() {
        return (


            <div className='sideBar'>
                <div>
                    <h4>Busca</h4>
                    <div className="back">
                        <div className="price" >
                            <p >Nome</p>
                            <input
                                type = "nameQuery"
                                name = "nameQuery"
                                placeholder = ""
                                value = {this.state.nameQuery}
                                onChange = { entry => {this.change(entry); this.nameFilter(entry.target.value); } }
                            />
                        </div>
                         <div className="price" >
                            <input 
                              type="checkbox"
                              className="tag"
                                checked={this.state.showPromo}
                                onChange={this.promoChecked}
                              />
                            
                            <p className="leftSide"> Somente em Promoção</p>
                        </div>
                    </div>
                </div>

                <h4>Preço</h4>
                <div className="back">
                    <div className="price" >
                        <p >Min</p>
                        <input
                            type = "min"
                            name = "min"
                            placeholder = ""
                            value = {this.state.min}
                            onChange = { entry => this.change(entry) }
                        />
                    </div>
                    <div className="price">
                        <p>Max</p>
                        <input
                            type = "max"
                            name = "max"
                            placeholder = ""
                            value = {this.state.max}
                            onChange = { entry => this.change(entry) }
                        />
                    </div>

                    <div className="back">
                        <button className="center" onClick={input => this.filterPrice(input)}>Enviar</button>
                    </div>

                </div>

                <h4>Categorias</h4>  
                    {this.categorys.map((category, index) => 
                        <button className={this.buttonStyles[index]} key={index} onClick={() => this.categoryFilter(category, index)}>{this.capitalize(category)}</button>
                    )}
                <button className="clearButton" onClick={this.clearFilters}>Limpar Filtros</button>
            </div>


        )
    }
}
