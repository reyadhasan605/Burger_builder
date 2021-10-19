import React from 'react'
import { NavLink } from 'react-router-dom'
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import '../Header/headerstyle.css'
import Logo from '../../assets/bbb.png'
import { connect } from 'react-redux'

const mapStatetoPro = state => {
    return {
        token: state.token,
    }
}

const Header = (props) => {

    let links = null;
    if (props.token === null) {

        links = (
            <Nav className="mr-md-5 navbrand" navbar>
                <NavItem>
                    <NavLink exact to="/login" style={{ textDecoration: "none", color: "black" }}>Login</NavLink>
                </NavItem>

            </Nav>
        )
    }
    else {
        links = (<Nav className="mr-md-5 navbrand" navbar>
            <NavItem>
                <NavLink exact to="/" style={{ textDecoration: "none", color: "black" }}>Burger Builder</NavLink>
            </NavItem>
            <NavItem>
                <NavLink exact to="/Order" style={{ textDecoration: "none", color: "black", margin: "10px" }}>Orders</NavLink>
            </NavItem>
            <NavItem>
                <NavLink exact to="/logout" style={{ textDecoration: "none", color: "black", margin: "10px" }}>Logout</NavLink>
            </NavItem>

        </Nav>)

    }
    return (
        <div>
            <Navbar expand="md" style={{ backgroundColor: 'pink', height: "70px", marginBottom: "50px" }}>
                <NavbarBrand className="mr-auto navbrand img-fluid" href="/"><img src={Logo} height="70px" alt="header img" /></NavbarBrand>
                {links}
            </Navbar>

        </div>
    );
}
export default connect(mapStatetoPro)(Header);