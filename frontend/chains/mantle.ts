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
