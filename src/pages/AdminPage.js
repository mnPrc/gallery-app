import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSelector } from "../store/auth/selectors";
import { getUsers, manageAdminPriv } from "../store/auth/slice";

function AdminPage() {
    const dispatch = useDispatch();
    const users = useSelector(usersSelector);
    
    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const handleManageAdminPrivileges = (user_id) => {
        dispatch(manageAdminPriv(user_id));
        dispatch(getUsers());
    }

    return (
        <div>
            <h3>Admin Page</h3>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Admin</th>
                        <th>Assign</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.is_admin ? "Yes" : "No"}</td>
                            <td>
                                {user.is_admin ? (
                                    <button onClick={() => handleManageAdminPrivileges(user.id)}>Revoke Admin</button>
                                ) : (
                                    <button onClick={() => handleManageAdminPrivileges(user.id)}>Give Admin</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default AdminPage;
