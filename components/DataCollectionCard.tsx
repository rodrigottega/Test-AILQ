import * as React from 'react';
import { PlusIcon } from './icons/PlusIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { PlaceholdersAndVanishInput } from './ui/PlaceholdersAndVanishInput';

interface DataCollectionCardProps {
  instruction: string;
  // Fix: Updated the prop type to correctly handle functional state updates from React.useState.
  setInstruction: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void;
}

const DataCollectionCard: React.FC<DataCollectionCardProps> = ({ instruction, setInstruction, onNext }) => {
  const exampleData = ["Nombre", "Email", "País / Región", "Fecha de nacimiento", "Producto / Interés"];
  const [showMore, setShowMore] = React.useState(false);
  const [isVanishing, setIsVanishing] = React.useState(false);
  const [isHighlighting, setIsHighlighting] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [hoveredTemplate, setHoveredTemplate] = React.useState<string | null>(null);

  const templates = [
    {
      icon: '🎓',
      title: 'Educación',
      fields: ['Nombre', 'Programa de interés', 'País / Región', 'Matrícula'],
      description: 'Perfila estudiantes de acuerdo al interés del programa educativo.',
    },
    {
      icon: '🏥',
      title: 'Clínicas de salud',
      fields: ['Nombre', 'Email', 'País / Región', 'Tipo de Sangre'],
      description: 'Recolecta datos importantes para poder agendar una cita de valoración.',
    },
    {
      icon: '💳',
      title: 'Servicios financieros',
      fields: ['Nombre', 'Edad', 'País / Región', 'Tipo de crédito'],
      description: 'Recolecta datos importantes para poder crear un perfil crediticio adecuado.',
    },
    {
      icon: '🏡',
      title: 'Bienes Raíces',
      fields: ['Nombre', 'Presupuesto', 'Edad', 'País / Región'],
      description: 'Perfila clientes potenciales de acuerdo a su presupuesto y lugar de residencia.',
    },
  ];

  const placeholders = [
    "Recolectar nombre y correo electrónico.",
    "Obtener el país y producto de interés del cliente.",
    "Pedir nombre completo, email y teléfono de contacto.",
    "Necesito saber la edad y el presupuesto del lead.",
    "Averiguar el programa educativo de interés."
  ];

  const templatesToShow = showMore ? templates : templates.slice(0, 2);

  const handleExampleClick = (item: string) => {
    if (isTyping) return;
    setInstruction(prevValue => {
      if (prevValue.trim() === '') {
        return item;
      }
      return `${prevValue}, ${item}`;
    });
  };

  const handleTemplateClick = (fields: string[]) => {
    if (isTyping || !fields || fields.length === 0) return;

    const formattedFields = fields.length > 1
      ? `${fields.slice(0, -1).join(', ')} y ${fields.slice(-1)}`
      : fields[0];

    const fullInstruction = `Debes recolectar ${formattedFields}`;
    
    setInstruction(''); // Clear the textarea
    setIsHighlighting(true);
    textareaRef.current?.focus();
    setIsTyping(true);

    let i = 0;
    const typingInterval = setInterval(() => {
      i++;
      setInstruction(fullInstruction.substring(0, i));
      if (i >= fullInstruction.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
        setIsHighlighting(false);
      }
    }, 40); // Typing speed in ms
  };

  const handleNextClick = () => {
    if (instruction.trim() === '') return;

    setIsVanishing(true);

    setTimeout(() => {
        onNext();
    }, 1500);
  };


  return (
    <div
      className="box-border flex flex-col items-start p-6 gap-6 w-[550px] bg-white border border-[#EBEBF0] rounded-lg"
      style={{
        boxShadow:
          '0px 14px 5px rgba(182, 182, 194, 0.01), 0px 8px 5px rgba(182, 182, 194, 0.05), 0px 3px 3px rgba(182, 182, 194, 0.09), 0px 1px 2px rgba(182, 182, 194, 0.1)',
      }}
    >
      {/* Title Section */}
      <div className={`flex flex-row items-center p-0 gap-3 self-stretch transition-opacity duration-500 ${isHighlighting ? 'opacity-50' : 'opacity-100'}`}>
        <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full">
          <span className="text-lg" aria-hidden="true">🤖</span>
        </div>
        <h2 className="text-base font-medium text-gray-900">
          Dile al Agente IA qué datos debe recolectar
        </h2>
      </div>

      {/* Main Content Wrapper */}
      <div className="flex flex-col items-start p-0 gap-3 self-stretch">
        {/* Examples Section */}
        <div className={`flex flex-col items-start p-0 gap-3 self-stretch transition-opacity duration-500 ${isHighlighting ? 'opacity-50' : 'opacity-100'}`}>
            <p className="text-sm text-gray-600">Ejemplos de datos</p>
            <div className="flex flex-wrap gap-2">
                {exampleData.map((item) => (
                    <button
                    key={item}
                    onClick={() => handleExampleClick(item)}
                    disabled={isTyping}
                    className="px-3 py-1 text-sm border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                    {item}
                    </button>
                ))}
            </div>
        </div>

        {/* Input Section */}
        <PlaceholdersAndVanishInput
            ref={textareaRef}
            placeholders={placeholders}
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            isVanishing={isVanishing}
            isHighlighting={isHighlighting}
            isTyping={isTyping}
        />
      </div>

      {/* Templates Section */}
      <div className={`flex flex-col items-start p-0 gap-3 self-stretch transition-opacity duration-500 ${isHighlighting ? 'opacity-50' : 'opacity-100'}`}>
        {/* Templates Title */}
        <div className="flex flex-row justify-between items-center self-stretch">
          <p className="text-sm text-gray-600">
            Plantillas para inspirarte
          </p>
          <button
            onClick={() => setShowMore(!showMore)}
            className="flex flex-row items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <span className="text-sm font-medium">{showMore ? 'Ver menos' : 'Ver más'}</span>
            <div className={`transition-transform duration-300 ${showMore ? 'rotate-180' : ''}`}>
              <ChevronDownIcon />
            </div>
          </button>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-2 gap-2 self-stretch">
          {templatesToShow.map((template) => (
            <div key={template.title} className="box-border flex flex-col items-start p-3 gap-4 border border-[#EBEBF0] rounded">
              {/* Top section: Icon and Button */}
              <div className="flex flex-row justify-between items-start self-stretch">
                <div className="w-8 h-8 rounded-full border border-[#EBEBF0] flex items-center justify-center bg-white">
                  <span aria-hidden="true">{template.icon}</span>
                </div>
                <div 
                  className="relative"
                  onMouseEnter={() => setHoveredTemplate(template.title)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                >
                  <button
                    onClick={() => handleTemplateClick(template.fields)}
                    disabled={isTyping}
                    className="box-border flex justify-center items-center w-6 h-6 min-w-[24px] max-w-[24px] h-6 min-h-[24px] max-h-[24px] bg-white border border-[#EBEBF0] rounded text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      boxShadow: '0px 5px 2px rgba(182, 182, 194, 0.01), 0px 3px 2px rgba(182, 182, 194, 0.05), 0px 1px 1px rgba(182, 182, 194, 0.09), 0px 0px 1px rgba(182, 182, 194, 0.1)',
                    }}
                    aria-label={`Usar plantilla ${template.title}`}
                  >
                    <PlusIcon />
                  </button>
                  {hoveredTemplate === template.title && (
                    <div
                      className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 bg-[#1C1C1F] text-white text-xs rounded border border-[#EBEBF0] z-10"
                      style={{
                          boxShadow: '0px 17px 7px rgba(182, 182, 194, 0.02), 0px 10px 6px rgba(182, 182, 194, 0.06), 0px 4px 4px rgba(182, 182, 194, 0.1), 0px 1px 2px rgba(182, 182, 194, 0.12)',
                      }}
                    >
                      Usar plantilla
                    </div>
                  )}
                </div>
              </div>
              {/* Main info */}
              <div className="flex flex-col items-start gap-3 self-stretch">
                <p className="text-sm font-medium text-gray-900">{template.title}</p>
                <div className="flex flex-row flex-wrap gap-2">
                  {template.fields.map((field) => (
                    <span key={field} className="px-2 py-0.5 text-xs bg-[#FAFAFC] border border-[#EBEBF0] rounded-full text-gray-700">{field}</span>
                  ))}
                </div>
              </div>
              {/* Description */}
              <p className="text-xs text-gray-500 self-stretch">
                {template.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleNextClick}
        disabled={instruction.trim() === '' || isVanishing || isTyping}
        className={`flex flex-row justify-center items-center px-2 gap-2 w-full h-8 min-h-[32px] max-h-[32px] bg-[#6464FF] hover:bg-[#7474FF] active:bg-[#5050DD] rounded text-white text-sm font-medium transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed transition-opacity duration-500 ${isHighlighting ? 'opacity-50' : 'opacity-100'}`}
        style={{
          boxShadow: '0px 5px 2px rgba(182, 182, 194, 0.01), 0px 3px 2px rgba(182, 182, 194, 0.05), 0px 1px 1px rgba(182, 182, 194, 0.09), 0px 0px 1px rgba(182, 182, 194, 0.1)',
        }}
      >
        <span>Siguiente paso</span>
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default DataCollectionCard;