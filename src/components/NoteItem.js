import React, { useContext } from "react";
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context; // Destructure editNote from context
  const { note,updateNote } = props;


  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <h6 className="card-title">{note.tag}</h6>
          <p className="card-text">{note.description}</p>

          {/* Edit Icon - Trigger Edit Function */}
          <i
            className="fas fa-pen-to-square mx-2"
            onClick={()=>{updateNote(note)}
          }
          ></i>

          {/* Delete Icon - Trigger Delete Function */}
          <i
            className="fas fa-trash mx-2"
            onClick={() => {deleteNote(note._id)
              props.showAlert("Deleted Successfully","success")}
            }
          ></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
