import React from "react";
import './App.css'
import UsersList from "./UsersList";
import axios from "axios";
import Menu from "./components/Menu";
import Footer from "./components/Footer";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users/').then((response) => {
            this.setState({
                users: response.data
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (

            <div className="App">
                <Menu />
                <UsersList className='app__content' users={this.state.users}/>
                <Footer />
            </div>
        );
    }
}

export default App;
