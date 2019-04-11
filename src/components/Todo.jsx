import React, { useState } from 'react';

const todo = props => {

  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);

  const inputChangedHandler = (event) => {
    setTodoName(event.target.value);
  }

  const todoAddHandler = () => {
    setTodoList(todoList.concat(todoName));
  }

  return (
    <React.Fragment>
      <input type="text" placeholder="Todo" onChange={inputChangedHandler} value={todoName} />
      <button type="button" onClick={todoAddHandler} class="btn btn-outline-primary">Add</button>
      <ul>
        {
          todoList.map(todo => <li>{todo}</li>)
        }
      </ul>
    </React.Fragment>
  )
}

export default todo;
