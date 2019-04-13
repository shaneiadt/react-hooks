import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const todo = props => {

  const [todoName, setTodoName] = useState('');
  // const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState({ status: true, message: 'Loading...' });

  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return state.concat(action.payload);
      case 'SET':
        return action.payload;
      case 'REMOVE':
        return state.filter((todo) => todo.id !== action.payload);
      default:
        return state;
    }
  };

  const [todoList, dispatch] = useReducer(todoListReducer, []);

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
          dispatch({ type: 'SET', payload: todos.map(todo => todo.name) });
          setLoading({ status: false, message: '' });
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
      setLoading({ status: true, message: 'Adding Todo..' });
      dispatch({ type: 'ADD', payload: todoList.concat(todoName) });
      axios.post('https://react-hooks-3c5da.firebaseio.com/todos.json', { name: todoName })
        .then(res => {
          setLoading({ status: false, message: '' });
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  }

  if (loading.status) {
    return <p>{loading.message}</p>
  }

  return (
    <React.Fragment>
      <input type="text" placeholder="Todo" onChange={inputChangedHandler} value={todoName} />
      <button type="button" onClick={todoAddHandler}>Add</button>
      <ul>
        {
          todoList.map((todo, i) => <li key={i}>{todo}</li>)
        }
      </ul>
    </React.Fragment>
  )
}

export default todo;
