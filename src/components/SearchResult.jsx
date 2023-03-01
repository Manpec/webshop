import React from "react";
import Item from "./Item";

export default function SearchResult(props) {
  return (
    <>
      <h1>SearchResult</h1>
      
        {props.searchResults.map((item, i) => (
          
            <Item key={i} item={item} onClick={props.onShowCart} onAdd={props.onAdd}/>
          
        ))}
      
    </>
  );
}
