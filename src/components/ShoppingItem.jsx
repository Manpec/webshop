import React from 'react'

export default function ShoppingItem(props) {

  const onDeleteHandler =() => {

  }
  console.log(props.item)
  

  return (
    <>
    <h2>ShoppingItem-component</h2>
    
    <img src="" alt="" />
    <h2>Title:{props.item.product.name}</h2>
    <span>Qty:{props.item.qty}</span>
    <p>pris: {props.item.product.price} SEK</p>
    <p>subtotal: {parseInt(props.item.product.price )* props.item.qty} SEK</p>
    <button onClick={()=>onDeleteHandler(props.item)}>Delete btn</button>
    </>
  )
}
