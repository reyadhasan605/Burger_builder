import React from 'react';
import Ingredient from '../../../ingredient/Ingredient';
import './Burger.css'

const Burger = (props) => {

    let ingrearray = props.ingredient.map(item => {
        let ammountArr = [...Array(item.number).keys()];
        return ammountArr.map(_ => {
            return <Ingredient type={item.type} key={Math.random()} />
        })

    })

        .reduce((arr, element) => {
            return arr.concat(element)
        }, []);

    if (ingrearray.length === 0)
        ingrearray = <p>please add some ingredients!</p>

    return (
        <div className="Burger">
            <Ingredient type="bread_top" />
            {ingrearray}
            <Ingredient type="bread_bottom" />
        </div>
    );
}
export default Burger;