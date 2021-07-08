import { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
import styles from "../styles/ChatBox.module.css";
import Message from "./message";
import MessageInput from "./messageInput";

const ENDPOINT = process.env.API_URL;
const socket = io(ENDPOINT);

const ChatBox = () => {
	const [messages, setMessages] = useState([]);
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		const div = messagesEndRef.current;
		div.scrollTop = div.scrollHeight - div.clientHeight;
	};

	useEffect(scrollToBottom, [messages]);

	useEffect(() => {
		const getMessages = async () => {
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
						`${process.env.API_URL}/api/chat`,
						config
					);
					setMessages([...messages, ...res.data]);
				} catch (err) {
					console.log(err);
				}
			}
		};

		getMessages();
	}, []);

	useEffect(() => {
		socket.on("new-message", (msg) => {
			setMessages((pre) => [...pre, msg]);
		});
	}, []);

	return (
		<div className="max-w-lg w-full">
			<button onClick={scrollToBottom}>scroll</button>
			<div className="header border-l border-r border-t border-opacity-80 px-2 py-2">
				<h1 className="font-medium text-sm flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 mr-2"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.414 5 5 0 010-7.07 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 9a1 1 0 011 1v.01a1 1 0 11-2 0V10a1 1 0 011-1z"
							clipRule="evenodd"
						/>
					</svg>
					Online(3)
				</h1>
			</div>
			<div
				ref={messagesEndRef}
				className={`${styles.messagesBox} border h-3/4 mb-2 p-2 flex flex-col overflow-y-auto`}
			>
				<div className="flex-1"></div>
				{messages.map((msg) => (
					<Message key={msg._id} {...msg} />
				))}
			</div>
			<div className="message-input"></div>
			<MessageInput op={[messages, setMessages]} socket={socket} />
		</div>
	);
};

export default ChatBox;
