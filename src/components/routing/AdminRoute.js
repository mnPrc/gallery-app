import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { isAdmin } from "../../store/auth/selectors";

export default function AdminRoute({ children, ...props }) {
	const isUserAdmin = useSelector(isAdmin);

	return (
		<Route {...props}>
			{isUserAdmin == true ? children : <Redirect to="/" />}
		</Route>
	);
}