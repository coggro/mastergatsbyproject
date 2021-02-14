import { useContext, useState } from 'react'
import OrderContext from '../components/OrderContext'
import calculateOrderTotal from './calculateOrderTotal'
import formatMoney from './formatMoney'
import attachNamesAndPrices from './attachNamesAndPrices'

export default function usePizza({ pizzas, values }) {
  // Create some state to hold our order
  // Moved state up to provider
  // const [order, setOrder] = useState([])
  // Now access state and updater via context
  const [order, setOrder] = useContext(OrderContext)
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  // Make a fx to add things to order
  function addToOrder(orderedPizza) {
    setOrder([...order, orderedPizza])
  }
  // Make a fx to remove things from order
  function removeFromOrder(index) {
    setOrder([
      // everything before
      ...order.slice(0, index),
      // everything after
      ...order.slice(index + 1),
    ])
  }

  // This fx is run when someone submits the form
  async function submitOrder(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    // setMessage(null)
    // gather the data
    const body = {
      order: attachNamesAndPrices(order, pizzas),
      total: formatMoney(calculateOrderTotal(order, pizzas)),
      name: values.name,
      email: values.email,
      mapleSyrup: values.mapleSyrup,
    }
    // Send this data to a serverless fx when they check out
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    )
    const text = JSON.parse(await res.text())

    // check if everything worked
    // If status is in error range
    if (res.status >= 400 && res.status < 600) {
      setLoading(false) // Turn off loading
      setError(text.message)
    } else {
      // It worked
      setLoading(false)
      setMessage('Success! Come on down for your pizza!')
    }
  }
  // TODO
  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  }
}
