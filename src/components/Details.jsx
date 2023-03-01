import React from 'react'
import Modal from './Modal'

export default function Details(props) {
  return (
    <Modal onClose={props.onClose}>
    <img style={{width:'300px', height: '300px'}} src={props.item.image} alt="" />
    <h2>{props.item.name}</h2>
    <p>{props.item.description}</p>
    <p>PRICE: {props.item.price} SEK</p>
    <button onClick={props.onClose}>Close</button>
    </Modal>
  )
};
