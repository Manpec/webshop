import React from 'react'
import ShoppingItem from './ShoppingItem'

export default function ShoppingCart(props) {
  return (
    <>
    <h1>ShoppingCart</h1>
    <ShoppingItem/>
    <h2>Total Pris: {props.total}SEK</h2>
    </>
  )
}
