import React from 'react'
import logo from './logo2.png'
import './App.css'
import ReactTable from 'react-table'
import Menu from './Menu.js'
import 'react-table/react-table.css'

export default class Produto extends React.Component {
  constructor () {
    super()
    this.columns = []
    this.state = {
      data: [],
      pages: null,
      loading: true
    }
  }

  componentDidMount () {
    // only update chart if the data has changed
    console.log('Produto Component did mount.')
    this.search()
  }

  search (input) {
    // show the loading overlay
    this.setState({ loading: true })
    console.log('Product query: ', input)

    // Tirar proxy qnd corrigirem api deles
    var targetUrl = `http://ec2-18-218-218-216.us-east-2.compute.amazonaws.com:8080/api/products?searchType=${input ? input.type : null}&searchString=${input ? input.senha : null}&page=0&size=100`

    var encodeCredentials = btoa('test:senhatest')

    console.log('Initiating product search')

    return fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + encodeCredentials
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        console.dir('ResponseJson: ' + responseJson)
        var products = []
        for (var json in responseJson.content) {
          products.push(responseJson.content[json])
        }
        console.dir('Products: ' + products)
        this.state.data = products
        this.setState({
          data: products,
          pages: 1,
          loading: false
        })
      })
  };

  /* <ReactTable

          loading={loading}
          data={data}
          columns={this.columns}
          pages={pages}

        /> */

  render () {
    const { data, pages, loading } = this.state

    this.columns = [ // Define Table Columns
      { Header: 'ID', accessor: 'id', width: 100 },
      { Header: 'Name', accessor: 'name', width: 100 },
      { Header: 'Type', accessor: 'type', width: 100 },
      { Header: 'Category', accessor: 'category', width: 100 },
      { Header: 'Quantity in Stock', accessor: 'quantityInStock', width: 100 },
      { Header: 'Value', accessor: 'value', width: 100 },
      { Header: 'Manufacturer', accessor: 'manufacturer', width: 100 },
      { Header: 'Description', accessor: 'description', width: 100 }
    ]

    return (

      <div className='App-body'>
        <div className='productsTable'>

          <Menu />
          <div className='rightBox'>
            <ReactTable

              loading={loading}
              data={data}
              columns={this.columns}
              pages={pages}

            />
          </div>

        </div>
      </div>

    )
  }
}
