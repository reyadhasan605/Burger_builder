import React from 'react'
import { Card, CardBody } from 'reactstrap'
const SeeAllOrders = (props) => {


    return (
        <div>

            <Card style={{ margin: "5px", backgroundColor: "pink" }}>
                <CardBody>
                    <ul>
                        <li> Address :{props.customer_info.address} </li>
                        <li> Payment Type : {props.customer_info.paymenttype}</li>
                        <li> Phone_no : {props.customer_info.phone_no}</li>
                        <li> Amount : {props.price}</li>
                    </ul>
                </CardBody>
            </Card>
        </div>
    )
}
export default SeeAllOrders