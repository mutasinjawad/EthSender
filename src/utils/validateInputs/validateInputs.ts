import { isAddress } from "viem";

export function validateInputs(tokenAddress: string, recipient: string, amount: string): { message: string, valid: boolean } {
    if (!isAddress(tokenAddress)) {
        return { message: "Please enter a valid token address", valid: false };
    }
    const recipientAddresses = recipient.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== '');
    const amounts = amount.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== '');
    if (recipientAddresses.some(addr => !isAddress(addr))) {
        return { message: "Please enter valid recipient addresses.", valid: false };
    }
    if (recipientAddresses.length === 0) {
        return { message: "Please enter at least one recipient.", valid: false };
    }
    if (amounts.some(amt => isNaN(Number(amt)) || Number(amt) <= 0)) {
        return { message: "Please enter valid amounts.", valid: false };
    }
    if (amounts.length === 0) {
        return { message: "Please enter at least one amount.", valid: false };
    }
    if (recipientAddresses.length !== amounts.length) {
        return { message: "The number of recipients and amounts must match.", valid: false };
    }
    
    return { message: "All inputs are valid.", valid: true };
}