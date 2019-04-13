import React, { useState, useEffect } from 'react';
import axios from 'axios';

const todo = props => {

  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    try {
      axios.get('https://react-hooks-3c5da.firebaseio.com/todos.json')
        .then(res => {
          console.log(res);
          const { data } = res;
          const todos = [];
          for (const key in data) {
            todos.push({ id: key, name: data[key].name });
          }
          setTodoList(todos.map(todo => todo.name));
        });
    } catch (error) {
      console.log(error);
    }
    return () => {
      console.log('CleanUp');
    };
  }, [todoName]);

  const inputChangedHandler = (event) => {
    setTodoName(event.target.value);
  }

  const todoAddHandler = async () => {
    try {
      setTodoList(todoList.concat(todoName));
      const response = await axios.post('https://react-hooks-3c5da.firebaseio.com/todos.json', { name: todoName });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
