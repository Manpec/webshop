import React  from 'react'
import ShoppingItem from './ShoppingItem'
import './ShoppingCart.css'

export default function ShoppingCart(props) {

  return (
    <div className='topcorner rounded-3  p-4 ms-8'   style={{width:"450px",backgroundColor:"rgba(205, 237, 245, 0.2)"}}>
    <h3 className='text-center'>Shopping Cart</h3>
    <div>{props.cartItems.length === 0 && <span>Cart is Empty</span>}</div>
     {props.cartItems.map((item, i) =>(
       <ShoppingItem key={i} item={item} onDelete={props.onDelete}/>
     ))}
   <div className='border rounded-3' >

    <span className='fw-bold'>Total Pris: </span>
    <span>{props.total}</span>
    <span> :-</span>
   </div>
    </div>
  )
}
