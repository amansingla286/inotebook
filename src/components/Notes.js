import React, { useContext } from "react";
import { useEffect,useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";

export default function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getNote,editNote } = context;
  const[note,setNote] =useState({id:"",etitle:"",edescription:"",etag:"default"})

  useEffect(() => {
    getNote();
  }, []);
  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
  };
  const ref = useRef(null)
  const refclose = useRef(null)






  const handleClick=(e)=>{
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refclose.current.click()
  }
  const onChange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
  }


  return (
    <>
      <Addnote showalert2={props.showalert1} />
       
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel" 
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">  
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Notes
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              aria-describedby="title"
              value={note.etitle}
              onChange={onChange}
              minLength={5}required

            />
            
          </div>
          <div className="mb-3">
            <label for="description" className="form-label">
            description
            </label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              name="edescription"
              value={note.edescription}
              minLength={5}required
              onChange={onChange}
            />
          </div>  
          <div className="mb-3">
            <label for="tag" className="form-label">
            tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name="etag"
              value={note.etag}
              minLength={5}required

              onChange={onChange}
            />
          </div>
          
          
        </form>
        </div>
            <div className="modal-footer">
              <button ref={refclose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button  disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container row my-3">
        <h2>Your Notes</h2>
        <div className="container  mx-1">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updatenote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
}
