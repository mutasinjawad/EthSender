'use client';

import { useMemo, useState } from "react";
import { useChainId, useConfig, useAccount, useWriteContract } from 'wagmi';
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { chainsToTSender, erc20Abi, tsenderAbi } from "@/constants";
import InputField from "./ui/InputField";
import { calculateTotal } from "@/utils";

export default function AirdropForm() {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");
    const [tokenAddress, setTokenAddress] = useState("");
    const chainId = useChainId();
    const config = useConfig();
    const account = useAccount();
    const totalAmmount: number = useMemo(() => calculateTotal(amount), [amount]);
    const { data: hash, isPending, writeContractAsync } = useWriteContract();

    async function getApprrovedAmount(tSenderAddress: string | null): Promise<number> {
        if (!tSenderAddress) {
            alert("No address found, please use a supported network");
            return 0;
        }

        const response = await readContract(config, {
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: "allowance",
            args: [account.address, tSenderAddress as `0x${string}`],
        })

        return response as number;
    }

    async function handleSubmit() {
        const tSenderAddress = chainsToTSender[chainId]['tsender'];
        const approvedAmount = await getApprrovedAmount(tSenderAddress);
        if (approvedAmount < totalAmmount) {
            const approvalHash = await writeContractAsync({
                abi: erc20Abi,
                address: tokenAddress as `0x${string}`,
                functionName: "approve",
                args: [tSenderAddress as `0x${string}`, BigInt(totalAmmount)],
            })
            const approvalReceipt = await waitForTransactionReceipt(config, {
                hash: approvalHash
            });
            console.log("Approval Receipt:", approvalReceipt);

            await writeContractAsync({
                abi: tsenderAbi,
                address: tSenderAddress as `0x${string}`,
                functionName: "airdropERC20",
                args: [
                    tokenAddress,
                    // Comma or new line separated
                    recipient.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                    amount.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
                    BigInt(totalAmmount),
                ],
            })
        } else {
            await writeContractAsync({
                abi: tsenderAbi,
                address: tSenderAddress as `0x${string}`,
                functionName: "airdropERC20",
                args: [
                    tokenAddress,
                    // Comma or new line separated
                    recipient.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                    amount.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
                    BigInt(totalAmmount),
                ],
            });
        }
    }

    return (
        <form className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-white mb-4">Airdrop Form</h2>
            <InputField
                label="Token Address"
                placeholder="0x..."
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
            />
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