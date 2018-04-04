import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.3,
    bacon: 0.7
}

const INGREDIENT_CALORIES = {
    salad: 5,
    cheese: 70,
    meat: 180,
    bacon: 90
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        totalCalories: 200,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey=> {
                return ingredients[igKey];
            })
            .reduce((sum, el) => { return sum + el }, 0);
        this.setState({purchaseable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        const calorieAddition = INGREDIENT_CALORIES[type];
        const oldCalories = this.state.totalCalories;
        const newCalories = oldCalories + calorieAddition;

        this.setState({totalPrice: newPrice, totalCalories: newCalories, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        const calorieDeduction = INGREDIENT_CALORIES[type];
        const oldCalories = this.state.totalCalories;
        const newCalories = oldCalories - calorieDeduction;

        this.setState({totalPrice: newPrice, totalCalories: newCalories, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);  
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary price={this.state.totalPrice} ingredients={this.state.ingredients} purchaseCanceled={this.purchaseCancelHandler} purchaseContinued={this.purchaseContinueHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler} disabled={disabledInfo} price={this.state.totalPrice} calories={this.state.totalCalories} purchaseable={this.state.purchaseable} ordered={this.purchaseHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;