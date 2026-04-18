'use client';

import { useState } from "react";

import InputField from "./ui/InputField";

export default function AirdropForm() {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [tokenAddress, setTokenAddress] = useState("");

    async function handleSubmit() {
        console.log(tokenAddress, recipient, amount);
    }

    return (
        <form className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Airdrop Form</h2>
            <InputField
                label="Recipient Address"
                placeholder="0x..."
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
            />
            <InputField
                label="Amount"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <InputField
                label="Token Address"
                placeholder="0x..."
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
            />
            <button
                type="button"
                onClick={handleSubmit}
                className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
                Send Airdrop
            </button>
        </form>
    );
}