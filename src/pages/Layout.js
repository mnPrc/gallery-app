import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom"
import Navbar from "../components/Navbar";
import Login from "./Login";
import Register from "./Register";
import GuestRoute from "../components/routing/GuestRoute";
import PrivateRoute from "../components/routing/PrivateRoute";
import CreateGallery from "./gallery/CreateGallery";
import SingleGallery from "./gallery/SingleGallery";
import GalleriesApp from "./GalleriesApp";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, userSelector } from "../store/auth/selectors";
import { getActiveUser } from "../store/auth/slice";

function Layout() {
    const activeUser = useSelector(userSelector);
    const isUserAuthenticated = useSelector(isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        if(isAuthenticated){
            dispatch(getActiveUser())
        }
    },[]) 

    return(
        <div>
            <Router>
                <Navbar/>
                <Switch>
                    <GuestRoute path="/login">
						<Login />
					</GuestRoute>

					<GuestRoute path="/register">
						<Register />
					</GuestRoute>

                    <Route exact path="/galleries">
						<GalleriesApp />
					</Route>

                    <PrivateRoute path="/my-galleries">
                        <GalleriesApp my_id={isUserAuthenticated ? activeUser.id : null}/>
                    </PrivateRoute>

                    <Route path="/authors/:id">
                        <GalleriesApp/>
                    </Route>
                    
                    <PrivateRoute path="/create">
                        <CreateGallery/>
                    </PrivateRoute>

                    <PrivateRoute path="/update-gallery/:id">
                        <CreateGallery/>
                    </PrivateRoute>

                    <PrivateRoute path="/galleries/:id">
                        <SingleGallery/>
                    </PrivateRoute>

                    <Route exact path="/">
                        <Redirect to="/galleries"/>
                    </Route>  
                </Switch>
            </Router>
        </div>
    );
}

export default Layout;