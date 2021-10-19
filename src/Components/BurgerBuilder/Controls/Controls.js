import React from 'react'
import { Card, CardFooter, CardBody, CardHeader, Button } from 'reactstrap'

const control = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' }
]

const BuildControls = props => {
    return (
        <div className="d-flex">
            <div className="mr-auto ml-5" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{props.label} : </div>
            <Button className="btn btn-danger btn-sm m-1" onClick={props.removed}>Less</Button>
            <Button className="btn btn-success btn-sm m-1" onClick={props.added}>More</Button>
        </div>
    );
}

const Controls = (props) => {

    return (
        <div className="container ml-md-5" style={{ textAlign: "center" }}>
            <Card style={{
                marginTop: "30px",
                marginBottom: "30px",
                textAlign: "center"
            }}>
                <CardHeader style={{ backgroundColor: "#D70F64", color: "white" }}><h4>Add Ingredients</h4></CardHeader>
                <CardBody>
                    {
                        control.map(item => {
                            return <BuildControls
                                label={item.label}
                                type={item.type}
                                added={() => props.add(item.type)}
                                removed={() => props.remove(item.type)} />
                        })
                    }
                </CardBody>
                <CardFooter><h5>Price: {props.price} BDT</h5></CardFooter>
                <Button disabled={!props.purchasable} onClick={props.togglemodal}>Order Now </Button>
            </Card>
        </div>
    );
}
export default Controls;