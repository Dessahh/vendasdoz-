import React from 'react';
import logo from './logo2.png';
import './App.css';
import ReactTable from "react-table";

export default class Produto extends React.Component {
    constructor() {
        super();
        this.columns = [];
        this.state = {
            data: [],
            pages: null,
            loading: true
        };
    }

    componentDidMount() {
        // only update chart if the data has changed
        console.log('Produto Component did mount.');
        this.search();
    }

    search(input) {
        // show the loading overlay
        this.setState({loading: true});
        console.log("Product query: ", input);

        // Tirar proxy qnd corrigirem api deles
        var targetUrl = `http://ec2-18-218-218-216.us-east-2.compute.amazonaws.com:8080/api/products?searchType=${input ? input.type : null}&searchString=${input ? input.senha : null}&page=0&size=100`;

        var encodeCredentials = btoa('test:senhatest');

        console.log('Initiating product search');

        return fetch(targetUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + encodeCredentials
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                console.dir("ResponseJson: " + responseJson);
                var products = [];
                for (var json in responseJson.content) {
                    products.push(responseJson.content[json]);
                }
                console.dir("Products: " + products);
                this.state.data = products;
                this.setState({
                    data: products,
                    pages: 1,
                    loading: false
                })
            })
    };

    render() {
        const { data, pages, loading } = this.state;

        this.columns = [ //Define Table Columns
            {Header: "ID", accessor: "id"},
            {Header: "Name", accessor: "name"},
            {Header: "Type", accessor: "type"},
            {Header: "Category", accessor: "category"},
            {Header: "Quantity in Stock", accessor: "quantityInStock"},
            {Header: "Value", accessor: "value"},
            {Header: "Manufacturer", accessor: "manufacturer"},
            {Header: "Description", accessor: "description"},
        ];

        return (
            <div className='App'>

                <header className="App-firstLine"/>
                <header className="App-header">
                    <img src={logo} alt="Logo: Carrinho de Vendas" width="55" height="38"/>
                    <h1 className="App-title">Vendas do Zé</h1>
                </header>

                <header className="App-secondLine"/>
                <div className='App-body'>
                    <header className="Blue-Rectangle"/>
                    <ReactTable
                        loading={loading}
                        data={data}
                        columns={this.columns}
                        pages={pages}
                    />
                </div>
            </div>

        )

    }
}
