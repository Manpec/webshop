import React from "react";
import Item from "./Item";

export default function SearchResult(props) {


  return (
    <>
      {props.searchResults.length > 0 && (
        <div
          className="SearchResult-wrapper rounded-3 p-4"
          style={{
            width: "650px",
            backgroundColor: "rgba(205, 237, 245, 0.2)",
          }}
        >
          <h1 style={{ textAlign: "center" }}>SearchResult</h1>
          {props.searchResults.map((item, i) => (
            <Item
            addRating={props.addRating}
            disableRating={props.disableRating}
              key={i}
              item={item}
              onClick={props.onShowCart}
              onAdd={props.onAdd}
            />
          ))}
        </div>
      )}
    </>
  );
}
