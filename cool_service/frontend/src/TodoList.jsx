import React from 'react';
import UserItem from "./UserItem";

const TodoList = ({todos}) => {
    return (
        <div>
            <table className="table container-md mt-5">
                    <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Author</th>
                        <th>Content</th>
                        <th>Active</th>
                        <th>Creation date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {todos.map(todo => {
                        return <TodoItem todo={todo} key={todo.id}/>
                    })}
                    </tbody>
                </table>
        </div>
    );
};

const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.project.projectName}</td>
            <td>{todo.author}</td>
            <td>{todo.content}</td>
            <td>{ todo.active ? 'Active' : 'Not Active'}</td>
            <td>{new Date(todo.createdAt).toLocaleDateString()}</td>
        </tr>
    )
}

export default TodoList;