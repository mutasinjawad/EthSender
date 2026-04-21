import { formatUnits } from 'viem';

export function calculateWeiToToken(decimals: number | undefined, amountInWei: number): string {
    if (decimals === undefined) {
        return "0.0000";
    }

    return parseFloat(formatUnits(BigInt(amountInWei), decimals)).toFixed(4);
}