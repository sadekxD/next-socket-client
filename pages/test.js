import { useState } from "react";
import { connect } from "react-redux";
import {
	decrementCounter,
	incrementCounter,
} from "../redux/actions/counterActions";

const test = (props) => {
	// const [counter, setCounter] = useState(0);

	// const inc = () => setCounter((pre) => pre + 1);
	// const dec = () => setCounter((pre) => pre - 1);

	return (
		<div>
			<div className="flex items-center p-10">
				<button
					onClick={props.decrementCounter}
					className="p-4 border border-black bg-blue-400 text-white"
				>
					DEC
				</button>
				<span className="px-4">{props.counter}</span>
				<button
					onClick={props.incrementCounter}
					className="p-4 border border-black bg-blue-400 text-white"
				>
					INC
				</button>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	counter: state.counter.value,
});

const mapDispatchToProps = {
	incrementCounter: incrementCounter,
	decrementCounter: decrementCounter,
};

export default connect(mapStateToProps, mapDispatchToProps)(test);
