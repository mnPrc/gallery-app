import React from "react";

function LoginErrors({ error }) {
	return (
		<div className="text-danger">
			<p>{error && ` ${error}`}</p>
		</div>
	);
}

export default LoginErrors;