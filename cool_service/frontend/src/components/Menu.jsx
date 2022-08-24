import React from 'react';
import {Link} from "react-router-dom";

const Menu = ({logout, username, isLogin}) => {
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid ">
                    <ul className="navbar-nav flex-row">
                        <li className="nav-item ms-5">
                            <Link className="link-secondary" to="/users">Пользователи</Link>
                        </li>
                        <li className="nav-item ms-5">
                            <Link className="link-secondary" to="/projects">Проекты</Link>
                        </li>
                        <li className="nav-item ms-5">
                            <Link className="link-secondary " to="/todos">Todos</Link>
                        </li>
                        <li className="nav-item ms-5">
                            { isLogin
                                ? <p>{username} <a className="link-secondary" style={{cursor: 'pointer'}} onClick={logout}>Logout</a></p>
                                : <Link className="link-secondary " to="/login">Sign in</Link>
                            }

                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Menu;