import { useState } from "react";
import DropDownIcon from "@/components/icons/DropDownIcon";
import CheckIcon from "@/components/icons/CheckIcon"
import { tokensByChain } from "@/lib/chainToToken";

interface DropDownInputFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  chainId: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

interface DropDownModalProps {
  tokens: { name: string; address: string }[];
  value: string;
  onTokenSelect: (token: { name: string; address: string }) => void;
  className?: string;
}

export default function DropDownInputField({ label, placeholder, type = "text", value, chainId, onChange,}: DropDownInputFieldProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tokens = tokensByChain[chainId] ?? [];

  const handleTokenSelect = (token: { name: string; address: string }) => {
    onChange({ target: { value: token.address } } as React.ChangeEvent<HTMLInputElement>);
    setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#404040] text-[14px] font-medium mb-0.5">{label}</label>
      <div className="relative">

        {/* Input Field */}
        <input
          className={`w-full bg-[#F2F2F2] placeholder:text-[#a6a6a6] rounded-2xl px-4 py-2.5 pr-10 text-sm focus:outline-none resize-none focus:ring-1 focus:ring-zinc-500 transition-all duration-200 ${
            isDropdownOpen ? "ring-1 ring-zinc-500" : ""
          }`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />

        {/* DropDown Icon */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 right-4 text-[#404040] cursor-pointer transition-transform duration-400 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          <DropDownIcon />
        </div>

        {/* Dropdown Modal */}
        <div className={`absolute top-full left-0 w-full ${isDropdownOpen ? "z-10" : "z-[-1]"} overflow-hidden`}>
          <DropDownModal tokens={tokens} value={value} onTokenSelect={handleTokenSelect} className={`transition-all ease-in-out duration-400 ${isDropdownOpen ? "opcaity-100 translate-y-0 pointer-events-auto" : "opcaity-0 -translate-y-[105%] pointer-events-none"}`}/>
        </div>
      </div>
    </div>
  );
}

export function DropDownModal({tokens, value, onTokenSelect, className}: DropDownModalProps) {
  return (
    <>
      {/* If tokens exist */}
      {tokens.length > 0 ? (
        <ul className={`mt-1 w-full bg-white border border-zinc-500 rounded-2xl overflow-hidden px-2 py-1 ${className}`}>
          {tokens.map((token) => (
            <div key={token.address}>

              {/* If token is selected */}
              {token.address === value ? (
                <li
                  className="flex items-center justify-between py-2.5 rounded-xl cursor-pointer gap-3 transition-colors duration-400 text-sm font-fira-code px-3 bg-[#ECFDCC] text-[#6fac15]"
                  onClick={() => onTokenSelect(token)}
                >
                  <div className="flex gap-2 items-center justify-center">
                    <CheckIcon className="w-4 h-4"/>
                    <span className="truncate max-w-45">{token.address.slice(0, 6)}...{token.address.slice(-4)}</span>
                  </div>
                  <span>{token.name}</span>
                </li>

              ) : (

              // If token is not selected
                <li
                  className="flex items-center justify-between py-2.5 rounded-xl cursor-pointer gap-3 transition-colors duration-400 text-sm font-fira-code px-3 text-[#a6a6a6] hover:bg-[#f2f2f2]"
                  onClick={() => onTokenSelect(token)}
                >
                  <span className="truncate max-w-45">{token.address.slice(0, 6)}...{token.address.slice(-4)}</span>
                  <span>{token.name}</span>
                </li>
              )}

            </div>
          ))}
        </ul>    
      ) : (
      // If tokens do not exist for the selected chain
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-zinc-500 rounded-2xl z-10 overflow-hidden px-4 py-3">
          <span className="text-sm font-fira-code text-[#9c3737]">No tokens for this chain</span>
        </div>
      )}
    </>
  )
}