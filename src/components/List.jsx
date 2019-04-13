import React from 'react'

const List = props => {
    console.log('Render the list...')
    return (
        <ul>
            {
                props.todoList.map(todo => <li onClick={() => props.todoRemoveHandler(todo.id)} key={todo.id}>{todo.name}</li>)
            }
        </ul>
    )
}

export default List
