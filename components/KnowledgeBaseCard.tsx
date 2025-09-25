import * as React from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface KnowledgeBaseCardProps {
  onContinue: () => void;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

const KnowledgeBaseCard: React.FC<KnowledgeBaseCardProps> = ({ onContinue, url, setUrl }) => {

  return (
    <div className="flex flex-col items-center p-0 gap-4 w-[550px] animate-fadeIn">
      {/* Main Image */}
      <div className="box-border w-[90px] h-[90px] bg-white border border-[#EBEBF0] rounded-full flex items-center justify-center">
          <span className="text-[52px]" aria-hidden="true">📚</span>
      </div>
      
      {/* Content Wrapper */}
      <div className="flex flex-col items-center p-0 gap-6 w-full">
        {/* Title + description */}
        <div className="flex flex-col items-center p-0 gap-2 text-center">
            <h2 className="text-xl font-medium text-gray-900">
                Base de conocimientos <span className="text-gray-500">(Paso opcional)</span>
            </h2>
            <p className="text-sm text-[#676770] max-w-[498px]">
              Agrega el sitio web de tu empresa para que el Agente IA tenga información que le ayude a responder posibles preguntas de tus clientes.
            </p>
        </div>

        {/* Input Section */}
        <div className="flex flex-col items-start gap-1 w-[292px]">
          <label htmlFor="website-url" className="text-sm font-medium text-gray-700">
            URL del sitio web
          </label>
          <div className="w-full">
            <input
              id="website-url"
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="box-border flex items-center px-3 py-2 w-full h-9 border border-[#D5D5DE] rounded placeholder-gray-400 text-sm focus:border-[#6464FF] outline-none"
              placeholder="Escribe la URL..."
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onContinue}
          className="flex flex-row justify-center items-center px-2 gap-2 w-[188px] h-8 min-h-[32px] max-h-[32px] bg-[#6464FF] hover:bg-[#7474FF] active:bg-[#5050DD] rounded text-white text-sm font-medium transition-colors"
          style={{
            boxShadow: '0px 5px 2px rgba(182, 182, 194, 0.01), 0px 3px 2px rgba(182, 182, 194, 0.05), 0px 1px 1px rgba(182, 182, 194, 0.09), 0px 0px 1px rgba(182, 182, 194, 0.1)',
          }}
        >
          <span>Continuar</span>
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
};

export default KnowledgeBaseCard;