import React, { useState } from 'react';

const todo = props => {

  const [todoName, setTodoName] = useState('');

  const inputChangedHandler = (event) => {
    setTodoName(event.target.value);
  }

  return (
    <React.Fragment>
      <input type="text" placeholder="Todo" onChange={inputChangedHandler} value={todoName} />
      <button type="button" class="btn btn-outline-primary">Add</button>
      <ul>
        <li>{todoName}</li>
      </ul>
    </React.Fragment>
  )
}

export default todo;
