# ETHSender

A simple, gas-efficient web app for sending ERC-20 tokens to multiple wallets in a single transaction.

> Inspired by [TSender](https://github.com/Cyfrin/ts-tsender-ui-cu)

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Wagmi](https://img.shields.io/badge/Wagmi-2-blue?style=flat-square)
![RainbowKit](https://img.shields.io/badge/RainbowKit-2-purple?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## What is ETHSender?

ETHSender lets you send ERC-20 tokens to multiple wallet addresses at once — without needing to send individual transactions. Just connect your wallet, enter the token address, paste your recipient addresses and amounts, and send.

No technical knowledge required.

---

## Live Demo

> Coming soon

---

## Features

- Send ERC-20 tokens to multiple addresses in one transaction
- Supports comma or newline separated recipient lists
- Auto-approves token allowance if needed
- Displays token name and total amount before sending
- Works across multiple networks
- Clean, minimal UI

---

## Supported Networks

| Network | Type |
|---|---|
| Ethereum Mainnet | Mainnet |
| zkSync Era | Mainnet |
| Sepolia | Testnet |
| zkSync Sepolia | Testnet |
| Anvil | Local |

---

## Tech Stack

- [Next.js 15](https://nextjs.org) — React framework
- [Wagmi v2](https://wagmi.sh) — Ethereum hooks
- [RainbowKit v2](https://www.rainbowkit.com) — Wallet connection
- [Viem](https://viem.sh) — Ethereum utilities
- [Tailwind CSS v4](https://tailwindcss.com) — Styling

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- A WalletConnect Project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com)
- A wallet browser extension (MetaMask, Brave Wallet, etc.)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mutasinjawad/EthSender.git
cd EthSender
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

1. Connect your wallet using the **Connect Wallet** button
2. Enter the **ERC-20 token address** you want to send
3. Enter **recipient addresses** — comma or newline separated
4. Enter **amounts** for each recipient — comma or newline separated
5. Click **Send Airdrop**
6. Approve the token allowance if prompted
7. Confirm the transaction in your wallet

---

## Local Development with Anvil

To test locally with [Anvil](https://book.getfoundry.sh/anvil/):

1. Install [Foundry](https://getfoundry.sh)
2. Start a local blockchain:
```bash
anvil
```
3. Deploy your contracts and update the contract addresses in `src/constants/index.ts`
4. Switch your wallet to the **Anvil** network:
   - Network Name: Anvil
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`

---

## Environment Variables

| Variable | Description | Required |
|---|---|---|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Your WalletConnect Project ID | Yes |

---

## Finding Token Addresses

- **Mainnet & zkSync tokens** — [coingecko.com](https://coingecko.com)
- **Sepolia test tokens** — [sepolia.etherscan.io/tokens](https://sepolia.etherscan.io/tokens)
- **zkSync Sepolia tokens** — [sepolia.explorer.zksync.io](https://sepolia.explorer.zksync.io)
- **Free test LINK tokens** — [faucets.chain.link](https://faucets.chain.link)

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## License

MIT License — feel free to use this project however you like.