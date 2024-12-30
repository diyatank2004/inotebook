import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000"; // Backend URL
  const notesInitial = []; // Initialize with an empty array

  const [notes, setNotes] = useState(notesInitial);

  // Fetch all notes from the backend
  const fetchNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') // Use the correct token
        },
      });
      const json = await response.json();
      setNotes(json); // Update state with fetched notes
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') // Use the correct token
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const newNote = await response.json();
      setNotes([...notes, newNote]); // Add new note to the state
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') // Use the correct token
        },
      });
      const json = await response.json();
      console.log(json);
      const newNotes = notes.filter((note) => note._id !== id); // Remove the note from state
      setNotes(newNotes);
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') // Use the correct token
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      console.log(json);

      // Logic to update the note in the state
      const updatedNotes = notes.map((note) => {
        if (note._id === id) {
          return { ...note, title, description, tag }; // Update the note in the state
        }
        return note;
      });
      setNotes(updatedNotes);
    } catch (error) {
      console.error("Failed to edit note:", error);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
