import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, fetchNotes, editNote } = context; // Assuming editNote is defined in your context

  // Fetch notes when the component loads
  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchNotes();
    }
    else{
      navigate('/login');
    }
  }, [fetchNotes]);

  const ref = useRef(null);
  const refClose = useRef(null);

  // State to hold the currently edited note's details
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  // Opens the modal and fills in the current note's details
  const updateNote = (currentNote) => {
    ref.current.click(); // Triggers modal opening
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
  };

  // Handles the form submission for updating the note
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.title, note.description, note.tag); // Updates the note using context
    refClose.current.click(); // Closes the modal after updating
    props.showAlert("Updated Successfully","success")
  };

  // Handles form input changes
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert}/> {/* Component to add a new note */}

      {/* Hidden button to trigger the modal programmatically */}
      <button
        type="button"
        ref={ref}
        className="btn btn-success d-none"
        data-bs-toggle="modal"
        data-bs-target="#editNoteModal"
      >
        Edit Note
      </button>

      {/* Modal for editing a note */}
      <div
        className="modal fade"
        id="editNoteModal"
        tabIndex="-1"
        aria-labelledby="editNoteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editNoteModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form id="editNoteForm">
                <div className="mb-3">
                  <label htmlFor="noteTitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="noteTitle"
                    name="title"
                    minLength={5}
                    placeholder="Enter title"
                    required
                    value={note.title}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="noteDescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="noteDescription"
                    name="description"
                    rows="3"
                    placeholder="Enter description"
                    value={note.description}
                    required
                    minLength={5}
                    onChange={onChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="noteTag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="noteTag"
                    name="tag"
                    placeholder="Enter tag"
                    required
                    value={note.tag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose} // This closes the modal
              >
                Close
              </button>
              <button
                disabled={note.title.length < 5 || note.description.length < 5}
                type="button"
                className="btn btn-success"
                onClick={handleClick} // Calls handleClick to update the note
                id="saveChangesBtn"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Render list of notes */}
      <div className="row my-3">
        <h2>Your notes</h2>
        {notes.length === 0 && <div>No notes to display</div>}
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
