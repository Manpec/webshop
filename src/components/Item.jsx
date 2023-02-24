import React from 'react'
import Details from './Details'

export default function Item(props) {

  return (
    <>
    <h2>in Item-component</h2>
    <img style={{width:'300px', height: '300px'}} src={props.item.image} alt="" />
    <h2>{props.item.name}</h2>
    <button>Link to modal </button>
    <p>{props.item.price} SEK</p>
    <button>Add to card</button>
    <Details/>
    </>
  )
}
