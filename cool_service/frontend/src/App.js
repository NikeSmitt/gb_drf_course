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
  Link
} from "react-router-dom";
import ProjectList from "./ProjectList";
import TodoList from "./TodoList";
import ProjectDetail from "./ProjectDetail";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            projects: [],
            todos: [],
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then((response) => {
            this.setState({
                users: response.data.results
            })
        }).catch((error) => {
            console.log(error)
        })

        axios.get('http://127.0.0.1:8000/api/projects/').then((response) => {
            this.setState({
                projects: response.data.results
            })
        }).catch((error) => {
            console.log(error)
        })

        axios.get('http://127.0.0.1:8000/api/todos/').then((response) => {
            this.setState({
                todos: response.data.results
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (

            <div className="App">
                <BrowserRouter>
                    <Menu/>
                    <Routes>
                        <Route  path='/' element={<UsersList className='app__content' users={this.state.users}/>}/>
                        <Route  path='/users' element={<UsersList className='app__content' users={this.state.users}/>}/>
                        <Route  path='/projects' element={<ProjectList className='app__content' projects={this.state.projects}/>}/>
                        <Route path='/projects/:id' element={<ProjectDetail className='app__content' projects={this.state.projects} />}/>
                        <Route  path='/todos' element={<TodoList className='app__content' todos={this.state.todos} />}/>

                    </Routes>
                    <Footer/>
                </BrowserRouter>

            </div>
    );
    }
    }

    export default App;
