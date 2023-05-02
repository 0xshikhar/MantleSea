import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider, useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, useAccount, WagmiConfig } from "wagmi";
import {
	mainnet,
	polygon,
	goerli,
	polygonMumbai
} from "wagmi/chains"; 
import { mantleTestnet } from "../chains/mantle";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
// import MainLayout from "../layout/mainLayout"; 

import { useRouter } from "next/router";
import { ThirdwebProvider } from "@thirdweb-dev/react";

// 
const { chains, provider } = configureChains(
	[mantleTestnet],
	[alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
);


// const { chains,provider } = configureChains([mantleTestnet], [publicProvider()])
// const { chains, provider } = configureChains(
// 	[chain.mainnet, chain.polygon],
// 	[publicProvider()],
// )


const { connectors } = getDefaultWallets({
	appName: "My Alchemy DApp",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

export { WagmiConfig, RainbowKitProvider };

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const account = useAccount({
		onConnect({ address, connector, isReconnected }) {
			if (!isReconnected) router.reload();
		},
	});
	// const addRecentTransaction = useAddRecentTransaction();

	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider
				modalSize="wide"
				initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
				chains={chains}
				showRecentTransactions={true}
			>
				<ThirdwebProvider>
					<Component {...pageProps} />
				</ThirdwebProvider>

			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;
