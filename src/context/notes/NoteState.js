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
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNjZjZjRlYTAwODJkNTI4YTAxOGM4In0sImlhdCI6MTY0NTc4MjI2N30.htGPkIv-mFL5O0Sw3cOeoDdoj6l0zEFyF98N-ZyhFns"
      },
    });
    const json=await response.json()
console.log(json)
setNotes(json)
  }

  // Add a note
  const addNote =async (title, description, tag) => {
    // todo: api call
    // Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNjZjZjRlYTAwODJkNTI4YTAxOGM4In0sImlhdCI6MTY0NTc4MjI2N30.htGPkIv-mFL5O0Sw3cOeoDdoj6l0zEFyF98N-ZyhFns"
      },
      body: JSON.stringify({title,description,tag}),
    });

    const note = {
      _id: "6219fb35625ef05d77a91da8",
      user: "62166cf4ea0082d528a018c8",
      title: title,
      description: description,
      tag: tag,
      date: "2022-02-26T10:04:37.155Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Edit  a note
  const editNote = async (id, title, description, tag) => {
    // Api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNjZjZjRlYTAwODJkNTI4YTAxOGM4In0sImlhdCI6MTY0NTc4MjI2N30.htGPkIv-mFL5O0Sw3cOeoDdoj6l0zEFyF98N-ZyhFns"
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = response.json();

    //logic to edit notes

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  // delete a note
  const deleteNote = (id) => {
    // todo: api call

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
