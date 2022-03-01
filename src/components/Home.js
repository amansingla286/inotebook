import React from "react";
import Notes from "./Notes";

export default function Home(props) {
  return (
    <div>
     
      <Notes showalert1={props.showalert}/>
    </div>
  );
}
