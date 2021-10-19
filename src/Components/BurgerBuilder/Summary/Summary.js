import React from 'react'

const Summary = (props) => {

    let ingredientsummary = props.ingredient.map(item => {

        return (
            <li key={item.type}>
                <span style={{ textTransform: "capitalize" }}>{item.type}  </span>  : {item.number}
            </li>
        );
    })
    return (
        <div>
            <ul>
                {ingredientsummary}
            </ul>
        </div>
    );
}
export default Summary;