import axios from 'axios';
import * as actionType from './Actiontype';

export const addIngredient = intype => {
    return {
        type: actionType.ADD_INGREDIENT,
        payload: intype
    }
}
export const removeIngredient = intype => {
    return {
        type: actionType.REMOVE_INGREDIENT,
        payload: intype
    }
}
export const updatepartch = () => {
    return {
        type: actionType.UPDATE_PARTCH
    }
}
export const reset_value = () => {
    return {
        type: actionType.RESET
    }
}
export const loadorder = order => {
    return {
        type: actionType.LOAD_ORDERS,
        payload: order
    }
}
export const orderloadfail = () => {
    return {
        type: actionType.ORDER_LOAD_FAILED
    }
}

export const fetchorders = (token, userId) => dispatch => {
    const queryParms = '&orderBy="userId"&equalTo="' + userId + '"';
    axios.get('https://burger-builder-514a2-default-rtdb.firebaseio.com/orders.json?auth=' + token + queryParms)
        .then(response => dispatch(loadorder(response.data)))
        .catch(err => console.log(err))
}