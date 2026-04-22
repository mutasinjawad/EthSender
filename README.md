# AirSend

A simple, gas-efficient web app for sending ERC-20 tokens to multiple wallets in a single transaction.

> Inspired by [TSender](https://github.com/Cyfrin/tsender)

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![Wagmi](https://img.shields.io/badge/Wagmi-2-blue?style=flat-square)
![RainbowKit](https://img.shields.io/badge/RainbowKit-2-purple?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## What is AirSend?

AirSend lets you send ERC-20 tokens to multiple wallet addresses at once — without needing to send individual transactions. Just connect your wallet, select your network, enter the token address, paste your recipient addresses and amounts, and send.

No technical knowledge required.

---

## Live Demo

> [Try it here](https://air-send-token.vercel.app/)

---

## Demo Video

> Coming soon

---

## Features

- Send ERC-20 tokens to multiple addresses in one transaction
- Supports comma or newline separated recipient lists
- Auto-approves token allowance if needed
- Displays token name and total amount before sending
- Works across multiple networks
- Token address dropdown with pre-added addresses per network *(coming soon)*
- Clean, minimal UI

---

## Supported Networks & Contract Addresses

| Network | Type | TSender Contract |
|---|---|---|
| Ethereum Mainnet | Mainnet | `0x3aD9F29AB266E4828450B33df7a9B9D7355Cd821` |
| zkSync Era | Mainnet | `0x7e645Ea4386deb2E9e510D805461aA12db83fb5E` |
| Optimism | Mainnet | `0x90749f454461dBF55c39Fc5CF47b05EdD0723B1F` |
| Base | Mainnet | `0x90749f454461dBF55c39Fc5CF47b05EdD0723B1F` |
| Sepolia | Testnet | `0xa27c5C77DA713f410F9b15d4B0c52CAe597a973a` |
| zkSync Sepolia | Testnet | `0x90749f454461dBF55c39Fc5CF47b05EdD0723B1F` |
| Anvil | Local | `0x5FbDB2315678afecb367f032d93F642f64180aa3` |

---

## Tech Stack

- [Next.js 16](https://nextjs.org) — React framework
- [Wagmi v3](https://wagmi.sh) — Ethereum hooks
- [RainbowKit v2](https://www.rainbowkit.com) — Wallet connection
- [Viem](https://viem.sh) — Ethereum utilities
- [Tailwind CSS v4](https://tailwindcss.com) — Styling

---

## Getting Started

### Requirements

- [node](https://nodejs.org/en/download)
  - You'll know you've installed it right if you can run `node --version` and get a response like `v23.0.1`
- [pnpm](https://pnpm.io/)
  - You'll know you've installed it right if you can run `pnpm --version` and get a response like `10.1.0`
- [git](https://git-scm.com/downloads)
  - You'll know you've installed it right if you can run `git --version` and get a response like `git version 2.33.0`

### Environment Variables

Create a `.env.local` file in the root directory with the following:

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

Get your Project ID for free from [reown cloud](https://cloud.reown.com/).

### Setup

1. Clone the repository:
```bash
git clone https://github.com/mutasinjawad/AirSend.git
cd AirSend
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the local blockchain (in one terminal):
```bash
pnpm anvil
```

4. Run the development server (in a second terminal):
```bash
pnpm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

1. Connect your wallet using the **Connect Wallet** button
2. **Select the correct network** in your wallet (see supported networks above)
3. Enter the **ERC-20 token address** you want to send
4. Enter **recipient addresses** — comma or newline separated
5. Enter **amounts** for each recipient — comma or newline separated
6. Click **Send Airdrop**
7. Approve the token allowance if prompted
8. Confirm the transaction in your wallet

---

## Local Development with Anvil

### Requirements

- [anvil](https://book.getfoundry.sh/anvil/)
  - You'll know you've installed it right if you can run `anvil --version` and get a response like `anvil 0.3.0`
- [nvm](https://github.com/nvm-sh/nvm)
  - You'll know you've installed it right if you can run `nvm --version` and get a response like `0.39.0`

### Setup

1. Set the correct Node version:
```bash
nvm use
```

2. Start the local blockchain with TSender already deployed:
```bash
pnpm run anvil
```

3. Connect your wallet to the Anvil network:
   - Network Name: Anvil
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`

4. Use the default Anvil account:
   - Address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
   - Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

The `tsender-deployed.json` in the root directory stores the blockchain state. The default account already has mock tokens minted. You can mint more using the `mint()` or `mintTo()` functions on the mock token contract at `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`.

---

## Finding Token Addresses

AirSend works with **any ERC-20 token**. Here are some resources to find token addresses:

- **Mainnet & zkSync tokens** — [coingecko.com](https://coingecko.com)
- **Sepolia test tokens** — [sepolia.etherscan.io/tokens](https://sepolia.etherscan.io/tokens)
- **zkSync Sepolia tokens** — [sepolia.explorer.zksync.io](https://sepolia.explorer.zksync.io)
- **Free test LINK tokens** — [faucets.chain.link](https://faucets.chain.link)
- **Free Sepolia ETH** — [sepoliafaucet.com](https://sepoliafaucet.com)

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## License

MIT License — feel free to use this project however you like.