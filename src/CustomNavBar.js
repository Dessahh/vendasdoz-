import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import './CustomNavBar.css'
import logo from './Logo.png'

class CustomNavBar extends Component {
  render () {
    return (
      <Navbar default collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/'>
              <img src={logo} alt='Logo: Carrinho de Vendas' height='30' />

            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} componentClass={Link} href='/' to='/'>
                            Home
            </NavItem>
            <NavItem eventKey={3} componentClass={Link} href='/cadastro' to='/carrinho'>
                            Carrinho
            </NavItem>
            <NavItem eventKey={2} componentClass={Link} href='/login' to='/login'>
                            Login
            </NavItem>
            <NavItem eventKey={3} componentClass={Link} href='/cadastro' to='/cadastro'>
                            Cadastro
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default CustomNavBar
