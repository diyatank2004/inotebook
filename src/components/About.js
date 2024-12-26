import React, { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';

const About = () => {
  const context = useContext(noteContext);
  useEffect(()=>{
    context.update();
  },[])
  return (
    <div>
      This is About {context.state.name} and she is in {context.state.Class}
    </div>
  );
};

export default About;
