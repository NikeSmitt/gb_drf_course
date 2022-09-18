import React from "react";
import './App.css'
import UsersList from "./UsersList";
import axios from "axios";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import ProjectList from "./ProjectList";
import TodoList from "./TodoList";
import ProjectDetail from "./ProjectDetail";
import LoginForm from "./components/LoginForm";
import ProjectCreateForm from "./ProjectCreateForm"
import TodoCreateForm from "./TodoCreateForm";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            users: [],
            projects: [],
            todos: [],
            token: ''
        }
    }

    componentDidMount() {
        const savedToken = localStorage.getItem('token')
        if (!!savedToken) {
            this.setState({
                ...this.state,
                token: savedToken
            }, () => this.loadData())

        }
    }

    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Token ${this.state.token}`
        }
    }

    getURL(path) {
        const baseURL = 'http://127.0.0.1:8000/'
        return `${baseURL}${path}`
    }

    loadData() {
        const headers = this.getHeaders()
        axios.get('http://127.0.0.1:8000/api/users/v2/', {headers}).then((response) => {
            this.setState({
                users: response.data.results
            })
        }).catch((error) => {
            console.log(error)
        })

        axios.get('http://127.0.0.1:8000/api/projects/', {headers}).then((response) => {
            this.setState({
                projects: response.data.results
            })
        }).catch((error) => {
            console.log(error)
        })

        axios.get('http://127.0.0.1:8000/api/todos/', {headers}).then((response) => {
            this.setState({
                todos: response.data.results
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    getSaveTokenUsername(newToken, username) {
        localStorage.setItem('token', newToken)
        this.setState({
            username: username,
            users: [],
            projects: [],
            todos: [],
            token: newToken
        }, () => this.loadData())
    }

    deleteTodo(todoId) {
        const headers = this.getHeaders()
        // console.log(`Todos to delete ${todoId}`)
        const url = this.getURL('api/todos/') + todoId
        axios.delete(url, {headers}).then((response) => {
            this.loadData()
        }).catch((error) => {
            console.log(error)
            this.setState({...this.state, todos: []})
        })

    }

    deleteProject(projectId) {
        const headers = this.getHeaders()
        const url = this.getURL('api/projects/') + projectId
        axios.delete(url, {headers}).then(response => {
            this.loadData()
        }).catch(error => {
            this.setState({...this.state, projects: []})
        })
    }



    createProject(projectName, gitRepo, members) {
        const headers = this.getHeaders()
        const data =  {projectName: projectName, gitRepo: gitRepo, members: members}
        const url = this.getURL('api/projects/')
        // console.log(data)
        axios.post(url, data, {headers}).then(response =>  {
            this.loadData()
        }).catch(error => {
            console.log(error)
        })
    }

    createTodo(todo) {
        const headers = this.getHeaders()
        const url = this.getURL('api/todos/')
        axios.post(url, todo, {headers}).then(response => {
            this.loadData()
        }).catch(error => {
            console.log(error)
        })
    }


    render() {
        return (

            <div className="App">
                <BrowserRouter>
                    <Menu logout={() => this.getSaveTokenUsername('', '')}
                          isLogin={!!this.state.token}
                          username={this.state.username}/>
                    <Routes>
                        <Route path='/' element={<UsersList users={this.state.users}/>}/>
                        <Route path='/users' element={<UsersList users={this.state.users}/>}/>
                        <Route path='/projects' element={
                            <ProjectList
                                projects={this.state.projects}
                                users={this.state.users}/>}/>
                        <Route
                            path='/projects/:id'
                            element={
                                <ProjectDetail
                                    projects={this.state.projects}
                                    deleteSubmit={projectId => this.deleteProject(projectId)}
                                />}
                        />
                        <Route
                            path='/todos'
                            element={
                                <TodoList
                                    todos={this.state.todos}
                                    projects={this.state.projects}
                                    users={this.state.users}
                                    deleteSubmit={(todoId) => this.deleteTodo(todoId)}
                                />}
                        />
                        <Route path='/login'
                               element={<LoginForm
                                   saveTokenAndUsername={(newToken, username) => this.getSaveTokenUsername(newToken, username)}/>}/>
                        <Route
                            path="/projects/create"
                            element={
                                <ProjectCreateForm
                                    users={this.state.users}
                                    addProject={(projectName, gitRepo, members) => this.createProject(projectName, gitRepo, members)}/>
                            }
                        />
                        <Route
                            path="/todos/create"
                            element={<TodoCreateForm
                                projects={this.state.projects}
                                users={this.state.users}
                                createTodo={todo => this.createTodo(todo)}
                            />}
                        />
                    </Routes>
                    <Footer/>
                </BrowserRouter>

            </div>
        );
    }
}

export default App;
