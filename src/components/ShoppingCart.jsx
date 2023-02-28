import React from 'react'
import ShoppingItem from './ShoppingItem'

export default function ShoppingCart(props) {
  return (
    <div>
    <h1>ShoppingCart</h1>
    <ul>
      {}

    </ul>
    <ShoppingItem/>
    <span>Total Pris: </span>
    <span>{props.total}SEK</span>
    </div>
  )
}


{/* <ul>
      {props.searchResults.map((item, i) => (
       <li><Item
       key={i}
       item={item}
       /></li>
    ))}
    </ul> */}