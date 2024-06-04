import React, { useEffect } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { isAdmin, isAuthenticated, userSelector } from '../store/auth/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { getActiveUser, logout } from '../store/auth/slice';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function Navbar() {
    const isUserAuthenticated = useSelector(isAuthenticated);
    const isUserAdmin = useSelector(isAdmin);
    const activeUser = useSelector(userSelector);
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    useEffect(() =>{
        dispatch(getActiveUser(id))
    },[id])

    async function handleLogout() {
        dispatch(
            logout({
                meta: {
                    onSuccess: () => {
                        history.replace('/login');
                    },
                },
            })
        );
    }

  return (
    <div>
			<nav className="navbar navbar-color navbar-expand-lg">
                
                <Link
					className="navbar-item"
					to="/galleries"
				>
					Galleries
				</Link>
                
                {isUserAuthenticated && (
                    <Link 
                    className="navbar-item"
                    to="/create">
                        Create Gallery
                    </Link>
                )}

                {isUserAuthenticated &&(
                    <Link 
                    className="navbar-item"
                    to="my-galleries">
                        My Galleries
                    </Link>
                )}

                {isUserAuthenticated &&(
                    <Link 
                    className="navbar-item"
                    to="/wishlist">
                        Wishlist
                    </Link>
                )}

                {!isUserAuthenticated && (
					<Link 
                    className="navbar-item" 
                    to="/register">
						Register
					</Link>
				)}

				{!isUserAuthenticated && (
					<Link 
                    className="navbar-item" 
                    to="/login">
						Login
					</Link>
				)}
                
                {isUserAuthenticated && (
                    <Link
                    className="navbar-item"
                    to="transactions"
                    >
                        Transactions
                    </Link>
                )}
                
                {isUserAuthenticated && isUserAdmin && (
                    <Link 
                        className='admin-span btn'
                        to="/admin"
                    >   
                        Admin Hub
                    </Link>
                )}

                {isUserAuthenticated && (
					<span 
                    className="logout-span btn" 
                    onClick={handleLogout}>
						Logout
					</span>
				)}
                
                {isUserAuthenticated ? (
                        <h4 className="navbar-item">
                            User: {activeUser.first_name} {activeUser.last_name} 
                        </h4> 
                ):(
                    <h4 className="navbar-item">
                        Guest
                    </h4>
                )}
                {isUserAuthenticated && (
                    <h4 className="navbar-item">Balance: {activeUser.money}</h4>
                )}
            </nav>
    </div>
  );
}


export default Navbar;