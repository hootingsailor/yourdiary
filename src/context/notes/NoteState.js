import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  //   Add a note
  const addNote = async (title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4ZjUyYWYzODA5OTY1NGRhZWRlMjM4In0sImlhdCI6MTY1MzU1OTk4M30.seaQMvGanK0nhG1hAhicWjYq82jDmjr9rGRh5xmjyFM'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note));
    
  }

  //   Get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4ZjUyYWYzODA5OTY1NGRhZWRlMjM4In0sImlhdCI6MTY1MzU1OTk4M30.seaQMvGanK0nhG1hAhicWjYq82jDmjr9rGRh5xmjyFM'
      }
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  }

  // Delete a note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4ZjUyYWYzODA5OTY1NGRhZWRlMjM4In0sImlhdCI6MTY1MzU1OTk4M30.seaQMvGanK0nhG1hAhicWjYq82jDmjr9rGRh5xmjyFM'
      }
    });
    const json = await response.json();
    console.log(json);

    // Logic for Client Side
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI4ZjUyYWYzODA5OTY1NGRhZWRlMjM4In0sImlhdCI6MTY1MzU1OTk4M30.seaQMvGanK0nhG1hAhicWjYq82jDmjr9rGRh5xmjyFM'
      },
      body: JSON.stringify({ id, title, description, tag })
    });
    const json = await response.json();
    console.log(json);

    // Logic for edit in Client Side
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;