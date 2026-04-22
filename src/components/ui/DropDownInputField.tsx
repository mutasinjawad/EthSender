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

export default function DropDownInputField({
  label,
  placeholder,
  type = "text",
  value,
  chainId,
  onChange,
}: DropDownInputFieldProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tokens = tokensByChain[chainId] ?? [];

  const handleTokenSelect = (token: { name: string; address: string }) => {
    onChange({ target: { value: token.address } } as React.ChangeEvent<HTMLInputElement>);
    setIsDropdownOpen(false);
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

        {/* Dropdown Options */}
        {isDropdownOpen && tokens.length > 0 && (
          <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-zinc-500 rounded-2xl z-10 overflow-hidden px-2 py-1">
            {tokens.map((token) => (
              <li
                key={token.address}
                className={`flex items-center justify-between py-2.5 rounded-xl cursor-pointer gap-3 transition-colors duration-400 text-sm font-fira-code px-3 ${token.address === value ? "bg-[#ECFDCC] text-[#6fac15]" : "text-[#a6a6a6] hover:bg-[#f2f2f2]"}`}
                onClick={() => handleTokenSelect(token)}
              >
                <span className="truncate max-w-45">{token.address.slice(0, 6)}...{token.address.slice(-4)}</span>
                {token.address === value ? (
                  <CheckIcon />
                ) : (
                  <span>
                    {token.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}

        {isDropdownOpen && tokens.length === 0 && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white border border-zinc-500 rounded-2xl z-10 overflow-hidden px-4 py-3">
            <span className="text-sm font-fira-code text-[#9c3737]">No tokens for this chain</span>
          </div>
        )}
      </div>
    </div>
  );
}