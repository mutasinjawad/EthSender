'use client';

import { useMemo, useState, useEffect, use } from "react";
import { useChainId, useConfig, useAccount, useWriteContract, useReadContract } from 'wagmi';
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { chainsToTSender, erc20Abi, tsenderAbi } from "@/constants";

import InputField from "./ui/InputField";
import Summary from "./ui/Summary";

import { calculateTotal } from "@/utils";
import { LinkIcon, ArrowIcon, CheckIcon, LoadingIcon } from "@/components/icons";

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
    const [isSubmitButtonHovered, setIsSubmitButtonHovered] = useState(false);

    async function getApprrovedAmount(tSenderAddress: string | null): Promise<number> {
        if (!tSenderAddress) {
            alert("No address found, please use a supported network");
            return 0;
        }

        try {
            const response = await readContract(config, {
                abi: erc20Abi,
                address: tokenAddress as `0x${string}`,
                functionName: "allowance",
                args: [account.address, tSenderAddress as `0x${string}`],
            })
            console.log("Approved Amount:", response);
            return response as number;
        } catch (err) {
            console.error("Error fetching approved amount:", err);
            alert("Error fetching approved amount, please check the console for more details.");
            return 0;
        }

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
        <div className="px-4 pb-10">
            <div className="flex lg:flex-row flex-col justify-between lg:items-end items-start lg:gap-2 gap-6 my-16">
                <h1 className="sm:text-7xl text-5xl font-semibold tracking-tight text-black">Airdrop Form</h1>
                <p className="text-[16px] text-[#404040] max-w-87.5 lg:text-right tracking-tight leading-tight">
                    Want to send tokens to multiple people? Just select the coin, paste their details, and we will handle the rest in one simple step.
                </p>
            </div>
            <form className="bg-[#fafafa] p-6 rounded-3xl flex flex-col gap-6">
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
                    disabled={isPending || isConfirming || !account.isConnected }
                    onMouseEnter={() => setIsSubmitButtonHovered(true)}
                    onMouseLeave={() => setIsSubmitButtonHovered(false)}
                    className="group flex gap-1 hover:cursor-pointer disabled:cursor-not-allowed text-white transition-all text-[16px] duration-300 h-12.5">
                        <div className="h-full px-8 flex items-center justify-center rounded-full bg-black group-disabled:bg-[#404040] group-disabled:text-white">
                            {!account.isConnected ? "Connect Your Wallet"
                            : isPending ? "Waiting For Confirmation" 
                            : isConfirming ? "Confirming Transaction" 
                            : isConfirmed ? "Airdrop Sent!" 
                            : "Send Airdrop"}
                        </div>
                        <div className="h-full w-12.5 flex items-center justify-center rounded-full bg-black group-disabled:bg-[#404040] group-disabled:text-white">
                            {!account.isConnected ? <LinkIcon />
                            : isPending ? <LoadingIcon />
                            : isConfirming ? <LoadingIcon /> 
                            : isConfirmed ? <CheckIcon /> 
                            : <ArrowIcon rotate={isSubmitButtonHovered} /> }
                        </div>
                </button>
            </form>
        </div>
    );
}