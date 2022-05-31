import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "628f555e9c4e2d7e0ccebf25",
          "user": "628f52af38099654daede238",
          "title": "My Title",
          "description": "This is my sample title",
          "tag": "Test",
          "date": "2022-05-26T10:24:30.074Z",
          "__v": 0
        },
        {
          "_id": "628f556a7569869710adee8701",
          "user": "628f52af38099654daede238",
          "title": "My Title updated again",
          "description": "This is my sample title updated",
          "tag": "Test",
          "date": "2022-05-26T10:24:42.826Z",
          "__v": 0
        },
        {
            "_id": "628f555e9c46113e2d7e0ccebf25",
            "user": "628f52af38099654daede238",
            "title": "My Title",
            "description": "This is my sample title",
            "tag": "Test",
            "date": "2022-05-26T10:24:30.074Z",
            "__v": 0
          },
          {
            "_id": "628f556a6986975610adee8701",
            "user": "628f52af38099654daede238",
            "title": "My Title updated again",
            "description": "This is my sample title updated",
            "tag": "Test",
            "date": "2022-05-26T10:24:42.826Z",
            "__v": 0
          },
          {
            "_id": "628f555e9c4e2d7e0cce23bf25",
            "user": "628f52af38099654daede238",
            "title": "My Title",
            "description": "This is my sample title",
            "tag": "Test",
            "date": "2022-05-26T10:24:30.074Z",
            "__v": 0
          },
          {
            "_id": "2628f556a69869710adee8701",
            "user": "628f52af38099654daede238",
            "title": "My Title updated again",
            "description": "This is my sample title updated",
            "tag": "Test",
            "date": "2022-05-26T10:24:42.826Z",
            "__v": 0
          },
          {
            "_id": "628f555e9c4e2d7e0cce2bf25",
            "user": "628f52af38099654daede238",
            "title": "My Title",
            "description": "This is my sample title",
            "tag": "Test",
            "date": "2022-05-26T10:24:30.074Z",
            "__v": 0
          },
          {
            "_id": "628f556a692869710adee8701",
            "user": "628f52af38099654daede238",
            "title": "My Title updated again",
            "description": "This is my sample title updated",
            "tag": "Test",
            "date": "2022-05-26T10:24:42.826Z",
            "__v": 0
          }
      ];
      const [notes, setNotes] = useState(notesInitial);

    //   Add a note
      const addNote = (title, description, tag)=> {
        const note = {
          "_id": "628f556a692869s710dadee8701",
          "user": "628f52af38099654daede238",
          "title": "My Title updated again",
          "description": "This is my sample title updated",
          "tag": "Test",
          "date": "2022-05-26T10:24:42.826Z",
          "__v": 0
        };
        setNotes(notes.concat(note))
      }

    // Delete a note
      const deleteNote = (id)=> {
        const newNotes = notes.filter((note)=>{return note._id != id});
        setNotes(newNotes);
      }

    // Edit a note
      const editNote = ()=> {

      }

    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;