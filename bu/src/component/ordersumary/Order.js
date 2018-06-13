import React, {Component} from 'react';

class Order extends Component {
    render () {
        const ingredientSummary = Object.keys( this.props.ingredients)
        .map( igKey => {
            return(
                <li key ={igKey}>
                <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            );
        });
        const b ="awih";
        return(
            <div>
                <h3>Your order</h3>
                <ul>
                    {ingredientSummary}
                </ul>

            </div>
        )
    }
}

export default Order;