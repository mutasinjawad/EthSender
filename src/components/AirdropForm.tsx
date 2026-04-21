'use client';

import { useMemo, useState, useEffect, use } from "react";
import { useChainId, useConfig, useAccount, useWriteContract, useReadContract } from 'wagmi';
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { chainsToTSender, erc20Abi, tsenderAbi } from "@/constants";

import InputField from "./ui/InputField";
import Summary from "./ui/Summary";

import { calculateTotal, calculateWeiToToken, validateInputs } from "@/utils";
import { LinkIcon, ArrowIcon, CheckIcon, LoadingIcon, InfoIcon } from "@/components/icons";

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

    const [tokenAddress, setTokenAddress] = useLocalStorage("tokenAddress", "");
    const [recipient, setRecipient] = useLocalStorage("recipient", "");
    const [amount, setAmount] = useLocalStorage("amount", "");
    const totalAmmount: number = useMemo(() => calculateTotal(amount), [amount]);

    const { data: tokenName, isLoading } = useReadContract({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: "name",
        query: {
            enabled: tokenAddress.length === 42 && tokenAddress.startsWith("0x")
        }
    });
    const decimals = useReadContract({
        abi: erc20Abi,
        address: tokenAddress as `0x${string}`,
        functionName: "decimals",
        query: {
            enabled: tokenAddress.length === 42 && tokenAddress.startsWith("0x")
        }
    });

    const weiToToken = useMemo(() => calculateWeiToToken(decimals.data as number | undefined, totalAmmount), [totalAmmount, decimals.data]);

    const [isConfirming, setIsConfirming] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isSubmitButtonHovered, setIsSubmitButtonHovered] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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
        const isInputValid = validateInputs(tokenAddress, recipient, amount);
        if (!isInputValid.valid) {
            setErrorMessage(isInputValid.message);
            return;
        }

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
            <div className="flex lg:flex-row flex-col justify-between lg:items-end items-start lg:gap-2 gap-6 lg:my-16 my-10">
                <h1 className="sm:text-7xl text-5xl font-semibold tracking-tight text-black">AirSend Form</h1>
                <p className="text-[16px] text-[#404040] max-w-87.5 lg:text-right tracking-tight leading-tight">
                    Want to send tokens to multiple people? Just select the coin, paste their details, and we will handle the rest in one simple step.
                </p>
            </div>
            <form className="bg-[#fafafa] sm:p-6 p-4 rounded-3xl flex flex-col gap-6">
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
                    label="Amount (Wei)"
                    placeholder="0.00"
                    value={amount}
                    large={true}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <Summary tokenName={(tokenName as string) || ""} amountInWei={totalAmmount} amountInToken={weiToToken} />
                <div className="w-full flex flex-col md:flex-row md:gap-8 gap-4 justify-between md:items-center">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isPending || isConfirming || !account.isConnected }
                        onMouseEnter={() => setIsSubmitButtonHovered(true)}
                        onMouseLeave={() => setIsSubmitButtonHovered(false)}
                        className="group flex-nowrap flex gap-1 hover:cursor-pointer disabled:cursor-not-allowed text-white transition-all text-[16px] duration-300 h-12.5">
                            <div className="h-full sm:px-8 px-4 flex flex-1 sm:flex-none items-center justify-center rounded-full bg-black group-disabled:bg-[#404040] group-disabled:text-white text-left">
                                {!account.isConnected ? "Connect Your Wallet"
                                : isPending ? "Waiting For Confirmation" 
                                : isConfirming ? "Confirming Transaction" 
                                : isConfirmed ? "Airdrop Sent!" 
                                : "Send Airdrop"}
                            </div>
                            <div className="h-full w-12.5 flex flex-nowrap items-center justify-center rounded-full bg-black group-disabled:bg-[#404040] group-disabled:text-white">
                                {!account.isConnected ? <LinkIcon />
                                : isPending ? <LoadingIcon />
                                : isConfirming ? <LoadingIcon /> 
                                : isConfirmed ? <CheckIcon /> 
                                : <ArrowIcon rotate={isSubmitButtonHovered} /> }
                            </div>
                    </button>
                    {errorMessage &&
                        <div className="flex-1 flex w-full md:justify-end">
                            <div className="flex gap-2 items-center justify-center bg-[#ffe1de] rounded-xl w-fit sm:px-4 px-3 py-2 text-[#DE3A43] text-[16px] lg:text-right tracking-tight leading-tight">
                                <InfoIcon className="w-4 h-4 flex-nowrap" />
                                <p>{errorMessage}</p>
                            </div>
                        </div>
                    }
                </div>
            </form>
        </div>
    );
}