import React, {useEffect} from 'react';
import UserItem from "./UserItem";
import {Link} from "react-router-dom";

const TodoList = ({todos, deleteSubmit, projects, users}) => {

    return (
        <div className="container-md mt-5">
            <table className="table ">
                <thead>
                <tr>
                    <th>Project Name</th>
                    <th>Author</th>
                    <th>Content</th>
                    <th>Active</th>
                    <th>Creation date</th>
                    <th>Operation</th>
                </tr>
                </thead>
                <tbody>
                {todos.map(todo => {
                    return <TodoItem todo={todo}
                                     key={todo.id}
                                     projects={projects}
                                     users={users}
                                     deleteSubmit={deleteSubmit}/>
                })}
                </tbody>
            </table>
            <Link to="/todos/create" className="btn btn-primary">Создать</Link>
        </div>
    );
};

const TodoItem = ({todo, deleteSubmit, projects, users}) => {

    useEffect(() => {
        console.log(projects)
        console.log(users)
    })

    const findProjectName = (projects, projectID) => {
        return projects.filter(project => project.id === projectID)[0].projectName
    }

    const findUserName = (users, userID) => {
        return users.filter(user => user.id === userID)[0].username
    }

    return (
        <tr className={(todo.active ? "" : "bg-light text-muted")}>
            <td>{findProjectName(projects, todo.project)}</td>
            <td>{findUserName(users, todo.author)}</td>
            <td>{todo.content}</td>
            <td>{todo.active ? 'Active' : 'Not Active'}</td>
            <td>{new Date(todo.createdAt).toLocaleDateString()}</td>
            <td>
                <button
                    onClick={() => deleteSubmit(todo.id)}
                    className={"btn btn-danger " + (todo.active ? "" : "disabled")}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}

export default TodoList;