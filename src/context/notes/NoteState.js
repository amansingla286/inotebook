import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  // GEt a note
  const getNote =async (title, description, tag) => {
    // todo: api call
    // Api call
    const response = await fetch(`${host}/api/note/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },
    });
    const json=await response.json()
console.log(json)
setNotes(json)
  }

  const addNote =async (title, description, tag) => {
    // todo: api call
    // Api call
    const response = await fetch(`${host}/api/note/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },
      body: JSON.stringify({title,description,tag}),
    });
    const note=await response.json()
    setNotes(notes.concat(note));
  };

  //Edit  a note
  const editNote = async (id, title, description, tag) => {
    // Api call
    const response = await fetch(`${host}/api/note/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },
      body: JSON.stringify({title,description,tag}),
    });
    const json =await response.json();
    console.log(json)

    let newNotes=JSON.parse(JSON.stringify(notes))
    //logic to edit notes
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
      break;

      }
    }
    setNotes(newNotes)
  };

  // delete a note
  const deleteNote =async (id) => {
    // todo: api call
    const response = await fetch(`${host}/api/note/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json)


    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote,getNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
