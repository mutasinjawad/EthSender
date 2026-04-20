interface SummaryProps {
    tokenName: string;
    amountInWei: number;
}

export default function Summary({ tokenName, amountInWei }: SummaryProps) {

    const amountInTokens = amountInWei / 1e18;

    return (
        <div className="flex flex-col gap-1.5 mt-6">
            <label className="text-[#696969] text-[16px] mb-0.5">Summary</label>
            <div className="w-full bg-[#F3F3F1] placeholder-gray-600 border border-[#ececec] inset-shadow-xs/30 inset-shadow-[#c5c3c3] rounded-3xl px-4 py-4 text-sm focus:outline-none resize-none flex flex-col gap-2 font-fira-code text-zinc-600">
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