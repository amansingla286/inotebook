import React,{useContext} from 'react'
import { useEffect } from 'react';
import noteContext from "../context/notes/noteContext";
import Addnote from './Addnote';
import Noteitem from './Noteitem';


export default function Notes(props) {
    const context = useContext(noteContext)
    const  {notes,getNote}=context
    useEffect(()=>{
      getNote()
    },[])
  return (
    <>
    <Addnote showalert2={props.showalert1}/>
    <div className="container row my-3">
        <h2>Your Notes</h2>
        {notes.map((note)=>{
return <Noteitem key={note._id} note={note}/>
        })}
      </div>
      </>
  )
}
