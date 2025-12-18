import { defineChain } from 'viem'

export const megaETH = defineChain({
    id: 4326,
    name: 'MegaETH Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc-secret-mega.poptyedev.com/'],
        },
    },
    blockExplorers: {
        default: {
            name: 'MegaETH Explorer',
            url: 'https://explorer.megaeth.com', // Assuming this is the explorer URL
        },
    },
})
