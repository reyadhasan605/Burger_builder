
import * as actionType from './Actiontype'

const INGREDIENT_PRICES = {
    salad: 20,
    meat: 90
}

const Initial_state = {
    ingredient: [
        { type: 'meat', number: 0 },
        { type: 'salad', number: 0 }
    ],
    orders: [],
    orderLoading: true,
    orderError: false,
    total_price: 80,
    purchasable: false,
    token: null,
    userId: null,
    authLoading: false,
    authFailedMsg: null
}

export const reducer = (state = Initial_state, action) => {
    let setingre = [...state.ingredient];
    switch (action.type) {
        case actionType.ADD_INGREDIENT:

            for (let item of setingre) {
                if (item.type === action.payload) item.number++;
            }
            return {
                ...state,
                ingredient: setingre,
                total_price: state.total_price + INGREDIENT_PRICES[action.payload]
            }
        case actionType.REMOVE_INGREDIENT:

            for (let item of setingre) {
                if (item.type === action.payload) {
                    if (item.number <= 0)
                        return state;
                    item.number--;
                }
            }
            return {
                ...state,
                ingredient: setingre,
                total_price: state.total_price - INGREDIENT_PRICES[action.payload]
            }
        case actionType.UPDATE_PARTCH:
            let sum = 0;
            for (let item of setingre) {
                sum += item.number;
            }
            return {
                ...state,
                purchasable: sum > 0
            }
        case actionType.RESET:
            return {
                ...state,
                ingredient: [
                    { type: 'meat', number: 0 },
                    { type: 'salad', number: 0 }
                ],
                total_price: 80,
                purchasable: false
            }
        case actionType.LOAD_ORDERS:
            let order = [];
            for (let tmp in action.payload) {
                order.push({
                    ...action.payload[tmp],
                    id: tmp,
                })
            }
            return {
                ...state,
                orders: order,
                orderLoading: false
            }

        //auth cases
        case actionType.AUTH_SUCCESS:
            {
                return {
                    ...state,
                    authFailedMsg: null,
                    token: action.payload.token,
                    userId: action.payload.userId,
                }
            }
        case actionType.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
            }
        case actionType.AUTH_LOADING:
            return {
                ...state,
                authLoading: action.payload
            }
        case actionType.AUTH_FAILED:
            return {
                ...state,
                authFailedMsg: action.payload,
            }
        default:
            return state;
    }
}