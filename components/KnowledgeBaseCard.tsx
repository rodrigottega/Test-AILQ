import * as React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface KnowledgeBaseCardProps {
  onBack: () => void;
  onCreateAgent: () => void;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

const KnowledgeBaseCard: React.FC<KnowledgeBaseCardProps> = ({ onBack, onCreateAgent, url, setUrl }) => {

  return (
    <div
      className="box-border flex flex-col items-start p-6 gap-8 w-[550px] bg-white border border-[#EBEBF0] rounded-lg"
      style={{
        boxShadow:
          '0px 14px 5px rgba(182, 182, 194, 0.01), 0px 8px 5px rgba(182, 182, 194, 0.05), 0px 3px 3px rgba(182, 182, 194, 0.09), 0px 1px 2px rgba(182, 182, 194, 0.1)',
      }}
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex flex-row items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors h-5"
      >
        <ArrowLeftIcon />
        <span className="text-sm font-medium">Regresar</span>
      </button>

      {/* Content */}
      <div className="flex flex-col items-start p-0 gap-6 self-stretch">
        {/* Title Section */}
        <div className="flex flex-row items-center p-0 gap-3 self-stretch h-8">
          <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
            <span className="text-lg" aria-hidden="true">📚</span>
          </div>
          <h2 className="text-base font-medium text-gray-900">
            Base de conocimientos <span className="text-gray-500">(Paso opcional)</span>
          </h2>
        </div>

        {/* Input Section */}
        <div className="flex flex-col items-start p-0 gap-4 self-stretch">
          <p className="text-sm text-[#676770] self-stretch">
            Agrega tu sitio web para que el Agente IA tenga información acerca de tu empresa que le ayude a responder posibles preguntas de tus clientes.
          </p>
          <div className="flex flex-col items-start gap-1 w-full">
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
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={onCreateAgent}
        className="flex flex-row justify-center items-center px-2 w-full h-8 min-h-[32px] max-h-[32px] bg-[#6464FF] hover:bg-[#7474FF] active:bg-[#5050DD] rounded text-white text-sm font-medium transition-colors"
        style={{
          boxShadow: '0px 5px 2px rgba(182, 182, 194, 0.01), 0px 3px 2px rgba(182, 182, 194, 0.05), 0px 1px 1px rgba(182, 182, 194, 0.09), 0px 0px 1px rgba(182, 182, 194, 0.1)',
        }}
      >
        <span>Crear Agente IA</span>
      </button>
    </div>
  );
};

export default KnowledgeBaseCard;