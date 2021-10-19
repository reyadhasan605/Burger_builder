import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap'
import Summary from './Summary/Summary';
import { connect } from 'react-redux'
import { addIngredient, removeIngredient, updatepartch } from '../redux/ActionCreator'

const mapStatetoprops = state => {
    return {
        ingredient: state.ingredient,
        total_price: state.total_price,
        purchasable: state.purchasable
    }
}
const mapdispatchtoprops = (dispatch) => {

    return {
        addingredient: (type) => dispatch(addIngredient(type)),
        removeingredient: (type) => dispatch(removeIngredient(type)),
        update: () => dispatch(updatepartch())
    }
}

const INGREDIENT_PRICES = {
    salad: 20,
    meat: 90
}
class BurgerBuilder extends Component {

    constructor(props) {
        super(props)
        this.state = {
            modalopen: false,

        }
    }
    addingredienthandel = (value) => {

        this.props.addingredient(value);
        this.props.update();
    }
    removeingredienthandel = (value) => {
        this.props.removeingredient(value);
        this.props.update();
    }
    checkouthandle = () => {
        this.props.history.push("/Checkout");
    }
    togglemodal = () => {
        this.setState({
            modalopen: !this.state.modalopen
        })
    }

    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredient={this.props.ingredient} />
                    <Controls add={this.addingredienthandel}
                        remove={this.removeingredienthandel}
                        price={this.props.total_price}
                        togglemodal={this.togglemodal}
                        purchasable={this.props.purchasable} />
                </div>
                <Modal isOpen={this.state.modalopen}>

                    <ModalHeader>Your Order Summary</ModalHeader>
                    <ModalBody>
                        <h5>Total Price :{this.props.total_price.toFixed(0)} BDT</h5>
                        <Summary ingredient={this.props.ingredient} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.checkouthandle}>Continue to Checkout</Button>
                        <Button color="secondary" onClick={this.togglemodal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default connect(mapStatetoprops, mapdispatchtoprops)(BurgerBuilder);