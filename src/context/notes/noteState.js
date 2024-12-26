import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  // Initializing the state with an object
  const [state, setState] = useState({
    name: "Diya",
    Class: "TY-A"
  });

  // Function to update the state after 1 second
  const update = () => {
    setTimeout(() => {
      setState({ name: "Mansi", Class: "TY-B" });
    }, 1000);
  };

  return (
    <NoteContext.Provider value={{ state, update }}>
        {/* Now this state and function can be used anywhere by exporting this js file */}
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
