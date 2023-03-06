import React from "react";


export default function ShoppingItem(props) {
  console.log(props.item);
  return (
    <div className="card-wrapper">
      <div className="card mb-3" style={{ maxWidth: "640px" }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={props.item.product.image}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{props.item.product.name}</h5>
              <p className="card-text">Qty:{props.item.qty}</p>
              <p className="card-text">pris: {props.item.product.price} SEK</p>
              <p className="card-text">
                subtotal: {parseInt(props.item.product.price) * props.item.qty}{" "}
                SEK
              </p>
              <button onClick={() => props.onDelete(props.item)}>
                Delete btn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
