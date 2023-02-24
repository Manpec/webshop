import React from 'react'

export default function Search(props) {


const onSearchInputChange = (e) => {
  props.setSearchTerm(e.target.value) //update SearchTerm
}


  return (
    <div className='searchWrapper'>
    <h1>Search</h1>
    <input 
    value={props.searchTerm} 
    onChange={onSearchInputChange}/>
    <button onClick={props.clickHandler}>Search</button>
    </div>
  )
}
