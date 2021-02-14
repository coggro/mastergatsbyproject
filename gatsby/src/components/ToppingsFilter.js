import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { isIdentifierName } from 'prettier'
import styled from 'styled-components'

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    padding: 5px;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    background: var(--grey);
    align-items: center;
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`

function countPizzasInToppings(pizzas) {
  // return pizzas with counts
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id]
      // if it is, increment by one
      if (existingTopping) {
        existingTopping.count += 1
        // otherwise create new entry and set to one
      } else {
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        }
      }
      return acc
    }, {})

  // sort them based on count
  const sortedToppings = Object.values(counts).sort((a, b) => b.count - a.count)

  return sortedToppings
}

export default function ToppingsFilter({ activeTopping }) {
  // Get a list of all the toppings
  // Get a list of all the pizzas with their toppings
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `)
  // Count how many pizzas are in each topping
  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes)
  // Loop over the list of toppings and display the topping and the count of
  // pizzas in that topping
  // Link it up...
  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  )
}
