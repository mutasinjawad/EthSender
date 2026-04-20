'use client';

import { useMemo, useState, useEffect, use } from "react";
import { useChainId, useConfig, useAccount, useWriteContract, useReadContract } from 'wagmi';
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { chainsToTSender, erc20Abi, tsenderAbi } from "@/constants";
import InputField from "./ui/InputField";
import Summary from "./ui/Summary";
import { calculateTotal } from "@/utils";

export default function AirdropForm() {
    const chainId = useChainId();
    const config = useConfig();
    const account = useAccount();
    const { data: hash, isPending, writeContractAsync } = useWriteContract();
    
    function useLocalStorage<T>(key: string, initialValue: T) {
        const [value, setValue] = useState<T>(() => {
            if (typeof window === "undefined") return initialValue;
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initialValue;
        });

        const setStoredValue = (newValue: T) => {
            setValue(newValue);
            localStorage.setItem(key, JSON.stringify(newValue));
        };

        return [value, setStoredValue] as const;
    }

    const [mounted, setMounted] = useState(false);

    const [recipient, setRecipient] = useLocalStorage("recipient", "");
    const [amount, setAmount] = useLocalStorage("amount", "");
    const [tokenAddress, setTokenAddress] = useLocalStorage("tokenAddress", "");
    const totalAmmount: number = useMemo(() => calculateTotal(amount), [amount]);

    const { data: tokenName, isLoading } = useReadContract({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: "name",
        query: {
            enabled: tokenAddress.length === 42 && tokenAddress.startsWith("0x")
        }
    });

    const [isConfirming, setIsConfirming] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

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
        setIsConfirming(false);
        setIsConfirmed(false);
        const tSenderAddress = chainsToTSender[chainId]['tsender'];
        const approvedAmount = await getApprrovedAmount(tSenderAddress);

        // If the approved amount is less than the total amount to be airdropped, we need to approve the tSender contract first
        if (approvedAmount < totalAmmount) {

            // Approve the tSender contract
            const approvalHash = await writeContractAsync({
                abi: erc20Abi,
                address: tokenAddress as `0x${string}`,
                functionName: "approve",
                args: [tSenderAddress as `0x${string}`, BigInt(totalAmmount)],
            })
            setIsConfirming(true);
            const approvalReceipt = await waitForTransactionReceipt(config, {
                hash: approvalHash
            });
            console.log("Approval Receipt:", approvalReceipt);

            // Airdropping tokens
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
            setIsConfirming(false);
            setIsConfirmed(true);
            localStorage.removeItem("recipient");
            localStorage.removeItem("amount");
            localStorage.removeItem("tokenAddress");
        
        } else {
            setIsConfirming(true);
            setIsConfirmed(false);
            // Airdropping tokens
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
            setIsConfirming(false);
            setIsConfirmed(true);
            localStorage.removeItem("recipient");
            localStorage.removeItem("amount");
            localStorage.removeItem("tokenAddress");
        }
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    
    return (
        <div className="px-4 py-10">
            <form className="bg-white p-6 rounded-3xl border border-[#ececec] shadow-xl/30 shadow-[#c5c3c3]">
                <h2 className="text-[30px] mb-4 text-center">Airdrop Form</h2>
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
                    large={true}
                    onChange={(e) => setRecipient(e.target.value)}
                />
                <InputField
                    label="Amount"
                    placeholder="0.00"
                    value={amount}
                    large={true}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <Summary tokenName={(tokenName as string) || ""} amountInWei={totalAmmount} />
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isPending || isConfirming}
                    className="mt-8 w-full bg-[#2b2a2a] hover:bg-[#101010] disabled:bg-[#F3F5F9] disabled:text-[#818388] disabled:cursor-not-allowed text-white py-2 px-4 rounded-full transition-all duration-300">
                        {isPending ? "Waiting for wallet..." 
                        : isConfirming ? "Confirming transaction..." 
                        : isConfirmed ? "Airdrop sent! ✓" 
                        : "Send Airdrop"}
                </button>
            </form>
        </div>
    );
}