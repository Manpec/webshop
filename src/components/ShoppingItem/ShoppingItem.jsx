import React from "react";
import { Trash3 } from "react-bootstrap-icons";
import "./ShoppingItem.css";

export default function ShoppingItem(props) {
  
  return (
    <div className="card-wrapper width rounded-3">
      <div className="card ">
        <div className="">
          <div className="d-flex align-items-center">
            <img
              src={props.item.product.image}
              className="w-25 me-2 rounded-3"
              alt="..."
            />
            <div className="ps-2 d-flex row">
              <p className=" mb-0 card-text fw-bold">
                {props.item.product.name}
              </p>
              <div className="d-flex align-items-center">
                <p className="pe-2 mb-0 bd-highlight">Qty:{props.item.qty}</p>
                <p className="pe-2  mb-0 bd-highlight">
                  pris: {props.item.product.price}:-
                </p>
                <p className="pe-2 mb-0 bd-highlight">
                  subtotal:{" "}
                  {parseInt(props.item.product.price) * props.item.qty}:-
                </p>
                <button
                  className="border-0 text-danger bg-transparent"
                  onClick={() => props.onDelete(props.item)}
                >
                  <Trash3 />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
