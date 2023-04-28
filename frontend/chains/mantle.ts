import { Chain } from '@wagmi/core'

export const mantleTestnet = {
    id: 5001,
    name: 'Mantle Testnet',
    network: 'mantle testnet',
    nativeCurrency: {
        decimals: 18,
        name: 'BIT Token',
        symbol: 'BIT',
    },
    rpcUrls: {
        public: { http: ['https://rpc.testnet.mantle.xyz/'] },
        default: { http: ['https://rpc.testnet.mantle.xyz/'] },
    },
    blockExplorers: {
        etherscan: { name: 'Mantle Explorer', url: 'https://explorer.testnet.mantle.xyz' },
        default: { name: 'Mantle Explorer', url: 'https://explorer.testnet.mantle.xyz' },
    },
    // contracts: {
    //     multicall3: {
    //         address: '0xca11bde05977b3631167028862be2a173976ca11',
    //         blockCreated: 11_907_934,
    //     },
    // },
} as const satisfies Chain

/** Replace the values below with the addresses of your smart contracts. */

// 1. Set up the network your smart contracts are deployed to.
// First, import the chain from the package, then set the NETWORK variable to the chain.
// import { Mumbai } from "@thirdweb-dev/chains";
export const NETWORK = mantleTestnet;

// 2. The address of the marketplace V3 smart contract.
// Deploy your own: https://thirdweb.com/thirdweb.eth/MarketplaceV3
export const MARKETPLACE_ADDRESS = "0x472Ae313624fCEcd0638734040968F1559AA78c0";

// 3. The address of your NFT collection smart contract.
export const NFT_COLLECTION_ADDRESS = "0xBF040B410d560285d1dC03661F09de5a783aB562";

// (Optional) Set up the URL of where users can view transactions on
// For example, below, we use Mumbai.polygonscan to view transactions on the Mumbai testnet.
export const ETHERSCAN_URL = "https://mumbai.polygonscan.com";
