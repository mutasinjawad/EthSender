export const tokensByChain: Record<number, { name: string; address: string; decimals: number }[]> = {
    // Ethereum Mainnet (chain ID: 1)
    1: [
        { name: "USDC",  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6  },
        { name: "USDT",  address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", decimals: 6  },
        { name: "WETH",  address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", decimals: 18 },
        { name: "LINK",  address: "0x514910771AF9Ca656af840dff83E8264EcF986CA", decimals: 18 },
        { name: "DAI",   address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", decimals: 18 },
    ],

    // zkSync Era Mainnet (chain ID: 324)
    324: [
        { name: "USDC",  address: "0x1d17CBcF0D6D143135aE902365D2E5e2A16538D4", decimals: 6  },
        { name: "USDT",  address: "0x493257fD37EDB34451f62EDf8D2a0C418852bA4C", decimals: 6  },
        { name: "WETH",  address: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91", decimals: 18 },
        { name: "LINK",  address: "0x40609141Db628BeEE3BfAB8034Fc2D8278D0Cc78", decimals: 18 },
        { name: "DAI",   address: "0x4B9eb6c0b6ea15176BBF62841C6B2A8a398cb656", decimals: 18 },
    ],

    // Ethereum Sepolia Testnet (chain ID: 11155111)
    11155111: [
        { name: "USDC",  address: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238", decimals: 6  },
        { name: "LINK",  address: "0x779877A7B0D9E8603169DdbD7836e478b4624789", decimals: 18 },
        { name: "WETH",  address: "0x7b79995e5f793A07Bc00c21d5351694B6C68a65a", decimals: 18 },
        { name: "DAI",   address: "0xFF34B3d4Aee8ddCd6F9AFFFB6Fe49bD371b8a357", decimals: 18 },
    ],

    // zkSync Sepolia Testnet (chain ID: 300)
    300: [
        { name: "USDC",  address: "0xAe045DE5638162fa134807Cb558E15A3F5A7F853", decimals: 6  },
        { name: "WETH",  address: "0x53F7e72C7ac55b44c7cd73cC13D4EF4b121678e6", decimals: 18 },
        { name: "LINK",  address: "0x23A1aFD896c8c8876AF46aDc38521f4432658d1e", decimals: 18 },
        { name: "DAI",   address: "0xe1134444211593Cfda9fc9eCc7B43208615556E2", decimals: 18 },
    ],

    // Optimism Mainnet (chain ID: 10)
    10: [
        { name: "USDC",  address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85", decimals: 6  },
        { name: "USDT",  address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58", decimals: 6  },
        { name: "WETH",  address: "0x4200000000000000000000000000000000000006", decimals: 18 },
        { name: "LINK",  address: "0x350a791Bfc2C21F9Ed5d10980Dad2e2638ffa7f6", decimals: 18 },
        { name: "DAI",   address: "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1", decimals: 18 },
    ],

    // Base Mainnet (chain ID: 8453)
    8453: [
        { name: "USDC",  address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913", decimals: 6  },
        { name: "WETH",  address: "0x4200000000000000000000000000000000000006", decimals: 18 },
        { name: "LINK",  address: "0x88Fb150BDc53A65fe94Dea0c9BA0a6dAf8C6e196", decimals: 18 },
        { name: "DAI",   address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb", decimals: 18 },
        { name: "USDbC", address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA", decimals: 6  },
    ],

    // Anvil / Hardhat local (chain ID: 31337)
    31337: [
        { name: "Mock Token", address: "0x5FbDB2315678afecb367f032d93F642f64180aa3", decimals: 18 },
    ],
}