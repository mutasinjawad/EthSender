"use client"

import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { http } from 'wagmi'
import { anvil, zksync, mainnet } from "wagmi/chains"

export default getDefaultConfig({
    appName: "TSender",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    chains: [mainnet, anvil, zksync],
    transports: {
        [mainnet.id]: http('https://cloudflare-eth.com'),
        [zksync.id]: http('https://mainnet.era.zksync.io'),
        [anvil.id]: http('http://127.0.0.1:8545'),
    },
    ssr: false
})