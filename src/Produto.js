import React from 'react'
import './App.css'
import ReactTable from 'react-table'
import Menu from './Menu.js'
import 'react-table/react-table.css'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Sessao from "./Sessao";

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
        this.nameFilter = this.nameFilter.bind(this);
        this.priceFilter = this.priceFilter.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.selectQuantity = this.selectQuantity.bind(this);

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

    selectQuantity(event, index) {
        this.products[index].cartQuantity = event.target.value;
        this.setState({ [event.target.name]: event.target.value });
    }

    addToCart(rowIndex) {
        if (this.products[rowIndex].cartQuantity === 0) {
            return;
        }

        Sessao.addProductToShopCart(this.products[rowIndex]);
        console.log(`Added ${this.products[rowIndex].cartQuantity} ${this.products[rowIndex].description} to cart`)
    }

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
                    return <Card style={{'display': 'flex', 'padding': '10px'}}>
                        <CardMedia
                            component="img"
                            image={data[row.index].images[0] ? data[row.index].images[0].url : null}
                            height='140'
                            style={{'width': 'initial'}}/>
                        <div>
                            <CardContent>
                                <Typography component="h5" variant="h5"
                                            style={{'paddingTop': '3px', 'paddingLeft': '3px'}}>
                                    {data[row.index].description}
                                </Typography>
                                <Typography variant="h5" style={{'paddingBottom': '3px', 'paddingLeft': '3px'}}>
                                    {'R$ ' + parseFloat(data[row.index].value).toFixed(2)}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary"
                                            style={{'paddingTop': '3px', 'paddingLeft': '3px'}}>
                                    Fabricante: {data[row.index].manufacturer}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary" style={{'paddingLeft': '3px'}}>
                                    Categoria: {data[row.index].type}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary"
                                            style={{'paddingBottom': '3px', 'paddingLeft': '3px'}}>
                                    Quantidade em estoque: {data[row.index].quantityInStock}
                                </Typography>
                                <FormControl style={{
                                    'margin': 'theme.spacing.unit',
                                    'minWidth': '60px'
                                }}>
                                    <Select
                                        value={this.products[row.index].cartQuantity}
                                        name="quantity"
                                        onChange={(event) => this.selectQuantity(event, row.index,)}
                                        style={{'marginTop': 'theme.spacing.unit * 2'}}
                                    >
                                        <MenuItem value={0}>
                                            <em>0</em>
                                        </MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                    </Select>
                                </FormControl>
                                <IconButton color="primary" aria-label="Adicionar ao carrinho" onClick={() => this.addToCart(row.index)}>
                                    <AddShoppingCartIcon/>
                                </IconButton>
                            </CardContent>
                        </div>
                        <div>

                        </div>
                    </Card>
                },
                id: 'images'
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
                    getTheadThProps={this.getTheadThProps}
                    getTdProps={this.getTheadThProps}

                />
            </div>

        )
    }
}
