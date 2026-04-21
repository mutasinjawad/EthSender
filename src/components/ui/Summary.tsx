interface SummaryProps {
    tokenName: string;
    amountInWei: number;
}

export default function Summary({ tokenName, amountInWei }: SummaryProps) {

    const amountInTokens = amountInWei / 1e18;

    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[#404040] text-[14px] font-medium mb-0.5">Summary</label>
            <div className="w-full bg-[#F2F2F2] text-[#a6a6a6] rounded-2xl p-4 text-sm flex flex-col gap-2 font-fira-code">
                {/* Token name */}
                <div className="flex justify-between">
                    <span>Token Name:</span>
                    <span>{tokenName}</span>
                </div>

                {/* Amount in wei  */}
                <div className="flex justify-between">
                    <span>Amount in Wei:</span>
                    <span>{amountInWei}</span>
                </div>

                {/* Amount in tokens  */}
                <div className="flex justify-between">
                    <span>Amount in Tokens:</span>
                    <span>{amountInTokens.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}