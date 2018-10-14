import React from 'react'
import './App.css'
import ReactTable from 'react-table'
import Menu from './Menu.js'
import 'react-table/react-table.css'

export default class Produto extends React.Component {
    constructor() {
        super();
        this.columns = [];
        this.products = [];
        this.clearProducts = [];
        this.state = {
            data: [],
            pages: null,
            loading: true
        };
        this.categoryFilter = this.categoryFilter.bind(this);
        this.priceFilter = this.priceFilter.bind(this);
        this.clearFilters = this.clearFilters.bind(this);

        this.minPrice = 0;
        this.maxPrice = 10000000;
        this.category = null;
    }

    componentDidMount() {
        // only update chart if the data has changed
        console.log('Produto Component did mount.');
        this.search()
    }

    search(input) {
        // show the loading overlay
        this.setState({loading: true});
        console.log('Product query: ', input);

        var targetUrl = `http://ec2-18-218-218-216.us-east-2.compute.amazonaws.com:8080/api/products?searchType=${input ? input.type : null}&searchString=${input ? input.senha : null}&page=0&itemsPerPage=100`

        var encodeCredentials = btoa('test:senhatest');

        console.log('Initiating product search');

        return fetch(targetUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + encodeCredentials
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                console.dir('ResponseJson: ' + responseJson);
                for (var json in responseJson.content) {
                    this.products.push(responseJson.content[json]);
                    this.clearProducts.push(responseJson.content[json])
                }
                console.dir('Products: ' + this.products);
                console.dir('All Products: ' + this.clearProducts);
                this.state.data = this.products;
                this.setState({
                    data: this.products,
                    pages: 1,
                    loading: false
                });
            })
    };

    categoryFilter (category) {
        this.category = category;

        this.applyFilters();
    };

    priceFilter (minPrice, maxPrice) {
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;

        this.applyFilters();
    };

    applyFilters () {
        this.products.length = 0;

        for (let i in this.clearProducts) {
            if (this.category && this.clearProducts[i].category !== this.category) {
                continue;
            }

            if (this.minPrice > this.clearProducts[i].value || this.maxPrice < this.clearProducts[i].value) {
                continue;
            }

            this.products.push(this.clearProducts[i]);
        }

        this.setState({
            data: this.products,
            pages: 1,
            loading: false
        });
    }

    clearFilters () {
        this.category = null;
        this.minPrice = 0;
        this.maxPrice = 10000000;

        this.applyFilters();
    }

    getTheadThProps (state, rowInfo, column, instance) {
        return {
            style: {
                color: 'white'
            },
        }
    }


    render() {
        const {data, pages, loading} = this.state;

        this.columns = [ // Define Table Columns
            // {Header: 'ID', accessor: 'id', width: 100},
            // {Header: 'Name', accessor: 'name', width: 200},
            {Header: 'Description', accessor: 'description', width: 500},
            {Header: 'Type', accessor: 'type', width: 100},
            {Header: 'Category', accessor: 'category', width: 200},
            // {Header: 'Quantity in Stock', accessor: 'quantityInStock', width: 100},
            {Header: 'Value', accessor: 'value', width: 100},
            {Header: 'Manufacturer', accessor: 'manufacturer', width: 200},
            {
                Header: "Image",
                Cell: (row) => {
                    return <div><img height={60} src={row.images ? row.images[0] : null}/></div>
                },
                accessor: 'images',
                id: "image"
            }
        ];

        return (

            <div className='App-body'>

                <Menu categoryFilter={this.categoryFilter} priceFilter={this.priceFilter} clearFilters={this.clearFilters}/>

                <ReactTable
                    loading={loading}
                    data={data}
                    columns={this.columns}
                    pages={pages}
                    getTheadThProps={this.getTheadThProps}
                    getTdProps={this.getTheadThProps}

                />
            </div>

        )
    }
}
