import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../redux/authActionCreatore';
const mapdispatchto = dispatch => {
    return {
        logout: () => dispatch(logout()),
    }
}

class Logout extends Component {

    componentDidMount() {
        this.props.logout();
    }

    render() {
        return (
            <Redirect to="/" />
        )
    }
}

export default connect(null, mapdispatchto)(Logout);