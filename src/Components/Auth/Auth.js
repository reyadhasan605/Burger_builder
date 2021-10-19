import { Formik } from 'formik'
import React from 'react'
import { connect } from 'react-redux'
import { auth } from '../redux/authActionCreatore'
import Spinner from '../BurgerBuilder/Spinner/Spinner'
import { Alert } from 'reactstrap'

const mapdispatchto = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}
const mapstate = state => {
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg,
    }
}

class Auth extends React.Component {

    state = {
        mode: "Sign Up"
    }

    switchMode = () => {
        this.setState({
            mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up"
        })
    }

    render() {
        let error = null;
        if (this.props.authFailedMsg !== null) {
            error = <Alert color="danger">{this.props.authFailedMsg}</Alert>
        }
        let form = null;
        if (this.props.authLoading) {
            form = <Spinner />
        }
        else {
            form = (
                <Formik
                    initialValues={
                        {
                            email: "",
                            password: "",
                            passwordconfirm: ""
                        }
                    }
                    onSubmit={
                        (values) => {
                            this.props.auth(values.email, values.password, this.state.mode)
                        }
                    }
                    validate={(value) => {
                        const errors = {};

                        if (!value.email) {
                            errors.email = "Required"
                        }
                        else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value.email)) {
                            errors.email = "Invalid Email Address"
                        }

                        if (!value.password) {
                            errors.password = "Required"
                        } else if (value.password.length < 6) {
                            errors.password = "Must be atleast 6 charecter"
                        }
                        if (this.state.mode === "Sign Up") {
                            if (!value.passwordconfirm) {
                                errors.passwordconfirm = "Required"
                            } else if (value.password !== value.passwordconfirm) {
                                errors.passwordconfirm = "Does not match"
                            }
                        }
                        return errors;
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div style={{
                            padding: "15px",
                            border: "2px solid black",
                            borderRadius: "8px"
                        }}>
                            <button onClick={this.switchMode} className="btn btn-lg" style={{ width: "100%", backgroundColor: "#D70F64", color: "white" }}> Switch to {this.state.mode === "Sign Up" ? "Login" : "Sign Up"}</button>
                            <br /><br />
                            <form onSubmit={handleSubmit}>
                                <input
                                    name="email"
                                    placeholder="enter your email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <span style={{ color: "red" }}>{errors.email}</span>
                                <br />
                                <input
                                    name="password"
                                    placeholder="enter your password"
                                    className="form-control"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <span style={{ color: "red" }}>{errors.password}</span>
                                <br />
                                {this.state.mode === "Sign Up" ? <div><input
                                    name="passwordconfirm"
                                    placeholder="enter again your password"
                                    className="form-control"
                                    value={values.passwordconfirm}
                                    onChange={handleChange}
                                />
                                    <span style={{ color: "red" }}>{errors.passwordconfirm}</span></div> : null}

                                <br />
                                <button type="submit" className="btn btn-success">{this.state.mode}</button>
                            </form>


                        </div>
                    )}

                </Formik>
            )
        }
        document.title = "Auth"
        return (

            <div>
                {error}
                {form}
            </div>
        );
    }
}
export default connect(mapstate, mapdispatchto)(Auth);