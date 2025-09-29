// Fix: Changed React import to resolve "Cannot find namespace 'JSX'" error.
import * as React from 'react';
import Header from './components/Header';
import DataCollectionCard from './components/DataCollectionCard';
import KnowledgeBaseCard from './components/KnowledgeBaseCard';
import AgentCreatorScreen from './components/AgentCreatorScreen';
import LoadingScreen from './components/LoadingScreen';
import { Question } from './components/DataCollectionContent';
import FinalScreen from './components/FinalScreen';
import TemplateCard, { Template } from './components/TemplateCard';
import SaveDataModal from './components/SaveDataModal';

const templates: Template[] = [
    {
      icon: '🎓',
      title: 'Educación',
      fields: ['Nombre', 'Programa de interés', 'País / Región', 'Matrícula'],
      description: 'Perfila estudiantes de acuerdo al interés del programa educativo.',
    },
    {
      icon: '🏡',
      title: 'Bienes Raíces',
      fields: ['Nombre', 'Presupuesto', 'Edad', 'País / Región'],
      description: 'Perfila clientes potenciales de acuerdo a su presupuesto y lugar de residencia.',
    },
    {
      icon: '💳',
      title: 'Servicios financieros',
      fields: ['Nombre', 'Edad', 'País / Región', 'Tipo de crédito'],
      description: 'Recolecta datos importantes para poder crear un perfil crediticio adecuado.',
    },
    {
      icon: '🏥',
      title: 'Clínicas de salud',
      fields: ['Nombre', 'Email', 'País / Región', 'Tipo de Sangre'],
      description: 'Recolecta datos importantes para poder agendar una cita de valoración.',
    },
];

function App(): JSX.Element {
  const [step, setStep] = React.useState(1);
  const [instruction, setInstruction] = React.useState('');
  const [isCreatingAgent, setIsCreatingAgent] = React.useState(false);
  const [isAgentCreated, setIsAgentCreated] = React.useState(false);
  const [isAgentFinalized, setIsAgentFinalized] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [selectedIntegration, setSelectedIntegration] = React.useState<'HubSpot' | 'Sheets' | 'Treble'>('HubSpot');
  const [isHighlighting, setIsHighlighting] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [showSaveModal, setShowSaveModal] = React.useState(false);

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

  const parseInstructionToFields = (instructionText: string): string[] => {
    if (!instructionText) return [];
    
    let cleanedInstruction = instructionText
      .replace(/debes recolectar datos como/i, '')
      .replace(/recolectar datos como/i, '')
      .replace(/obtener el/i, '')
      .replace(/pedir/i, '')
      .replace(/necesito saber/i, '')
      .replace(/averiguar el/i, '')
      .replace(/debes recolectar/i, '')
      .replace(/recolecta datos como/i, '')
      .replace(/recolecta/i, '')
      .replace(/\./g, '')
      .trim();

    cleanedInstruction = cleanedInstruction.replace(/ y /gi, ', ');

    const fields = cleanedInstruction
      .split(',')
      .map(field => field.trim())
      .filter(field => field.length > 0);

    return fields;
  };

  const processInstructionAndShowModal = () => {
    if (instruction.trim() !== '') {
        const fields = parseInstructionToFields(instruction);
        
        const newQuestions: Question[] = (fields.length > 0 ? fields : ['Nombre', 'Email'])
            .map((field, index) => ({
                id: Date.now() + index,
                text: field.charAt(0).toUpperCase() + field.slice(1),
                saveTo: '',
            }));

        setQuestions(newQuestions);
        setShowSaveModal(true);
    }
  };

  const handleModalContinue = () => {
    setShowSaveModal(false);
    setStep(2); // Proceed to knowledge base screen
  };

  const handleCreateAgent = () => {
    setIsCreatingAgent(true);
  };

  const handleCreationComplete = () => {
    setIsCreatingAgent(false);
    setIsAgentCreated(true);
  };

  const handleSaveAndContinue = () => {
    setIsAgentFinalized(true);
  };

  if (isAgentFinalized) {
    return <FinalScreen />;
  }

  if (isCreatingAgent) {
    return <LoadingScreen onComplete={handleCreationComplete} />;
  }

  if (isAgentCreated) {
    return <AgentCreatorScreen url={url} setUrl={setUrl} questions={questions} setQuestions={setQuestions} onSaveAndContinue={handleSaveAndContinue} selectedIntegration={selectedIntegration} setSelectedIntegration={setSelectedIntegration} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#FAFAFC]">
      <Header />
      <main className="flex justify-center w-full py-10 px-4">
        {step === 1 && (
          <div className="flex flex-col items-center gap-8 max-w-[1008px] w-full"> {/* Content Wrapper */}
            <div className="flex flex-col items-center w-[550px]"> {/* Main content box */}
                <div className="box-border w-[90px] h-[90px] bg-white border border-[#EBEBF0] rounded-full flex items-center justify-center">
                    <span className="text-[52px]" aria-hidden="true">🤖</span>
                </div>
                <h2 className="text-xl font-medium text-gray-900 text-center mt-4">
                    Dile al Agente IA qué datos debe recolectar
                </h2>
                <div className="w-full mt-6">
                    <DataCollectionCard 
                        instruction={instruction}
                        setInstruction={setInstruction}
                        onCreateAgent={processInstructionAndShowModal}
                        isHighlighting={isHighlighting}
                        isTyping={isTyping}
                        textareaRef={textareaRef}
                    />
                </div>
            </div>
            {/* Templates Wrapper */}
            <div className="flex flex-col items-stretch gap-4 w-full">
                <p className="text-sm font-medium text-center text-[#676770]">
                    Plantillas para inspirarte
                </p>
                {/* Templates Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 w-full">
                    {templates.map((template) => (
                        <TemplateCard key={template.title} template={template} onTemplateClick={handleTemplateClick} isTyping={isTyping} />
                    ))}
                </div>
            </div>
        </div>
        )}
        {step === 2 && (
          <KnowledgeBaseCard 
            onContinue={handleCreateAgent}
            url={url}
            setUrl={setUrl}
          />
        )}
      </main>
      {showSaveModal && (
        <SaveDataModal
          isOpen={showSaveModal}
          onClose={() => setShowSaveModal(false)}
          onContinue={handleModalContinue}
          questions={questions}
          setQuestions={setQuestions}
          selectedIntegration={selectedIntegration}
          setSelectedIntegration={setSelectedIntegration}
        />
      )}
    </div>
  );
}

export default App;