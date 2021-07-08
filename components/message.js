import React from "react";
import Avatar from "react-avatar";

const Message = ({ username, msgText }) => {
	return (
		<div className="flex pb-2 items-center">
			<Avatar
				name={username}
				color={Avatar.getRandomColor("sitebase", ["red", "green", "blue"])}
				size={30}
				round={true}
			/>
			<div>
				<span className="text-sm ml-2 font-medium text-gray-500">
					{username}
				</span>
				<p className="text-xs ml-2 font-medium text-gray-900">{msgText}</p>
			</div>
		</div>
	);
};

export default Message;
