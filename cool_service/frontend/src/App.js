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
    Link, Redirect, useNavigate
} from "react-router-dom";
import ProjectList from "./ProjectList";
import TodoList from "./TodoList";
import ProjectDetail from "./ProjectDetail";
import LoginForm from "./components/LoginForm";

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
                token: savedToken
            })
            this.loadData()
        }
    }

    loadData() {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${this.state.token}`
        }
        axios.get('http://127.0.0.1:8000/api/users/', {headers}).then((response) => {
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
                        <Route path='/projects' element={<ProjectList projects={this.state.projects}/>}/>
                        <Route path='/projects/:id' element={<ProjectDetail projects={this.state.projects}/>}/>
                        <Route path='/todos' element={<TodoList todos={this.state.todos}/>}/>
                        <Route path='/login'
                               element={<LoginForm saveTokenAndUsername={(newToken, username) => this.getSaveTokenUsername(newToken, username)}/>}/>
                    </Routes>
                    <Footer/>
                </BrowserRouter>

            </div>
        );
    }
}

export default App;
