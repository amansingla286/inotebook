import React from 'react'

export default function Noteitem(props) {
  return (
      <div className="col-md-3">
    <div class="card my-3" >
  <div class="card-body">
    <h5 class="card-title">{props.note.title}</h5>
    <p class="card-text">{props.note.description}</p>
  </div>
</div>
</div>
  )
}
