import * as React from 'react';
import AgentCreatorHeader from './AgentCreatorHeader';
import Sidebar from './Sidebar';
import DataCollectionContent, { Question } from './DataCollectionContent';
import GeneralInstructionsContent from './GeneralInstructionsContent';
import KnowledgeBaseContent from './KnowledgeBaseContent';
import TestBox from './TestBox';
import AgentReadyModal from './AgentReadyModal';

interface AgentCreatorScreenProps {
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  onSaveAndContinue: () => void;
  selectedIntegration: 'HubSpot' | 'Sheets' | 'Treble';
  setSelectedIntegration: React.Dispatch<React.SetStateAction<'HubSpot' | 'Sheets' | 'Treble'>>;
}

const AgentCreatorScreen: React.FC<AgentCreatorScreenProps> = ({ url, setUrl, questions, setQuestions, onSaveAndContinue, selectedIntegration, setSelectedIntegration }) => {
  const [activeTab, setActiveTab] = React.useState('Datos para recolectar');
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="h-screen w-full bg-[#FAFAFC] flex flex-col">
      <AgentCreatorHeader onSaveAndContinue={onSaveAndContinue} />
      <main className="p-4 flex-grow overflow-auto flex justify-center">
        <div 
            className="box-border flex flex-row items-start p-4 gap-8 w-full max-w-[1400px] h-full bg-white border border-[#EBEBF0] rounded-lg"
            style={{
                boxShadow: '0px 5px 2px rgba(182, 182, 194, 0.01), 0px 3px 2px rgba(182, 182, 194, 0.05), 0px 1px 1px rgba(182, 182, 194, 0.09), 0px 0px 1px rgba(182, 182, 194, 0.1)',
            }}
        >
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-grow h-full rounded overflow-hidden">
                {activeTab === 'Datos para recolectar' && <DataCollectionContent questions={questions} setQuestions={setQuestions} selectedIntegration={selectedIntegration} setSelectedIntegration={setSelectedIntegration} />}
                {activeTab === 'Instrucciones generales' && <GeneralInstructionsContent />}
                {activeTab === 'Base de conocimiento' && <KnowledgeBaseContent url={url} setUrl={setUrl} />}
            </div>
            <TestBox questions={questions} />
        </div>
      </main>
      {showModal && <AgentReadyModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AgentCreatorScreen;