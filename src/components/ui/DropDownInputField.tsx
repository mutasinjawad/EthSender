interface InputFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function InputField({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
}: InputFieldProps) {
  const sharedClasses =
    "w-full bg-[#F2F2F2] placeholder:text-[#a6a6a6] rounded-2xl px-4 py-2.5 text-sm focus:outline-none resize-none focus:ring-1 focus:ring-black transition-all duration-200";

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[#404040] text-[14px] font-medium mb-0.5">{label}</label>
        <input
          className={sharedClasses}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
    </div>
  );
}