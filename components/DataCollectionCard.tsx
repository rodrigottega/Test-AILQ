import * as React from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { PlaceholdersAndVanishInput } from './ui/PlaceholdersAndVanishInput';

interface DataCollectionCardProps {
  instruction: string;
  // Fix: Updated the prop type to correctly handle functional state updates from React.useState.
  setInstruction: React.Dispatch<React.SetStateAction<string>>;
  onCreateAgent: () => void;
  isHighlighting: boolean;
  isTyping: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const DataCollectionCard: React.FC<DataCollectionCardProps> = ({ instruction, setInstruction, onCreateAgent, isHighlighting, isTyping, textareaRef }) => {
  const exampleData = ["Nombre", "Email", "País / Región", "Fecha de nacimiento", "Producto"];

  const placeholders = [
    "Recolectar nombre y correo electrónico.",
    "Obtener el país y producto de interés del cliente.",
    "Pedir nombre completo, email y teléfono de contacto.",
    "Necesito saber la edad y el presupuesto del lead.",
    "Averiguar el programa educativo de interés."
  ];

  const handleExampleClick = (item: string) => {
    if (isTyping) return;
    setInstruction(prevValue => {
      if (prevValue.trim() === '') {
        return item;
      }
      return `${prevValue}, ${item}`;
    });
  };

  return (
    <div className="flex flex-col items-center p-0 gap-8 self-stretch w-full">
      {/* Input Wrapper */}
      <div className="flex flex-col items-center p-0 gap-3 self-stretch">
        {/* Input Section */}
        <PlaceholdersAndVanishInput
            ref={textareaRef}
            placeholders={placeholders}
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            isVanishing={false}
            isHighlighting={isHighlighting}
            isTyping={isTyping}
        />
        
        {/* Examples Section */}
        <div className="flex items-center justify-center gap-2 w-full overflow-x-auto pb-2">
            {exampleData.map((item) => (
                <button
                key={item}
                onClick={() => handleExampleClick(item)}
                disabled={isTyping}
                className="px-2.5 py-1 text-sm border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                {item}
                </button>
            ))}
        </div>
      </div>
      
      {/* Action Button */}
      <button
        onClick={onCreateAgent}
        disabled={instruction.trim() === '' || isTyping}
        className="flex flex-row justify-center items-center px-2 gap-2 w-[188px] h-8 min-h-[32px] max-h-[32px] bg-[#6464FF] hover:bg-[#7474FF] active:bg-[#5050DD] rounded text-white text-sm font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        style={{
          boxShadow: '0px 5px 2px rgba(182, 182, 194, 0.01), 0px 3px 2px rgba(182, 182, 194, 0.05), 0px 1px 1px rgba(182, 182, 194, 0.09), 0px 0px 1px rgba(182, 182, 194, 0.1)',
        }}
      >
        <span>Crear Agente IA</span>
      </button>
    </div>
  );
};

export default DataCollectionCard;