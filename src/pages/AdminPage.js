import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin, userSelector, usersSelector } from "../store/auth/selectors";
import { getUsers, manageAdminPriv } from "../store/auth/slice";
import { selectUnapprovedComments } from "../store/gallery/selector";
import {
    adminApproveComment,
    getAllUnapprovedComments,
} from "../store/gallery/slice";

function AdminPage() {
    const dispatch = useDispatch();
    const users = useSelector(usersSelector);
    const unapprovedComments = useSelector(selectUnapprovedComments);
    const isUserAdmin = useSelector(isAdmin);
    const loggedInUser = useSelector(userSelector);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    useEffect(() => {
        dispatch(getAllUnapprovedComments());
    }, []);

    const handleManageAdminPrivileges = (user_id) => {
        dispatch(manageAdminPriv(user_id));
        dispatch(getUsers());
    };

    const handleApproveComment = (id) => {
        dispatch(adminApproveComment(id));
        dispatch(getAllUnapprovedComments());
    };
    
    return (
        <div>
            <div className="admin-container">
                <div className="table-container">
                    <h3>Manage User Roles</h3>
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
                                            <button
                                                onClick={() =>
                                                    handleManageAdminPrivileges(
                                                        user.id
                                                    )
                                                }
                                                disabled={user.id === loggedInUser.id}
                                            >
                                                Revoke Admin
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    handleManageAdminPrivileges(
                                                        user.id
                                                    )
                                                }
                                            >
                                                Give Admin
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    {unapprovedComments?.length ? (
                        <div className="unapproved-container">
                            <h3>Unapproved Comments</h3>
                            {unapprovedComments.map((comment) => (
                                <div key={comment.id}>
                                    {comment.user && (
                                        <div>
                                            <small>Comment by: </small>
                                            <div>
                                                {comment.user.first_name}{" "}
                                                {comment.user.last_name}
                                            </div>
                                        </div>
                                    )}
                                    <strong>
                                        <p>{comment.body}</p>
                                    </strong>
                                    {isUserAdmin && !comment.approved && (
                                        <button
                                            onClick={() =>
                                                handleApproveComment(comment.id)
                                            }
                                        >
                                            Approve
                                        </button>
                                    )}
                                </div>
                            ))}
                            <hr />
                        </div>
                    ) : (
                        <p>No unapproved comments</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
