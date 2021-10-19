import React from 'react'
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../BurgerBuilder/Spinner/Spinner'
import { reset_value } from '../redux/ActionCreator'

const mapState = (state) => {
    return {
        ingredient: state.ingredient,
        totalprice: state.total_price,
        parchas: state.purchasable,
        userId: state.userId,
        token: state.token,
    }
}
const mapdispatch = (dispatch) => {
    return {
        reset: () => dispatch(reset_value())
    }
}
class Checkout extends React.Component {

    state = {
        values: {
            address: '',
            phone_no: '',
            paymenttype: "Cash On Delivery"
        },
        isLoading: false,
        isModalOpen: false,
        ModalMessage: ""

    }

    handleinputstate(e) {

        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value
            }
        })
    }
    goback = () => {
        this.props.history.goBack("/")
    }
    submitform(event) {
        this.setState({ isLoading: true });
        let order = {
            ingredient: this.props.ingredient,
            price: this.props.totalprice,
            customer_info: this.state.values,
            userId: this.props.userId,
        }
        axios.post('https://burger-builder-514a2-default-rtdb.firebaseio.com/orders.json?auth=' + this.props.token, order)
            .then(response => this.setState({
                isLoading: false,
                isModalOpen: true,
                ModalMessage: "Place Order Successfully"
            }))
            .catch(err => this.setState({
                isLoading: false,
                isModalOpen: true,
                ModalMessage: "Failed,Try Again"
            }))
        this.props.reset();
        event.preventDefault();
    }

    render() {
        let form = <div>

            <h4>Price : {this.props.totalprice}</h4><br />
            <Form onSubmit={(event) => this.submitform(event)}>
                <FormGroup>
                    <Label for="Address">Address</Label>
                    <Input type="textarea" name="address" value={this.state.values.address} placeholder="Place Your Address"
                        onChange={(e) => this.handleinputstate(e)} required />
                </FormGroup>
                <FormGroup>
                    <Label for="Phone">Phone</Label>
                    <Input type="text" name="phone_no" value={this.state.values.phone_no} placeholder="Enter your phone no"
                        onChange={(e) => this.handleinputstate(e)} required />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">Select One</Label>
                    <Input type="select" name="paymenttype" value={this.state.values.paymenttype} onChange={(e) => this.handleinputstate(e)} >
                        <option value="Cash On Delivery">Cash On Delivery</option>
                        <option value="Bkash">Bkash</option>
                    </Input>
                </FormGroup>
                <br />
                <Button type="submit" style={{ marginRight: "3px", backgroundColor: "#D70F64" }} disabled={!this.props.parchas}>Place Order</Button>
                <Button onClick={this.goback}>Cancel</Button>
            </Form>
        </div>
        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goback}>
                    <ModalBody>
                        {this.state.ModalMessage}
                    </ModalBody>
                </Modal>

            </div>
        );
    }
}

export default connect(mapState, mapdispatch)(Checkout)