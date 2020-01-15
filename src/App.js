import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state = {
    allPizzas: [],
    topping: '',
    size: '',
    vegetarian: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
        this.setState({
          allPizzas: data
        })
      })
  }

  handleEdit = (pizza) => {
    console.log('edit', pizza)
    this.setState({
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('submit')
    // fetch PATCH
    this.setState({
      topping: '',
      size: '',
      vegetarian: ''
    })
    // fetch GET (pessimistic rendering)
  }

  handleTopping = (e) => {
    console.log('topping', e.target.value)
    this.setState({
      topping: e.target.value
    })
  }

  handleSize = (e) => {
    console.log('size', e.target.value)
    this.setState({
      size: e.target.value
    })
  }

  handleVegetarian = (e) => {
    console.log(e.target.value)
    let veg
    e.target.value === 'Vegetarian' ? veg = true : veg = false
    console.log(veg)
    this.setState({
      vegetarian: veg
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm toppingVal={this.state.topping} 
                   sizeVal={this.state.size}
                   vegetarianVal={this.state.vegetarian}
                   topping={this.handleTopping}
                   size={this.handleSize}
                   vegetarian={this.handleVegetarian}
                   submit={this.handleSubmit}/>

        <PizzaList allPizzas={this.state.allPizzas}
                   edit={this.handleEdit}/>
      </Fragment>
    );
  }
}

export default App;
