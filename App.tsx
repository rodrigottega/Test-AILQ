// Fix: Changed React import to resolve "Cannot find namespace 'JSX'" error.
import * as React from 'react';
import Header from './components/Header';
import DataCollectionCard from './components/DataCollectionCard';
import KnowledgeBaseCard from './components/KnowledgeBaseCard';
import AgentCreatorScreen from './components/AgentCreatorScreen';
import LoadingScreen from './components/LoadingScreen';
import { Question } from './components/DataCollectionContent';
import FinalScreen from './components/FinalScreen';

function App(): JSX.Element {
  const [step, setStep] = React.useState(1);
  const [instruction, setInstruction] = React.useState('');
  const [isCreatingAgent, setIsCreatingAgent] = React.useState(false);
  const [isAgentCreated, setIsAgentCreated] = React.useState(false);
  const [isAgentFinalized, setIsAgentFinalized] = React.useState(false);
  const [url, setUrl] = React.useState('');
  const [questions, setQuestions] = React.useState<Question[]>([]);

  const handleNext = () => {
    if (instruction.trim() !== '') {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
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

  const handleCreateAgent = () => {
    const fields = parseInstructionToFields(instruction);
        
    let newQuestions: Question[];

    if (fields.length > 0) {
        newQuestions = fields.map((field, index) => ({
            id: Date.now() + index,
            text: `Pregunta amablemente por el ${field.toLowerCase()} del cliente`,
            saveTo: '',
        }));
    } else {
        // Fallback to default questions if parsing fails or returns no fields
        newQuestions = [
            { id: 1, text: 'Pregunta amablemente por el nombre del cliente', saveTo: '' },
            { id: 2, text: 'Pregunta amablemente por el email del cliente', saveTo: '' },
            { id: 3, text: 'Pregunta amablemente por la fecha de nacimiento del cliente', saveTo: '' },
        ];
    }

    setQuestions(newQuestions);
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
    return <AgentCreatorScreen url={url} setUrl={setUrl} questions={questions} setQuestions={setQuestions} onSaveAndContinue={handleSaveAndContinue} />;
  }

  return (
    <div className="min-h-screen w-full bg-[#FAFAFC]">
      <Header />
      <main className="flex justify-center w-full pt-12 px-4">
        {step === 1 && (
          <DataCollectionCard 
            instruction={instruction}
            setInstruction={setInstruction}
            onNext={handleNext}
          />
        )}
        {step === 2 && (
          <KnowledgeBaseCard 
            onBack={handleBack} 
            onCreateAgent={handleCreateAgent}
            url={url}
            setUrl={setUrl}
          />
        )}
      </main>
    </div>
  );
}

export default App;
