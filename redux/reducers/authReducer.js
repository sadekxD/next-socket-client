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
} from "../actions/types";

const initialState = {
	access: (process.browser && localStorage.getItem("access")) || null,
	refresh: (process.browser && localStorage.getItem("refresh")) || null,
	isAuthenticated: false,
	user: null,
	isLoading: false,
};

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case LOADING:
			return {
				...state,
				isLoading: true,
			};
		case AUTHENTICATED_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
			};
		case LOGIN_SUCCESS:
			localStorage.setItem("access", payload.accessToken);
			localStorage.setItem("refresh", payload.refreshToken);
			return {
				...state,
				isAuthenticated: true,
				access: payload.accessToken,
				refresh: payload.refreshToken,
				isLoading: false,
			};
		case USER_LOADED_SUCCESS:
			return {
				...state,
				user: payload,
				isLoading: false,
			};

		case SIGNUP_SUCCESS:
			localStorage.setItem("access", payload.accessToken);
			localStorage.setItem("refresh", payload.refreshToken);
			return {
				...state,
				isAuthenticated: true,
				access: payload.accessToken,
				refresh: payload.refreshToken,
				isLoading: false,
			};
		case AUTHENTICATED_SUCCESS:
			return {
				...state,
				isAuthenticated: true,
				isLoading: false,
			};
		case AUTHENTICATED_FAIL:
			return {
				...state,
				isAuthenticated: false,
				isLoading: false,
			};
		case LOGOUT:
			localStorage.removeItem("access");
			localStorage.removeItem("refresh");
			return {
				...state,
				access: null,
				refresh: null,
				isAuthenticated: false,
				user: null,
				isLoading: false,
			};
		default:
			return state;
	}
}
