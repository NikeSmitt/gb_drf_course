import {useState} from "react";
import {useNavigate} from "react-router-dom";

const ProjectCreateForm = ({users, addProject}) => {
    const [project, setProject] = useState({"projectName": "", "gitRepo": "", "members": [],})
    const navigate = useNavigate()

    const handleMembersChanged = (e) => {
        if (! e.target.selectedOptions) {
            setProject({...project, members: []})
        }
        let members = []
        for (let i=0; i < e.target.selectedOptions.length; i++) {
            members.push(e.target.selectedOptions.item(i).value)
        }
        setProject({...project, members: members})
    }

    const handleSubmit = (event) => {
        addProject(project.projectName, project.gitRepo, project.members)
        navigate('/projects/')
        event.preventDefault()

    }

    return (
        <form className="form container w-50 d-flex flex-column" onSubmit={event => handleSubmit(event)}>
            <label className="mt-2">
                Название проекта
                <input className="form-control"
                       type="text"
                       value={project.projectName}
                       onChange={e => setProject({...project, projectName: e.target.value})}

                />
            </label>
            <label className="mt-2">
                Ссылка на репозиторий
                <input className="form-control"
                       type="text"
                       value={project.gitRepo}
                       onChange={e => setProject({...project, gitRepo: e.target.value})}

                />
            </label>
            <label className="mt-2">
                Участники проекта
                <select
                    className="form-select"
                    multiple
                    onChange={e => handleMembersChanged(e)}
                >
                    {users.map(user => {
                        return <option key={user.id} value={user.id}>{user.username}</option>
                    })}


                </select>
            </label>
            <input type="submit" value="Добавить" className="btn btn-primary mt-3 m-auto w-25"/>
        </form>
    )
}

export default ProjectCreateForm

