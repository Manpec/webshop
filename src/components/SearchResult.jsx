import React from "react";
import Item from "./Item";

export default function SearchResult(props) {
  return (
    <div className="SearchResult-wrapper">
      <h1 style={{textAlign:'center'}}>SearchResult</h1>
      <div>{props.searchResults.length === 0 && <div>No results. </div>}</div>
        {props.searchResults.map((item, i) => (
            <Item key={i} item={item} onClick={props.onShowCart} onAdd={props.onAdd}/>
        ))}
    </div>
  );
}
