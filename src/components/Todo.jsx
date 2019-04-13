import React, { useState, useEffect, useReducer, useRef } from 'react';
import axios from 'axios';

const todo = props => {

  // const [todoName, setTodoName] = useState('');
  // const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState({ status: true, message: 'Loading...' });
  const todoInputEl = useRef();

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
      console.log('Get Todos');
      getTodos();
    } catch (error) {
      console.log(error);
    }
    return () => {
      console.log('CleanUp');
    };
  }, []);

  // const inputChangedHandler = (event) => {
  //   setTodoName(event.target.value);
  // }

  const getTodos = () => {
    axios.get('https://react-hooks-3c5da.firebaseio.com/todos.json')
      .then(res => {
        console.log(res);
        const { data } = res;
        const todos = [];
        for (const key in data) {
          todos.push({ id: key, name: data[key].name });
        }
        dispatch({ type: 'SET', payload: todos });
        setLoading({ status: false, message: '' });
      });
  }

  const todoAddHandler = async () => {

    const todoName = todoInputEl.current.value;

    try {
      setLoading({ status: true, message: 'Adding Todo..' });
      axios.post('https://react-hooks-3c5da.firebaseio.com/todos.json', { name: todoName })
        .then(res => {
          getTodos();
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const todoRemoveHandler = todoId => {
    try {
      axios.delete(`https://react-hooks-3c5da.firebaseio.com/todos/${todoId}.json`)
        .then(res => {
          console.log(res);
          dispatch({ type: 'REMOVE', payload: todoId });
        });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading.status) {
    return <p>{loading.message}</p>
  }

  return (
    <React.Fragment>
      <input type="text" placeholder="Todo" ref={todoInputEl} />
      <button type="button" onClick={todoAddHandler}>Add</button>
      <ul>
        {
          todoList.map(todo => <li onClick={() => todoRemoveHandler(todo.id)} key={todo.id}>{todo.name}</li>)
        }
      </ul>
    </React.Fragment>
  )
}

export default todo;
