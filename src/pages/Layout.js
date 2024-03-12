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
import Wishlist from "./gallery/Wishlist";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, userSelector } from "../store/auth/selectors";
import { getActiveUser } from "../store/auth/slice";
import 'bootstrap/dist/css/bootstrap.min.css';

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

                    <Redirect from='/authors/my-galleries' to="/my-galleries"/>
                    <Redirect from='/update-gallery/my-galleries' to="/my-galleries"/>
                    <Redirect from='/galleries/my-galleries' to="/my-galleries"/>  

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

                    <PrivateRoute path="/wishlist">
                        <Wishlist/>
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