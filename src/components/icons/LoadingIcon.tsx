export default function LoadingIcon() {
    
    const sharedClasses = "loading-bar w-[1px] h-[10px] mx-[2px] bg-white rounded-md";
    
    return (
        <>
            <style>{`
                @keyframes loading-wave-animation {
                    0%   { height: 4px; }
                    50%  { height: 12px; }
                    100% { height: 4px; }
                }
                .loading-bar {
                    animation: loading-wave-animation 1s ease-in-out infinite;
                }
                .loading-bar:nth-child(2) { animation-delay: 0.1s; }
                .loading-bar:nth-child(3) { animation-delay: 0.2s; }
                .loading-bar:nth-child(4) { animation-delay: 0.3s; }
            `}</style>
            <div className="flex justify-center items-end w-6 h-3.75">
                <div className={`${sharedClasses}`} />
                <div className={`${sharedClasses}`} />
                <div className={`${sharedClasses}`} />
                <div className={`${sharedClasses}`} />
            </div>
        </>
    )
}