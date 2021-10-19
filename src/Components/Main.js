import React from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder.js'
import { Route, Switch, Redirect } from 'react-router-dom';
import Order from './Order/Order';
import Checkout from './Order/Checkout'
import Auth from './Auth/Auth';
import { connect } from 'react-redux';
import { authCheck } from './redux/authActionCreatore';
import { Component } from 'react';
import Logout from './Auth/Logout';

const mapstatetoprop = state => {
    return {
        token: state.token,
    }
}
const mapdispatch = dispatch => {
    return {
        authcheck: () => dispatch(authCheck())
    }
}

class Main extends Component {

    componentDidMount() {
        this.props.authcheck();
    }
    render() {
        let route = null;
        if (this.props.token === null) {
            route = (
                <Switch>
                    <Route path="/login" exact component={Auth} />
                    <Redirect to="/login" />
                </Switch>
            )
        }
        else {
            route = (
                <Switch>
                    <Route path="/Home" exact component={BurgerBuilder} />
                    <Route path="/Order" exact component={Order} />
                    <Route path="/Checkout" exact component={Checkout} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Route path="/logout" exact component={Logout} />
                    <Redirect to="/" />
                </Switch>
            )

        }

        return (
            <div>
                <Header />
                <div className="container">
                    {route}
                </div>

            </div>
        );
    }

}
export default connect(mapstatetoprop, mapdispatch)(Main);