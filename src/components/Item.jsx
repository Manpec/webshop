import React, { useState } from "react";
import Details from "./Details";

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
      <div className="card mb-3" style={{ width: "800px", height: "300px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={props.item.image}
              className="img-fluid rounded-start"
              alt="..."
              style={{ width: "300px", height: "300px" }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.item.name}</h5>
              <p className="card-text">{props.item.price} SEK</p>
              <button
                type="button"
                class="btn btn-outline-info"
                onClick={openModalHandler}
              >
                More Information
              </button>
              <button
                type="button"
                class="btn btn-outline-primary"
                onClick={() => props.onAdd(props.item)}
              >
                Add to ShoppingCart
              </button>
              {modalIsOpen && (
                <Details item={props.item} onClose={closeModalHandler} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
