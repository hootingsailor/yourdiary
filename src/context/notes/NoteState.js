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
          "_id": "628f556a69869710adee8701",
          "user": "628f52af38099654daede238",
          "title": "My Title updated again",
          "description": "This is my sample title updated",
          "tag": "Test",
          "date": "2022-05-26T10:24:42.826Z",
          "__v": 0
        },
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
            "_id": "628f556a69869710adee8701",
            "user": "628f52af38099654daede238",
            "title": "My Title updated again",
            "description": "This is my sample title updated",
            "tag": "Test",
            "date": "2022-05-26T10:24:42.826Z",
            "__v": 0
          },
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
            "_id": "628f556a69869710adee8701",
            "user": "628f52af38099654daede238",
            "title": "My Title updated again",
            "description": "This is my sample title updated",
            "tag": "Test",
            "date": "2022-05-26T10:24:42.826Z",
            "__v": 0
          },
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
            "_id": "628f556a69869710adee8701",
            "user": "628f52af38099654daede238",
            "title": "My Title updated again",
            "description": "This is my sample title updated",
            "tag": "Test",
            "date": "2022-05-26T10:24:42.826Z",
            "__v": 0
          }
      ];
      const [notes, setNotes] = useState(notesInitial);

    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;