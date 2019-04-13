import React from 'react'

const Header = props => {
    return (
        <div>
            <button onClick={props.onLoadTodos}>Todo List</button> | 
            <button onClick={props.onLoadAuth}>Auth</button>
        </div>
    )
}

export default Header
