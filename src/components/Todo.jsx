import React, { useState } from 'react';

const todo = props => {

  const inputState = useState('');

  const inputChangedHandler = (event) => {
    inputState[1](event.target.value);
  }

  return (
    <React.Fragment>
      <input type="text" placeholder="Todo" onChange={inputChangedHandler} value={inputState[0]} />
      <button type="button" class="btn btn-outline-primary">Add</button>
      <ul>
        <li>{inputState[0]}</li>
      </ul>
    </React.Fragment>
  )
}

export default todo;
