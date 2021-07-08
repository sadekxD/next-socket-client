import { useEffect } from "react";
import { checkAuthenticated } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
	const dispatch = useDispatch();
	const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(checkAuthenticated());
	}, []);

	return { isAuthenticated, isLoading };
};
