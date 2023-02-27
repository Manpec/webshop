import React from 'react'
import Modal from './Modal'

export default function Details(props) {
  return (
    <Modal onClose={props.onClose}>
    <h2>Details-component</h2>
    <img style={{width:'300px', height: '300px'}} src={props.item.image} alt="" />
    <h2>Title:{props.item.name}</h2>
    <p>{props.item.description}</p>
    <p>pris: {props.item.pris} SEK</p>
    <button onClick={props.onClose}>Close</button>
    </Modal>
  )
};
