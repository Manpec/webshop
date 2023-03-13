import React, { useState } from "react";

export default function Search(props) {
  const [error, setError] = useState(false);

  /**
   * the onClickHandler function is called when the Search button is clicked or a dropdown suggestion is selected
   */
  const onClickHandler = (dropdownItem) => {
    //Check if the searchTerm state is longer than 2 characters
    if (props.searchTerm.length > 2) {
      //dropdownItem will be undefined if the input button is clicked and will only have value if a dropdown is selected
      props.clickHandler(dropdownItem); //Call the clickHandler function from the App.js
      setError(false);
      props.setSearchTerm(""); // Clear the searchResult to avoid searchHit spam
    } else {
      setError(true); //Sets the error state to true to display an error message.
      return;
    }
  };
  return (
    <div className="searchWrapper">
      <div className="input-group mb-3" style={{ width: "600px" }}>
        <input
          type="text"
          className="form-control dropdown-toggle"
          style={{ backgroundColor: "rgba(205, 237, 245, 0.8)" }}
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon2"
          value={props.searchTerm}
          onChange={(e) => props.setSearchTerm(e.target.value)}
        />

        <button
          className="btn btn-outline-secondary"
          style={{ backgroundColor: "rgba(253, 253, 253, 0.8)" }}
          type="button"
          id="button-addon2"
          onClick={() => onClickHandler()}
        >
          Search
        </button>
      </div>
      {props.suggestions.length > 0 && props.searchTerm.length > 2 && (
        <ul
          className="dropdown-menu show"
          aria-labelledby="dropdownMenuButton1"
        >
          {props.suggestions.map((dropdownItem, i) => (
            <li style={{ cursor: "pointer" }} key={i}>
              <a
                onClick={() => {
                  onClickHandler(dropdownItem);
                }}
                className="dropdown-item"
              >
                {dropdownItem}
              </a>
            </li>
          ))}
        </ul>
      )}
      {error && (
        <div style={{ backgroundColor: "rgba(255, 0, 17, 0.34)" }}>
          <span style={{ color: "white", fontSize: "20px" }}>
            Enter at least 3 characters!
          </span>
        </div>
      )}
    </div>
  );
}
