import React from 'react';
import './Ingredient.css'
import bread_top from '../assets/images/bread-top.png'
import bread_bottom from '../assets/images/bread-bottom.png'
import meat from '../assets/images/meat.png'
import salad from '../assets/images/salad.png'


const Ingredient = (props) => {

    let ingre
    switch (props.type) {
        case 'bread_top':
            ingre = <div><img src={bread_top} alt="bread-top" width="470px" /></div>
            break;
        case 'bread_bottom':
            ingre = <div><img src={bread_bottom} alt="bread-bottom" width="400px" /></div>
            break;
        case 'meat':
            ingre = <div><img src={meat} alt="meat" width="400px" /></div>
            break;
        case 'salad':
            ingre = <div><img src={salad} alt="salad" width="400px" /></div>
            break;
        default: ingre = null;
    }
    return (
        <div className="Ingre">
            {ingre}

        </div>
    );
}
export default Ingredient;