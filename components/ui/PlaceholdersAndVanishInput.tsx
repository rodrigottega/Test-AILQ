import * as React from 'react';

interface PlaceholdersAndVanishInputProps {
  placeholders: string[];
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  isVanishing: boolean;
}

export const PlaceholdersAndVanishInput: React.FC<PlaceholdersAndVanishInputProps> = ({
  placeholders,
  onChange,
  value,
  isVanishing
}) => {
  const [currentPlaceholder, setCurrentPlaceholder] = React.useState(placeholders[0]);

  React.useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % placeholders.length;
      setCurrentPlaceholder(placeholders[index]);
    }, 2500); // Cycle every 2.5 seconds
    return () => clearInterval(interval);
  }, [placeholders]);

  return (
    <div className="relative w-full h-[92px]">
      {isVanishing && value && (
        <div className="absolute inset-0 p-3 text-sm flex flex-wrap content-start overflow-hidden pointer-events-none">
          {value.split('').map((char, i) => (
            <span
              key={`${char}-${i}`}
              className="animate-vanish"
              style={{ animationDelay: `${i * 0.01}s`, whiteSpace: 'pre' }}
            >
              {char}
            </span>
          ))}
        </div>
      )}
      <textarea
        value={value}
        onChange={onChange}
        className={`box-border flex flex-col items-start p-3 gap-2 w-full h-full border border-[#D5D5DE] rounded resize-none placeholder-gray-400 text-sm focus:border-[#6464FF] outline-none transition-all duration-500 ${isVanishing ? 'text-transparent bg-gray-50 border-gray-200' : 'text-gray-900 bg-white'}`}
        placeholder={currentPlaceholder}
      />
    </div>
  );
};