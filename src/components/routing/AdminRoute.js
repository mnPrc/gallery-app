import React from "react";
import { Redirect, Route } from "react-router";

export default function PrivateRoute({ children, ...props }) {
	const token = localStorage.getItem("token");
	const isAuthenticated = !!token;

	return (
		<Route {...props}>
			{isAuthenticated ? children : <Redirect to="/login" />}
		</Route>
	);
}