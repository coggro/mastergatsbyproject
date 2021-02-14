import calculatePizzaPrice from './calculatePizzaPrice'

export default function calculateOrderTotal(order, pizzas) {
  // loop over every item in order
  // calculate total for that pizza
  // add that total to running total
  const total = order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find(
      (singlePizza) => singlePizza.id === singleOrder.id
    )
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size)
  }, 0)
  return total
}
