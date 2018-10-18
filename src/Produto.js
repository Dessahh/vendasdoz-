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
            });
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

    getTdProps(state, rowInfo, column, instance) {
        return {
            onClick: (e, handleOriginal) => {
                console.log("A Td Element was clicked!");
                console.log("it produced this event:", e);
                console.log("It was in this column:", column);
                console.log("It was in this row:", rowInfo);
                console.log("It was in this table instance:", instance);

                this.props.navigation.navigate('DetalheProduto', {
                    id: this.state.data[rowInfo.index].id
                })

                // IMPORTANT! React-Table uses onClick internally to trigger
                // events like expanding SubComponents and pivots.
                // By default a custom 'onClick' handler will override this functionality.
                // If you want to fire the original onClick handler, call the
                // 'handleOriginal' function.
                // if (handleOriginal) {
                //     handleOriginal();
                // }
            }
        };
    }



    render() {
        const {data, pages, loading} = this.state;

        this.columns = [ // Define Table Columns
            {
                Cell: (row) => {
                    return <div>
                        <div className='container'>
                            <div className='row'>
                                <img className='btn' height={60} src={data[row.index].images[0] ? data[row.index].images[0].url : null}/>
                            </div>
                            <div className='clear'>
                                <div>{data[row.index].description}</div>
                                <div>{data[row.index].value}</div>
                            </div>
                        </div>
                    </div>
                },
                id: 'images'
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
