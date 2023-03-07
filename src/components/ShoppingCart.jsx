import React  from 'react'
import ShoppingItem from './ShoppingItem'

export default function ShoppingCart(props) {

  return (
    <div>
    <h1>ShoppingCart</h1>
    <div>{props.cartItems.length === 0 && <div>Cart is Empty</div>}</div>
     {props.cartItems.map((item, i) =>(
       <ShoppingItem key={i} item={item} onDelete={props.onDelete}/>
     ))}
   
    <span>Total Pris: </span>
    {props.total}
    <span> SEK</span>
    </div>
  )
}
