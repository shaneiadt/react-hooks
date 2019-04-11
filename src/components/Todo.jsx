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
      <button type="button" onClick={todoAddHandler} className="btn btn-outline-primary">Add</button>
      <ul>
        {
          todoList.map((todo, i) => <li key={i}>{todo}</li>)
        }
      </ul>
    </React.Fragment>
  )
}

export default todo;
