import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, setErrors } from '../store/auth/slice';
import { useHistory } from 'react-router';
import {
    selectErrors,
} from '../store/auth/selectors';
import LoginErrors from '../components/errors/LoginErrors';


function Login() {
    const [user, setUserData] = useState({
        email: '',
        password: '',
    });

    const errors = useSelector(selectErrors);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setErrors());
        dispatch(
            login({
                credentials: user,
                meta: {
                    onSuccess: () => {
                        history.push('/')
                    },
                },
            })
        );
    };


    return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit} className="login-form">
				<label htmlFor="email" className="col-form-label col-25">
					Email:
				</label>
				<br />
				<input
					className="form-control col-75"
					type="email"
					name="email"
					required
					placeholder="Enter your email address..."
					value={user.email}
					onChange={({ target }) =>
						setUserData({ ...user, email: target.value })
					}
				/>

				<label htmlFor="password" className="col-form-label col-25">
					Password:
				</label>
				<br />
				<input
					className="form-control col-75"
					type="password"
					name="password"
					required
					placeholder="Enter your password..."
					value={user.password}
					onChange={({ target }) =>
						setUserData({ ...user, password: target.value })
					}
				/>
				<button className="my-button">Login</button>
			</form>
			{errors && <LoginErrors error={errors} />}
		</div>
	);
}

export default Login;