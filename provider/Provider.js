import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../redux/store";

const ProviderWrapper = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};

// makeStore function that returns a new store for every request
const makeStore = () => store;
const wrapper = createWrapper(makeStore);

//withRedux wrapper that passes the store to the App Component
export default wrapper.withRedux(ProviderWrapper);
