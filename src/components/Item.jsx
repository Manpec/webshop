import React, { useState } from 'react'
import Details from './Details'


export default function Item(props) {

  const [modalIsOpen, setModalIsOpen] = useState(false); //modal is closed at the beggining

  const openModalHandler = () => { 
    setModalIsOpen(true); //Open the modal-popup when user clicks button(item.jsx)
  };

  const closeModalHandler = () => {
    setModalIsOpen(false); //Close the modal-popup when user clicks close-button(details.jsx)
  };

  return (
    <>
    <h2>in Item-component</h2>
    <img style={{width:'300px', height: '300px'}} src={props.item.image} alt="" />
    <h2>{props.item.name}</h2>
    <button onClick={openModalHandler} >Link to modal </button>
    <p>{props.item.price} SEK</p>
    <button >Add to card</button>
    {modalIsOpen && <Details 
    item={props.item}
    onClose={closeModalHandler}
    />}
    
    
    </>
  )
}
