"use client"

import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { http } from 'wagmi'
import { anvil, mainnet, sepolia, zksync, zksyncSepoliaTestnet } from "wagmi/chains"

export default getDefaultConfig({
    appName: "TSender",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [mainnet, anvil, zksync, sepolia, zksyncSepoliaTestnet],
    transports: {
        [mainnet.id]: http('https://cloudflare-eth.com'),
        [zksync.id]: http('https://mainnet.era.zksync.io'),
        [anvil.id]: http('http://127.0.0.1:8545'),
        [sepolia.id]: http('https://1rpc.io/sepolia'),
        [zksyncSepoliaTestnet.id]: http('https://rpc.ankr.com/zksync_era_sepolia'),
    },
    ssr: false
})