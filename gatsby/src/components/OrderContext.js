import React, { useState } from 'react'

// Create an order context
const OrderContext = React.createContext()

// Component that will live at a higher level, wraps root
export function OrderProvider({ children }) {
  // stick state in here
  const [order, setOrder] = useState([])
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  )
}

export default OrderContext
