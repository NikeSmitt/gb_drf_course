import React from 'react';
import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                        <li className="nav-item">
                            <Link to="/users">Пользователи</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/projects">Проекты</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/todos">Todos</Link>
                        </li>
                    </ul>

                </div>
            </nav>
        </div>
    );
};

export default Menu;