import React, {useState} from 'react';
import {Link} from "react-router-dom";

const ProjectList = ({projects, users}) => {
    const [filteredProjects, setFilteredProjects] = useState(projects)
    const filterProjectsByName = (e) => {
        const filteredProjects = projects.filter(project => project.projectName.includes(e.target.value))
        setFilteredProjects(filteredProjects)
    }
    return (
        <div className="container-md">
            <form className="form w-25">
                <label htmlFor="projectFilter">Фильтрация по названию</label>
                <input className="form-control"
                       type="text"
                       aria-label="projectFilter"
                       onChange={event => {filterProjectsByName(event)}}
                />
            </form>
            <table className="table mt-3">
                    <thead>
                    <tr>
                        {/*<th>Id</th>*/}
                        <th>Project Name</th>
                        <th>Git</th>
                        <th>Members</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredProjects.map(project => {
                        return <ProjectItem project={project} users={users} key={project.id}/>
                    })}
                    </tbody>
                </table>
            <Link to="/projects/create" className="btn btn-primary">Добавить проект</Link>
        </div>
    );
};

const ProjectItem = ({project, users}) => {
    const getUserNames = (allUsers, members) => {
        let output = []
        for (const member of members) {
            output.push(users.filter(user => user.id === member)[0].username)
        }
        return output.join(', ')
    }
    return (
        <tr>
            <td><Link to={`${project.id}`}>{project.projectName}</Link></td>
            <td>{project.gitRepo}</td>
            <td>{getUserNames(users, project.members)}</td>
        </tr>
    )
}


export default ProjectList;