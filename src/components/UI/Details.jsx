import React from "react";
import Modal from "./Modal";

export default function Details(props) {
  return (
    <Modal onClose={props.onClose}>
      <div className="d-flex mt-4 mx-4">
        <img
          style={{ width: "300px", height: "300px" }}
          src={props.item.image}
          alt=""
        />
        <div className="d-flex row ms-2">
          <h2>{props.item.name}</h2>
          <p>{props.item.description}</p>
          <p className="fw-bold fs-5">PRIS: {props.item.price} :-</p>
        </div>
      </div>
      <button
        className="float-end btn btn-outline-primary"
        onClick={props.onClose}
      >
        Close
      </button>
    </Modal>
  );
}
