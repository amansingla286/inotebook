import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial=[
    {
      "_id": "6219fb34625ef05d77a91da4",
      "user": "62166cf4ea0082d528a018c8",
      "title": "mytitle",
      "description": "please wake up early",
      "tag": "peronal",
      "date": "2022-02-26T10:04:36.779Z",
      "__v": 0
    },
    {
      "_id": "6219fb34625ef05d77a91da6",
      "user": "62166cf4ea0082d528a018c8",
      "title": "mytitle",
      "description": "please wake up early",
      "tag": "peronal",
      "date": "2022-02-26T10:04:36.937Z",
      "__v": 0
    },
    {
      "_id": "6219fb35625ef05d77a91da8",
      "user": "62166cf4ea0082d528a018c8",
      "title": "mytitle",
      "description": "please wake up early",
      "tag": "peronal",
      "date": "2022-02-26T10:04:37.155Z",
      "__v": 0
    }
  ]
  const [notes,setNotes]=useState(notesInitial)
return (
    <NoteContext.Provider value={{notes,setNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
