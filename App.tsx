// Fix: Changed React import to resolve "Cannot find namespace 'JSX'" error.
import * as React from 'react';
import Header from './components/Header';
import DataCollectionCard from './components/DataCollectionCard';
import KnowledgeBaseCard from './components/KnowledgeBaseCard';
import AgentCreatorScreen from './components/AgentCreatorScreen';
import LoadingScreen from './components/LoadingScreen';
import FinalScreen from './components/FinalScreen';
import TemplateCard, { Template } from './components/TemplateCard';

const templates: Template[] = [
    {
      icon: '🎓',
      title: 'Educación',
      objective: 'Inscripción a programa',
      objectiveIcon: '🚀',
      description: 'El Agente IA responde a las preguntas de los candidatos hasta conseguir llevarlos al link de inscripción.',
    },
    {
      icon: '🏡',
      title: 'Bienes Raíces',
      objective: 'Agendar cita',
      objectiveIcon: '🗓️',
      description: 'El Agente IA responde a las preguntas de los clientes hasta conseguir agendar una cita con un Asesor inmobiliario.',
    },
    {
      icon: '👟',
      title: 'Tienda en línea',
      objective: 'Compra en línea',
      objectiveIcon: '🛍️',
      description: 'El Agente IA responde a las preguntas de los usuarios hasta conseguir llevarlos al link de compra.',
    },
    {
      icon: '🏥',
      title: 'Clínicas de salud',
      objective: 'Agendar cita',
      objectiveIcon: '🗓️',
      description: 'El Agente IA responde a las preguntas de los pacientes hasta conseguir agendar una cita en la clínica.',
    },
];

// Fix: Changed function declaration to a const with React.FC type to resolve "Cannot find namespace 'JSX'" error and align with component patterns in the project.
const App: React.FC = () => {
  const [step, setStep] = React.useState(1);
  const [objective, setObjective] = React.useState('');
  const [isCreatingAgent, setIsCreatingAgent] = React.useState(false);
  const [isAgentCreated, setIsAgentCreated] = React.useState(false);
  const [isAgentFinalized, setIsAgentFinalized] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleTemplateClick = (objectiveText: string) => {
    if (isTyping || !objectiveText) return;

    setObjective(''); // Clear the input
    inputRef.current?.focus();
    setIsTyping(true);

    let i = 0;
    const typingInterval = setInterval(() => {
      i++;
      setObjective(objectiveText.substring(0, i));
      if (i >= objectiveText.length) {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 40); // Typing speed in ms
  };

  const handleProceedToKnowledgeBase = () => {
    if (objective.trim() !== '') {
        setStep(2); // Go directly to the knowledge base screen
    }
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
    return <AgentCreatorScreen 
              objective={objective} 
              setObjective={setObjective} 
              url={url} 
              setUrl={setUrl} 
              onSaveAndContinue={handleSaveAndContinue} 
            />;
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
                    Dile al Agente IA qué objetivo debe lograr
                </h2>
                <div className="w-full mt-6">
                    <DataCollectionCard 
                        objective={objective}
                        setObjective={setObjective}
                        onCreateAgent={handleProceedToKnowledgeBase}
                        isTyping={isTyping}
                        inputRef={inputRef}
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
    </div>
  );
};

export default App;