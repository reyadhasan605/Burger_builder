import React from 'react'
import { connect } from 'react-redux'
import { fetchorders } from '../redux/ActionCreator'
import SeeAllOrders from './SeeAllOrders'

const mapstatetoprops = (state) => {

    return {
        orders: state.orders,
        orderload: state.orderLoading,
        ordererror: state.orderError,
        token: state.token,
        userId: state.userId,
    }
}
const mapdispatchto = dispatch => {
    return {
        fetchorders: (token, userId) => dispatch(fetchorders(token, userId)),
    }
}

class Order extends React.Component {

    componentDidMount() {
        this.props.fetchorders(this.props.token, this.props.userId);
    }
    render() {

        let ord = this.props.orders.map(item => {

            return <SeeAllOrders customer_info={item.customer_info} price={item.price} />

        })

        return (
            <div>
                {ord}
            </div>
        )
    }
}
export default connect(mapstatetoprops, mapdispatchto)(Order)