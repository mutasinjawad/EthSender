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
    "w-full bg-[#F3F3F1] placeholder-gray-600 border border-[#ececec] inset-shadow-xs/30 inset-shadow-[#c5c3c3] rounded-3xl px-4 py-2.5 text-sm focus:outline-none resize-none";

  return (
    <div className="flex flex-col gap-1.5 mt-6">
      <label className="text-[#696969] text-[16px] mb-0.5">{label}</label>
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