import React from 'react';
import UserItem from "./UserItem";

const UsersList = ({users}) => {
    return (
        <div>
            <table className="table container-md mt-5">
                <thead>
                <tr>
                    <th scope="col">Username</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => {
                    return (<UserItem user={user} key={user.id}/>)
                })}

                </tbody>
            </table>
        </div>
    );
};


export default UsersList;