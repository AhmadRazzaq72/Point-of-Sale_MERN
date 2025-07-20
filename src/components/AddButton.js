import React from 'react'
import "./Addbutton.css"
const AddButton = (props) => {
  return (
    <>
    <button type="button" className="btn btn-info mx-5" data-bs-toggle="modal" data-bs-target="#exampleModal">{props.name}</button>

    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body " id="modal-body1">
          <input type="text" id="search-input1" placeholder="Name" />
          <input type="text" id="search-input1" placeholder="Cash" />

          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Next</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default AddButton