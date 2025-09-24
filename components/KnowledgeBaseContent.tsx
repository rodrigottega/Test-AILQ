import * as React from 'react';
import { InfoIcon } from './icons/InfoIcon';
import { UploadIcon } from './icons/UploadIcon';

interface KnowledgeBaseContentProps {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

const KnowledgeBaseContent: React.FC<KnowledgeBaseContentProps> = ({ url, setUrl }) => {
  const [additionalContext, setAdditionalContext] = React.useState('');

  return (
    <div className="flex flex-col h-full w-full max-w-[576px] gap-4 overflow-y-auto pr-2">
      {/* Title */}
      <div className="flex flex-col items-start gap-2 self-stretch">
        <h2 className="text-base font-medium text-gray-900">Base de conocimiento</h2>
        <p className="text-sm text-gray-600">
          Información importante acerca de tu empresa que le ayuda a responder posibles preguntas de tus clientes al Agente IA.
        </p>
      </div>

      {/* Alert */}
      <div className="box-border flex flex-row items-center p-3 gap-2 w-full bg-[#F6F9FF] border border-[#CEE0FF] rounded">
        <InfoIcon className="h-5 w-5 text-blue-700" />
        <span className="text-sm font-medium text-blue-700">
          Cómo crear bases de conocimiento efectivas.
        </span>
      </div>

      {/* URL Input */}
      <div className="flex flex-col items-start gap-1 w-full">
        <label htmlFor="kb-website-url" className="text-sm font-medium text-gray-700">
          URL del sitio web
        </label>
        <div className="w-full">
          <input
            id="kb-website-url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="box-border flex items-center px-3 py-2 w-full h-9 border border-[#D5D5DE] rounded placeholder-gray-400 text-sm focus:border-[#6464FF] outline-none"
            placeholder="Escribe la URL..."
          />
        </div>
      </div>

      {/* Additional Context */}
      <div className="flex flex-col items-start gap-1 w-full">
        <div className="flex flex-row items-center gap-1">
            <label htmlFor="additional-context" className="text-sm font-medium text-gray-700">
                Contexto adicional
            </label>
            <InfoIcon className="h-4 w-4 text-gray-400" />
        </div>
        <textarea
            id="additional-context"
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            className="box-border w-full h-40 p-3 border border-[#D5D5DE] rounded placeholder-gray-400 text-sm focus:border-[#6464FF] outline-none resize-none"
            placeholder="Escribe aquí..."
        />
      </div>

      {/* File Upload */}
      <div className="flex flex-col items-start gap-2 w-full">
        <div className="flex flex-row items-center gap-1">
            <label className="text-sm font-medium text-gray-700">
                Documentos de referencia <span className="text-gray-500 font-normal">(opcional)</span>
            </label>
             <InfoIcon className="h-4 w-4 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">
            Formatos válidos: DOC, DOCX, MD, PDF, PPTX, TXT. Máximo 2 MB por archivo (hasta 3 archivos).
        </p>
        <button
            className="box-border flex flex-row justify-center items-center px-3 gap-2 w-full h-12 bg-white border border-[#D5D5DE] rounded hover:bg-gray-50 transition-colors text-sm font-medium text-gray-800"
            style={{boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)'}}
        >
            <UploadIcon />
            <span>Subir documentos</span>
        </button>
      </div>

    </div>
  );
};

export default KnowledgeBaseContent;