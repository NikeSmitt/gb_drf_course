import React from 'react';
import UserItem from "./UserItem";

const UsersList = ({users}) => {
    return (
        <div>
            <table className="table container-md mt-5">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => {
                        return <UserItem user={user} key={user.id}/>
                    })}
                    </tbody>
                </table>
        </div>
    );
};


export default UsersList;