interface InputFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  large?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function InputField({
  label,
  placeholder,
  type = "text",
  large = false,
  value,
  onChange,
}: InputFieldProps) {
  const sharedClasses =
    "w-full bg-[#0f0f0f] text-white placeholder-gray-600 border border-[#2a2a2a] rounded-lg px-4 py-2.5 font-mono text-sm focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors duration-200 resize-none";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-400 font-mono text-sm">{label}</label>
      {large ? (
        <textarea
          className={`${sharedClasses} h-32`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className={sharedClasses}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
}