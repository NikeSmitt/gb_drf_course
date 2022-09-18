import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const TodoCreateForm = ({projects, users, createTodo}) => {
    const [todo, setTodo] = useState({project: "", author: "", content: "", active: true})
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        createTodo(todo)
        navigate("/todos/")
        e.preventDefault()

    }

    return (
        <div className="container-md">
            <form className="form m-auto w-50" onSubmit={event => {handleSubmit(event)}}>
                <div className="mb-3 mt-2">
                    <label htmlFor="selectProject">Select project</label>
                    <select
                        className="form-select"
                        onChange={event => {setTodo({...todo, project: event.target.value})}}
                        id="selectProject">
                        {projects.map(project => {
                            return <option key={project.id} value={project.id}>{project.projectName}</option>
                        })}
                    </select>
                </div>

                <div className="mb-3 mt-2">
                    <label htmlFor="selectAuthor">Select Author</label>
                    <select
                        className="form-select"
                        onChange={event => {setTodo({...todo, author: event.target.value})}}
                        id="selectAuthor">
                        {users.map(user => {
                            return <option key={user.id} value={user.id}>{user.username}</option>
                        })}
                    </select>
                </div>

                <div className="mb-3 mt-2">
                    <label htmlFor="contentTextArea" className="form-label">Content</label>
                    <textarea
                        onChange={event => {setTodo({...todo, content: event.target.value})}}
                        className="form-control"
                        id="contentTextArea"
                        rows="3"
                    />
                </div>

                <div className="form-check mt-2">
                    <input
                        className="form-check-input"
                        onChange={event => {setTodo({...todo, active: event.target.checked})}}
                        type="checkbox"
                        value="active"
                        id="activeCheckbox"
                        defaultChecked={todo.active}
                        />
                    <label className="form-check-label" htmlFor="activeCheckbox">Active</label>
                </div>

                <input type="submit" className="btn btn-primary mt-3 m-auto" value="Создать"/>
            </form>

        </div>
    )
}
export default TodoCreateForm;