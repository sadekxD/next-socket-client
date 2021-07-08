import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const MessageInput = ({ op, socket }) => {
	const [messages, setMessages] = op;
	const { user } = useSelector((state) => state.auth);

	const [message, setMessage] = useState({
		username: "",
		msgText: "",
	});

	useEffect(() => {
		if (user) {
			setMessage({ ...message, username: user.username });
		}
	}, [user]);

	const _change = (e) => {
		setMessage({ ...message, msgText: e.target.value });
	};

	const _msgSend = async (e) => {
		e.preventDefault();

		const accessToken = localStorage.getItem("access");
		if (accessToken) {
			// const config = {
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 		Authorization: `bearer ${accessToken}`,
			// 		Accept: "application/json",
			// 	},
			// };
			// const body = {
			// 	username: message.username,
			// 	msgText: message.msgText,
			// };
			// try {
			// 	const res = await axios.post(
			// 		`${process.env.API_URL}/api/chat/`,
			// 		body,
			// 		config
			// 	);
			// 	setMessage({ ...message, msgText: "" });
			// } catch (err) {
			// 	console.log(err);
			// }
			socket.emit("message", message);
			setMessage({ ...message, msgText: "" });
		}
	};

	return (
		<form onSubmit={_msgSend} className="flex items-center w-full">
			<div className="flex-1 pr-2">
				<input
					onChange={_change}
					value={message.msgText}
					type="text"
					placeholder="Write here"
					name="message"
					id="message"
					className="w-full border border-black border-opacity-40  p-2 text-base focus:outline-none"
				/>
			</div>
			<button
				type="submit"
				className="py-2 px-4 text-base border border-black border-opacity-40"
			>
				Send
			</button>
		</form>
	);
};

export default MessageInput;
