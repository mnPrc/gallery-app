import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom"
import Navbar from "../components/Navbar";
import HomePage from "./HomePage";
import Login from "./Login";
import Register from "./Register";
import GuestRoute from "../components/routing/GuestRoute";
import PrivateRoute from "../components/routing/PrivateRoute";
import CreateGallery from "./gallery/CreateGallery";
import SingleGallery from "./gallery/SingleGallery";

function Layout() {
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
						<HomePage />
					</Route>
                    
                    <PrivateRoute path="/create">
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