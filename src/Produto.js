import React from 'react'
import './App.css'
import ReactTable from 'react-table'
import Menu from './Menu.js'
import 'react-table/react-table.css'
import ProdutoItem from "./ProdutoItem";
import Modal from "./Modal";

export default class Produto extends React.Component {
    constructor() {
        super();
        this.columns = [];
        this.products = [];
        this.clearProducts = [];
        this.state = {
            data: [],
            pages: null,
            loading: true,
            show: false,
            message: ''
        };
        this.categoryFilter = this.categoryFilter.bind(this);
        this.nameFilter = this.nameFilter.bind(this);
        this.priceFilter = this.priceFilter.bind(this);
        this.clearFilters = this.clearFilters.bind(this);

        this.minPrice = 0;
        this.maxPrice = 10000000;
        this.category = null;
        this.nameQuery = "";
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

        var targetUrl = `http://ec2-18-218-218-216.us-east-2.compute.amazonaws.com:8080/api/products?page=0&itemsPerPage=100`;

        var encodeCredentials = btoa('endereco:ZKUS7FGH');

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
                    this.products[json].cartQuantity = 0;
                    this.clearProducts.push(responseJson.content[json]);
                    this.clearProducts[json].cartQuantity = 0;
                }
                console.dir('Products: ' + this.products);
                console.dir('All Products: ' + this.clearProducts);
                this.state.data = this.products;
                this.setState({
                    data: this.products,
                    pages: 1,
                    loading: false
                });
            });
    };

    categoryFilter(category) {
        this.category = category;

        this.applyFilters();
    };

    priceFilter(minPrice, maxPrice) {
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;

        this.applyFilters();
    };

    nameFilter(query) {
        this.nameQuery = query;
        this.applyFilters();
    }

    applyFilters() {
        this.products.length = 0;

        for (let i in this.clearProducts) {
            if (this.category && this.clearProducts[i].category !== this.category) {
                continue;
            }

            if (this.minPrice > this.clearProducts[i].value || this.maxPrice < this.clearProducts[i].value) {
                continue;
            }

            if (this.nameQuery != "" && !this.clearProducts[i].description.toUpperCase().includes(this.nameQuery.toUpperCase())) {
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

    clearFilters() {
        this.category = null;
        this.minPrice = 0;
        this.maxPrice = 10000000;
        this.nameQuery = "";

        this.applyFilters();
    }

    showModal = (message) => {
        this.setState({
            message: message,
            show: !this.state.show
        });
    };

    getTheadThProps(state, rowInfo, column, instance) {
        return {
            style: {
                color: 'white'
            },
        }
    }

    render() {
        const {data, pages, loading, quantity} = this.state;

        this.columns = [ // Define Table Columns
            {
                Cell: (row) => {
                    return <ProdutoItem
                        dataSource={this.state.data}
                        row={row}
                        showModal={this.showModal}
                        edit={true}/>
                }
            }
        ];

        return (

            <div className='App-body'>

                <Menu categoryFilter={this.categoryFilter} priceFilter={this.priceFilter} nameFilter={this.nameFilter}
                      clearFilters={this.clearFilters}/>

                <ReactTable
                    loading={loading}
                    data={data}
                    columns={this.columns}
                    pages={pages}
                    pageSize={data.length > 10 ? 10 : data.length === 0 ? 5 : data.length}
                    getTheadThProps={this.getTheadThProps}
                    getTdProps={this.getTheadThProps}

                />

                <Modal
                    onClose={this.showModal}
                    show={this.state.show}>
                    {this.state.message}
                </ Modal>
            </div>

        )
    }
}
