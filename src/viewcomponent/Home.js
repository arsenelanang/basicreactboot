import React from 'react';
// import {Alert, Form, FormGroup,Input} from 'reactstrap';
import ChildComponent from '../component/childcomponent';
import OrderSumary from '../component/ordersumary/OrderSumary';
import Order from '../component/ordersumary/Order';
import Modal from '../component/UI/Modal/Modal';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
            visible: true,
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchasable: false,
            purchasing: false
            
          };
          
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
    }
    purchaseHandle = () =>{
     
      this.setState ({
        purchasing: true
      });
    }


    updatePurchaseState (ingredients) {
      const sum = Object.keys(ingredients)
            .map( igKey =>{
              return ingredients[igKey];
            })
            .reduce( ( sum, el) =>{
              return sum + el;
            }, 0);
      this.setState({purchasable: sum >0 });
    }

    ingredientsAddHandler = (type) =>{
      console.log(type);
      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {
        ...this.state.ingredients
      };
      console.log(updatedIngredients);
      updatedIngredients[type] = updatedCount;

      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newprice = oldPrice + priceAddition;
      this.setState( {
          totalPrice : newprice, 
          ingredients : updatedIngredients
        }
      );
      this.updatePurchaseState(updatedIngredients);
      
    }
    ingredientsRemoveHandler = (type) =>{
      console.log(type);
      const oldCount = this.state.ingredients[type];
      if ( oldCount <= 0 ) {
        return;
      }
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients
      };
      console.log(updatedIngredients);
      updatedIngredients[type] = updatedCount;

      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newprice = oldPrice - priceAddition;
      this.setState( {
          totalPrice : newprice, 
          ingredients : updatedIngredients
        }
      );
      this.updatePurchaseState(updatedIngredients);
      
    }

    purchaseCancelHandler = () => {
      this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }

    render() {
      return (
        <div>
          <Order 
          ingredients = {this.state.ingredients}
          
          
          />



          <ChildComponent
           price={this.state.totalPrice}
           purchasable = {this.state.purchasable}
           ordered = {this.purchaseHandle}
           ingredientAdded = {this.ingredientsAddHandler}
           ingredientRemoved = {this.ingredientsRemoveHandler}
           
           />

          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            <OrderSumary 
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} />
          </Modal>
          
        </div>
      );
    }
  }

  export default Home;
