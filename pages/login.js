import { useEffect, useState } from "react";
import styles from "../styles/Login.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

// Actions
import { login } from "../redux/actions/authActions";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		if (isAuthenticated) {
			router.push("/");
		}
	}, [isAuthenticated]);

	const _change = (e) => {
		setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
	};

	const _login = (e) => {
		e.preventDefault();
		const { email, password } = loginInfo;
		dispatch(login(email, password));
	};

	if (isAuthenticated) {
		return (
			<div className={styles.container}>
				<h1>Redirecting to {`"/"`}</h1>
			</div>
		);
	}

	return (
		<div className={`${styles.container} px-4`}>
			<form
				onSubmit={_login}
				className="max-w-md w-full px-4 py-10 drop-shadow-md rounded-lg border"
			>
				<h1 className="text-3xl mb-6 w-full flex items-center justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-7 w-7 mr-2"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
						/>
					</svg>
					<span className="font-bold">LOGIN</span>
				</h1>
				<div className="mb-4">
					<input
						type="email"
						name="email"
						id="email"
						required
						value={loginInfo.email}
						onChange={_change}
						placeholder="Your Email"
						className="w-full border border-gray-300 p-2 text-base focus:outline-none focus:ring-2 rounded-md"
					/>
				</div>
				<div className="mb-4">
					<input
						type="password"
						name="password"
						id="password"
						required
						value={loginInfo.password}
						onChange={_change}
						placeholder="Your Password"
						className="w-full border border-gray-300 p-2 text-base focus:outline-none focus:ring-2 rounded-md"
					/>
				</div>
				<button
					type="submit"
					className="w-full border text-base text-center p-2 rounded-md transition-all duration-200 hover:bg-yellow-400 hover:text-white"
				>
					Login
				</button>
				<p className="mt-1">
					Don't have an account yet?{" "}
					<Link href="/register">
						<a className="text-blue-500">Register</a>
					</Link>{" "}
					here.
				</p>
			</form>
		</div>
	);
};

export default Login;
