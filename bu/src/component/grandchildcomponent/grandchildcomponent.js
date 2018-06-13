import React from 'react';

const grandchildcomponent = (props) => (
    <div >
         <div >{props.label}</div>
        <button 
            onClick={props.removed} 
            disabled={props.disabled}>Less</button>
        <button 
            onClick={props.added}>More</button>
    </div>
);

export default grandchildcomponent;