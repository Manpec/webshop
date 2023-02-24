import React from 'react'

export default function Details(props) {
  return (
    <>
    <h2>Details-component</h2>
    <img src="" alt="" />
    <h2>Title:{props.title}</h2>
    <p>description: {props.description}</p>
    <p>pris: {props.pris} SEK</p>
    <button>Back to results</button>
    </>
  )
}
