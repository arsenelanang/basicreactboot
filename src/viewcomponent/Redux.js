import React from 'react';
import { connect } from 'react-redux';
import ChildComponent from '../component/childcomponent';
import OrderSumary from '../component/ordersumary/OrderSumary';
import Order from '../component/ordersumary/Order';
import Modal from '../component/UI/Modal/Modal';

import * as actionTypes from '../store/actions';


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class Redux extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
            // visible: true,
            // ingredients: {
            //     salad: 0,
            //     bacon: 0,
            //     cheese: 0,
            //     meat: 0
            // },
            // totalPrice: 4,
            // purchasable: false,
            purchasing: false
            
          };
          
        // this.onDismiss = this.onDismiss.bind(this);
    }

    // onDismiss() {
    //     this.setState({ visible: false });
    // }
    // purchaseHandle = () =>{
     
    //   this.setState ({
    //     purchasing: true
    //   });
    // }
    componentDidMount () {
        console.log(this.props);
        // axios.get( 'https://react-my-burger.firebaseio.com/ingredients.json' )
        //     .then( response => {
        //         this.setState( { ingredients: response.data } );
        //     } )
        //     .catch( error => {
        //         this.setState( { error: true } );
        //     } );
    }


    // updatePurchaseState (ingredients) {
    //   const sum = Object.keys(ingredients)
    //         .map( igKey =>{
    //           return ingredients[igKey];
    //         })
    //         .reduce( ( sum, el) =>{
    //           return sum + el;
    //         }, 0);
    //   this.setState({purchasable: sum >0 });
    // }
    updatePurchaseState ( ingredients ) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }
    // ingredientsAddHandler = (type) =>{
    //   console.log(type);
    //   const oldCount = this.state.ingredients[type];
    //   const updatedCount = oldCount + 1;
    //   const updatedIngredients = {
    //     ...this.state.ingredients
    //   };
    //   console.log(updatedIngredients);
    //   updatedIngredients[type] = updatedCount;

    //   const priceAddition = INGREDIENT_PRICES[type];
    //   const oldPrice = this.state.totalPrice;
    //   const newprice = oldPrice + priceAddition;
    //   this.setState( {
    //       totalPrice : newprice, 
    //       ingredients : updatedIngredients
    //     }
    //   );
    //   this.updatePurchaseState(updatedIngredients);
      
    // }
    // ingredientsRemoveHandler = (type) =>{
    //   console.log(type);
    //   const oldCount = this.state.ingredients[type];
    //   if ( oldCount <= 0 ) {
    //     return;
    //   }
    //   const updatedCount = oldCount - 1;
    //   const updatedIngredients = {
    //     ...this.state.ingredients
    //   };
    //   console.log(updatedIngredients);
    //   updatedIngredients[type] = updatedCount;

    //   const priceAddition = INGREDIENT_PRICES[type];
    //   const oldPrice = this.state.totalPrice;
    //   const newprice = oldPrice - priceAddition;
    //   this.setState( {
    //       totalPrice : newprice, 
    //       ingredients : updatedIngredients
    //     }
    //   );
    //   this.updatePurchaseState(updatedIngredients);
      
    // }

    purchaseCancelHandler = () => {
      this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }

    render() {
    console.log(this.props.ings)

    const disabledInfo = {
        ...this.props.ings
    };
    console.log(disabledInfo)
    for ( let key in disabledInfo ) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let order = null;
    let burger = <p>Mugiwaraaaa</p>;
    if ( this.props.ings ) {
          burger = (
                <div>
                    <ChildComponent
                    price={this.props.price}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered = {this.purchaseHandle}
                    ingredientAdded = {this.ingredientsAddHandler}
                    ingredientRemoved = {this.ingredientsRemoveHandler}
                    />
                </div>               
            );
            // orderSummary = <OrderSummary
            //     ingredients={this.props.ings}
            //     price={this.props.price}
            //     purchaseCancelled={this.purchaseCancelHandler}
            //     purchaseContinued={this.purchaseContinueHandler} />;
            order = <Order 
                    ingredients = {this.props.ings}
                    />
        console.log(this.props)
        }
      return (
        
        <div>
          <p>Haloo Arabastard</p>

          {order}

          {burger}





          {/* <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            <OrderSumary 
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
          </Modal> */}
          
        </div>
      );
    }
  }

const mapStateToProps = state => {
    console.log(state.ingredients)
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Redux);
