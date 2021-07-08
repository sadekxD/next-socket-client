import styles from "../styles/Register.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { signup, checkAuthenticated } from "../redux/actions/authActions";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const register = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	// const { isAuthenticated } = useSelector((state) => state.auth);
	const { isAuthenticated } = useAuth();
	const [registerInfo, setRegisterInfo] = useState({
		email: "",
		username: "",
		password: "",
	});

	// useEffect(() => {
// 	dispatch(checkAuthenticated());
	// }, []);

	// useEffect(() => {
	// 	if (isAuthenticated) {
	// 		router.push("/");
	// 	}
	// }, [isAuthenticated]);

	const _change = (e) => {
		setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
	};

	const _register = (e) => {
		e.preventDefault();
		const { email, username, password } = registerInfo;
		dispatch(signup(username, email, password));
	};

	if (isAuthenticated) {
		router.push("/");
		return (
			<div className={styles.container}>
				<h1>Redirecting to "/"</h1>
			</div>
		);
	}

	return (
		<div className={`${styles.container} px-4`}>
			<form
				onSubmit={_register}
				className="max-w-md w-full px-4 py-10 drop-shadow-md rounded-lg border"
			>
				<h1 className="text-3xl mb-6 w-full flex items-center justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-8 w-8 mr-2"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
					</svg>
					<span className="font-bold">REGISTER</span>
				</h1>
				<div className="mb-4">
					<input
						onChange={_change}
						type="text"
						name="username"
						id="username"
						value={registerInfo.username}
						placeholder="Your Name"
						className="w-full border border-gray-300 p-2 text-base focus:outline-none focus:ring-2 rounded-md"
					/>
				</div>
				<div className="mb-4">
					<input
						onChange={_change}
						type="email"
						name="email"
						id="email"
						value={registerInfo.email}
						placeholder="Your Email"
						className="w-full border border-gray-300 p-2 text-base focus:outline-none focus:ring-2 rounded-md"
					/>
				</div>
				<div className="mb-4">
					<input
						onChange={_change}
						type="password"
						name="password"
						id="password"
						value={registerInfo.password}
						placeholder="Your Password"
						className="w-full border border-gray-300 p-2 text-base focus:outline-none focus:ring-2 rounded-md"
					/>
				</div>
				<button
					type="submit"
					className="w-full border text-base text-center p-2 rounded-md transition-all duration-200 hover:bg-blue-400 hover:text-white"
				>
					Register
				</button>
				<p className="mt-1">
					Have an account?{" "}
					<Link href="/login">
						<a className="text-blue-500">Login</a>
					</Link>{" "}
					here.
				</p>
			</form>
		</div>
	);
};

export default register;
