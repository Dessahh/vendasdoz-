import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import './CustomNavBar.css'
import logo from './Logo.png'
import Sessao from "./Sessao";

class CustomNavBar extends Component {
    render() {
        if (Sessao.getSessionToken()) {
            return (
                <Navbar default collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to='/'>
                                <img src={logo} alt='Logo: Carrinho de Vendas' height='30'/>

                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={1} componentClass={Link} href='/' to='/'>
                                Home
                            </NavItem>
                            <NavItem eventKey={2} componentClass={Link} href='/cadastro' to='/carrinho'>
                                Carrinho
                            </NavItem>
                            <NavItem eventKey={3} componentClass={Link} href='/usuario' to='/usuario'>
                                Painel do Usuário
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            )
        }
        return (
            <Navbar default collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/'>
                            <img src={logo} alt='Logo: Carrinho de Vendas' height='30'/>

                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItem eventKey={1} componentClass={Link} href='/' to='/'>
                            Home
                        </NavItem>
                        <NavItem eventKey={2} componentClass={Link} href='/login' to='/login'>
                            Login
                        </NavItem>
                        <NavItem eventKey={3} componentClass={Link} href='/cadastro' to='/cadastro'>
                            Cadastro
                        </NavItem>
                        <NavItem eventKey={4} componentClass={Link} href='/carrinho' to='/carrinho'>
                            Carrinho
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default CustomNavBar
