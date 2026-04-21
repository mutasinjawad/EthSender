export const tokensByChain: Record<number, { name: string, address: string }[]> = {
    1: [ // Mainnet
        { name: "USDC", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" },
        { name: "USDT", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7" },
        { name: "LINK", address: "0x514910771AF9Ca656af840dff83E8264EcF986CA" },
    ],
    324: [ // zkSync
        { name: "USDC", address: "0x1d17CBcF0D6D143135aE902365D2E5e2A16538D4" },
        { name: "WETH", address: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91" },
    ],
    11155111: [ // Sepolia
        { name: "USDC", address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238" },
        { name: "LINK", address: "0x779877A7B0D9E8603169DdbD7836e478b4624789" },
    ],
    31337: [ // Anvil
        { name: "Mock Token", address: "0x5FbDB2315678afecb367f032d93F642f64180aa3" },
    ],
}