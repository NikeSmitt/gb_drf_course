import React from 'react';
import {useNavigate, useParams} from "react-router-dom";

const ProjectDetail = ({projects, deleteSubmit}) => {
    const navigate = useNavigate()
    const detailedProjectId = useParams()
    const filteredProject = projects.filter(project => project.id === detailedProjectId.id)[0]
    return (
        <div className="card">
            <div className="card-body">
                <h5 className='card-title'>{filteredProject.projectName}</h5><h6
                className="card-subtitle mb-2 text-muted">{filteredProject.id}</h6>
                <p className="card-text">{filteredProject.gitRepo}</p>
                {filteredProject.members.map((member, index) => {
                    return (<p><a href={member}>Member {index + 1}</a></p>)
                })}
                <button onClick={() => {
                    deleteSubmit(filteredProject.id)
                    navigate('/projects/')
                }} className="btn btn-danger">Delete</button>
            </div>
        </div>
    );
};

export default ProjectDetail;