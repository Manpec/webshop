import React from "react";

export default function Search(props) {
  const onSearchInputChange = (e) => {
    props.setSearchTerm(e.target.value); //update SearchTerm
  };

  return (
    <div className="searchWrapper">
      <div className="input-group mb-3" style={{ width: "600px" }}>
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon2"
          value={props.searchTerm}
          onChange={onSearchInputChange}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="button-addon2"
          onClick={props.clickHandler}
        >
          Button
        </button>
      </div>
    </div>
  );
}
