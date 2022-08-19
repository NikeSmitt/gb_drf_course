import React from 'react';
import {Link, useParams} from "react-router-dom";

const ProjectList = ({projects}) => {
    return (
        <div>
            <table className="table container-md mt-5">
                    <thead>
                    <tr>
                        {/*<th>Id</th>*/}
                        <th>Project Name</th>
                        <th>Git</th>
                        <th>Members</th>
                    </tr>
                    </thead>
                    <tbody>
                    {projects.map(project => {
                        return <ProjectItem project={project} key={project.id}/>
                    })}
                    </tbody>
                </table>
        </div>
    );
};

const ProjectItem = ({project}) => {
    return (
        <tr>
            {/*<td>{project.id}</td>*/}
            <td><Link to={`${project.id}`}>{project.projectName}</Link></td>
            <td>{project.gitRepo}</td>
            <td>{project.members}</td>
        </tr>
    )
}


export default ProjectList;