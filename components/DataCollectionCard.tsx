import * as React from 'react';

interface ObjectiveCardProps {
  objective: string;
  setObjective: React.Dispatch<React.SetStateAction<string>>;
  onCreateAgent: () => void;
  isTyping: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

const DataCollectionCard: React.FC<ObjectiveCardProps> = ({ objective, setObjective, onCreateAgent, isTyping, inputRef }) => {
  const suggestions = [
    { icon: '🚀', text: 'Inscripción a programa' },
    { icon: '🛍️', text: 'Compra en línea' },
    { icon: '🗓️', text: 'Agendar cita' },
  ];

  const placeholders = [
    "Agendar una cita...",
    "Inscribir a un programa...",
    "Realizar una compra en línea...",
    "Resolver una duda...",
  ];
  const [placeholder, setPlaceholder] = React.useState(placeholders[0]);

  React.useEffect(() => {
    // Don't cycle placeholders while user is "typing" from template or has entered text
    if (isTyping || objective) return;
    let i = 0;
    const interval = setInterval(() => {
        i = (i + 1) % placeholders.length;
        setPlaceholder(placeholders[i]);
    }, 3000);
    return () => clearInterval(interval);
  }, [isTyping, objective]);
  
  const isDisabled = objective.trim() === '' || isTyping;

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="flex flex-col items-center">
        <div className="box-border flex flex-row justify-center items-center py-3 px-6 gap-2.5 w-auto bg-white border border-[#CEE0FF] rounded-full text-[#1A3162] text-base font-medium whitespace-nowrap">
          Responder dudas / preguntas
        </div>
        
        <div className="flex flex-col items-center gap-1 my-3">
          <div className="w-px h-6 bg-[#5087FF]"></div>
          <span className="text-sm text-[#1A3162] leading-[14px]">Hasta lograr</span>
          <div className="w-px h-6 bg-[#5087FF]"></div>
        </div>

        <div className="flex flex-col items-center gap-3 w-full">
          <input
            ref={inputRef}
            type="text"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            readOnly={isTyping}
            placeholder={placeholder}
            className={`box-border flex items-center px-3 py-2 w-[452px] h-10 bg-white border rounded placeholder-gray-400 text-sm focus:border-[#6464FF] outline-none transition-all duration-300 ${isTyping ? 'cursor-default' : ''} border-[#D5D5DE]`}
          />
          <div className="flex items-center justify-center gap-2">
            {suggestions.map((item) => (
              <button
                key={item.text}
                onClick={() => setObjective(item.text)}
                disabled={isTyping}
                className="px-2.5 py-1 text-sm border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                <span className="mr-1.5" role="img" aria-label={item.text}>{item.icon}</span>{item.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onCreateAgent}
        disabled={isDisabled}
        className={`flex flex-row justify-center items-center px-2 w-[188px] h-8 min-h-[32px] max-h-[32px] rounded text-sm font-medium transition-colors ${
            isDisabled
            ? 'bg-[rgba(16,16,81,0.14)] text-gray-400 cursor-not-allowed'
            : 'bg-[#6464FF] text-white hover:bg-[#7474FF] active:bg-[#5050DD]'
        }`}
        style={{
            boxShadow: !isDisabled ? '0px 5px 2px rgba(182, 182, 194, 0.01), 0px 3px 2px rgba(182, 182, 194, 0.05), 0px 1px 1px rgba(182, 182, 194, 0.09), 0px 0px 1px rgba(182, 182, 194, 0.1)' : 'none',
        }}
      >
        <span>Crear Agente IA</span>
      </button>
    </div>
  );
};

export default DataCollectionCard;