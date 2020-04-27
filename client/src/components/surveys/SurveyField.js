//renders a single label and text input
import React from 'react';
//props object (                      )
export default ({ input, label, meta: {error, touched } }) => {
  //meta and touched property

  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px'}}/>
      <div className="red-text" style={{ marginBottom: '20px'}}>
        {touched && error }
      </div>
    </div>
  );
};
