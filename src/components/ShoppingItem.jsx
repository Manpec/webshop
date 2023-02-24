import React from 'react'

export default function ShoppingItem(props) {

  const onDeleteHandler =() => {

  }

  return (
    <>
    <h2>ShoppingItem-component</h2>
    <img src="" alt="" />
    <h2>Title:{props.title}</h2>
    <span>Qty:{props.quality}</span>
    <p>pris: {props.pris} SEK</p>
    <p>subtotal: {props.subtotal} SEK</p>
    <button onClick={onDeleteHandler}>Delete btn</button>
    </>
  )
}
