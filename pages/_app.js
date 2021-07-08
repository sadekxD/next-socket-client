import "../styles/globals.css";
import ProviderWrapper from "../provider/Provider";

function MyApp({ Component, pageProps }) {
	return (
		<ProviderWrapper>
			<Component {...pageProps} />
		</ProviderWrapper>
	);
}

export default MyApp;
