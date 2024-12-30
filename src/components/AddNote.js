import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: '', description: '', tag: 'Default' });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag); // Add the note via context
    setNote({ title: '', description: '', tag: 'Default' }); // Clear the form after submission
    props.showAlert("Added Notes Successfully","success")
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add a Note</h2>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm p-4">
            <form className="mb-4" onSubmit={handleClick}>
              {/* Note Title */}
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Note Title</label>
                <input 
                  type="text" 
                  className={`form-control form-control-lg ${note.title.length < 5 ? 'is-invalid' : ''}`}
                  id="title" 
                  name="title" 
                  placeholder="Enter the title" 
                  required 
                  minLength={5}
                  value={note.title}
                  onChange={onChange}
                />
                {note.title.length < 5 && (
                  <div className="invalid-feedback">Title must be at least 5 characters long.</div>
                )}
              </div>

              {/* Note Description */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Note Description</label>
                <textarea 
                  className={`form-control form-control-lg ${note.description.length < 5 ? 'is-invalid' : ''}`} 
                  id="description" 
                  name="description" 
                  rows="4" 
                  placeholder="Enter the description" 
                  required
                  minLength={5}
                  value={note.description}
                  onChange={onChange}
                />
                {note.description.length < 5 && (
                  <div className="invalid-feedback">Description must be at least 5 characters long.</div>
                )}
              </div>

              {/* Note Tag */}
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">Note Tag</label>
                <input 
                  type="text" 
                  className="form-control form-control-lg" 
                  id="tag" 
                  name="tag" 
                  placeholder="Enter the tag" 
                  required 
                  value={note.tag}
                  onChange={onChange}
                />
              </div>

              {/* Add Note Button */}
              <button 
                disabled={note.title.length < 5 || note.description.length < 5}
                type="submit" 
                className="btn btn-success btn-lg w-100"
              >
                Add Note
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
