import axios from "axios";
import {
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	USER_LOADED_SUCCESS,
	USER_LOADED_FAIL,
	AUTHENTICATED_SUCCESS,
	AUTHENTICATED_FAIL,
	PASSWORD_RESET_SUCCESS,
	PASSWORD_RESET_FAIL,
	PASSWORD_RESET_CONFIRM_SUCCESS,
	PASSWORD_RESET_CONFIRM_FAIL,
	SIGNUP_SUCCESS,
	SIGNUP_FAIL,
	ACTIVATION_SUCCESS,
	ACTIVATION_FAIL,
	GOOGLE_AUTH_SUCCESS,
	GOOGLE_AUTH_FAIL,
	FACEBOOK_AUTH_SUCCESS,
	FACEBOOK_AUTH_FAIL,
	LOGOUT,
	LOADING,
} from "./types";

export const load_user = () => async (dispatch) => {
	const accessToken = localStorage.getItem("access");
	if (accessToken) {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `bearer ${accessToken}`,
				Accept: "application/json",
			},
		};

		try {
			const res = await axios.get(
				`${process.env.API_URL}/api/users/me/`,
				config
			);

			dispatch({
				type: USER_LOADED_SUCCESS,
				payload: res.data,
			});
		} catch (err) {
			dispatch({
				type: USER_LOADED_FAIL,
			});
		}
	}
};

export const checkAuthenticated = () => async (dispatch) => {
	const accessToken = localStorage.getItem("access");

	console.log(process.env.API_URL);

	dispatch({
		type: LOADING,
	});

	if (accessToken) {
		const config = {
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		};

		const body = JSON.stringify({ token: accessToken });

		try {
			const res = await axios.post(
				`${process.env.API_URL}/api/auth/jwt/verify/`,
				body,
				config
			);

			if (res.data.message !== "token_not_valid") {
				dispatch({
					type: AUTHENTICATED_SUCCESS,
				});
				dispatch(load_user());
			} else {
				dispatch({
					type: AUTHENTICATED_FAIL,
				});
			}
		} catch (err) {
			dispatch({
				type: AUTHENTICATED_FAIL,
			});
		}
	}
};

export const login = (email, password) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post(
			`${process.env.API_URL}/api/auth/jwt/create/`,
			body,
			config
		);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		dispatch(load_user());
	} catch (err) {
		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

export const signup = (username, email, password) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({
		username,
		email,
		password,
	});

	try {
		const res = await axios.post(
			`${process.env.API_URL}/api/auth/register/`,
			body,
			config
		);

		dispatch({
			type: SIGNUP_SUCCESS,
			payload: res.data,
		});
		dispatch(load_user());
	} catch (err) {
		dispatch({
			type: SIGNUP_FAIL,
		});
	}
};

export const logout = () => (dispatch) => {
	dispatch({
		type: LOGOUT,
	});
};
