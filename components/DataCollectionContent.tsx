import * as React from 'react';
import QuestionBlock from './QuestionBlock';
import { PlusIcon } from './icons/PlusIcon';
import { InfoIcon } from './icons/InfoIcon';

export interface Question {
    id: number;
    text: string;
    saveTo: string;
}

interface DataCollectionContentProps {
    questions: Question[];
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
    selectedIntegration: 'HubSpot' | 'Sheets' | 'Treble';
    setSelectedIntegration: React.Dispatch<React.SetStateAction<'HubSpot' | 'Sheets' | 'Treble'>>;
}

const integrationOptions = {
    HubSpot: [
        '{{hubspot_firstname}}',
        '{{hubspot_lastname}}',
        '{{hubspot_email}}',
        '{{hubspot_phone}}',
        '{{hubspot_country}}',
        '{{hubspot_birthdate}}',
        '{{hubspot_text}}',
        '{{hubspot_number}}',
    ],
    Sheets: [
        '{{sheets_column_a}}',
        '{{sheets_column_b}}',
        '{{sheets_column_c}}',
        '{{sheets_column_d}}',
        '{{sheets_column_e}}',
        '{{sheets_column_f}}',
    ],
    Treble: [
        '{{treble_firstname}}',
        '{{treble_lastname}}',
        '{{treble_email}}',
        '{{treble_phone}}',
        '{{treble_custom_field_1}}',
        '{{treble_custom_field_2}}',
        '{{treble_custom_field_3}}',
    ],
};

const DataCollectionContent: React.FC<DataCollectionContentProps> = ({ questions, setQuestions, selectedIntegration, setSelectedIntegration }) => {
    const integrations: ('HubSpot' | 'Sheets' | 'Treble')[] = ['HubSpot', 'Sheets', 'Treble'];
    const [exampleQuestion, setExampleQuestion] = React.useState('¿Me podrías compartir tu nombre por favor?');

    const isInitialMount = React.useRef(true);
    
    React.useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        setQuestions(prevQuestions => prevQuestions.map(q => ({ ...q, saveTo: '' })));
    }, [selectedIntegration, setQuestions]);

    const handleQuestionTextChange = (id: number, newText: string) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, text: newText } : q));
    };

    const handleSaveToChange = (id: number, newSaveTo: string) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, saveTo: newSaveTo } : q));
    };

    const handleDeleteQuestion = (id: number) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const handleMove = (index: number, direction: 'up' | 'down') => {
        const newQuestions = [...questions];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newQuestions.length) return;
        
        [newQuestions[index], newQuestions[targetIndex]] = [newQuestions[targetIndex], newQuestions[index]];
        setQuestions(newQuestions);
    };

    const handleAddData = () => {
        const newQuestion: Question = {
            id: Date.now(),
            text: '',
            saveTo: '',
        };
        setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
    };

    return (
        <div className="flex flex-col h-full w-full max-w-[576px] gap-4">
            {/* Top Box for Example Question */}
            <div className="box-border flex flex-col items-start p-4 gap-4 self-stretch bg-[#FAFAFC] border border-[#EBEBF0] rounded-lg">
                <div className="flex flex-col items-start gap-1 self-stretch">
                    <h3 className="text-sm font-medium text-gray-900">El Agente IA hará preguntas para recolectar los datos.</h3>
                </div>
                <div className="flex flex-col items-start gap-1 self-stretch">
                    <label htmlFor="example-question" className="flex items-center gap-1 text-sm text-gray-700">
                        Ejemplo de cómo debe formular las preguntas el Agente IA
                        <InfoIcon className="h-4 w-4 text-gray-400" />
                    </label>
                    <input
                        id="example-question"
                        type="text"
                        value={exampleQuestion}
                        onChange={(e) => setExampleQuestion(e.target.value)}
                        className="box-border flex items-center px-3 py-2 w-full h-9 border border-[#D5D5DE] rounded bg-white placeholder-gray-400 text-sm focus:border-[#6464FF] outline-none"
                    />
                </div>
            </div>

            {/* Bottom Box for Data Mapping */}
            <div className="box-border flex flex-col items-start p-4 gap-6 self-stretch bg-[#FAFAFC] border border-[#EBEBF0] rounded-lg flex-grow min-h-0">
                 <div className="flex flex-col items-start gap-2 self-stretch">
                    <h3 className="text-sm font-medium text-gray-900">¿Donde se deben guardar los datos recolectados?</h3>
                 </div>
                 {/* Radio Wrapper */}
                <div className="flex flex-row items-start gap-2 self-stretch">
                    {integrations.map(name => {
                        const isSelected = selectedIntegration === name;
                        return (
                            <label key={name} className={`box-border flex-1 flex flex-row items-center p-3 gap-2.5 rounded border cursor-pointer transition-colors ${isSelected ? 'border-[#6464FF] bg-white' : 'border-[#EBEBF0] bg-white hover:bg-gray-50'}`}>
                                <input 
                                    type="radio" 
                                    name="integration" 
                                    value={name}
                                    checked={isSelected}
                                    onChange={() => setSelectedIntegration(name)}
                                    className="hidden"
                                />
                                <div className={`relative w-4 h-4 rounded-full border flex-shrink-0 transition-colors ${isSelected ? 'border-[#6464FF]' : 'border-[#D5D5DE]'}`}>
                                    {isSelected && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#6464FF] rounded-full"></div>}
                                </div>
                                <span className="text-sm font-medium text-gray-800 whitespace-nowrap">{name}</span>
                            </label>
                        );
                    })}
                </div>

                {/* Scrollable Questions Container */}
                <div className="flex-grow w-full overflow-y-auto relative">
                    <div className="flex flex-col items-start gap-3 self-stretch">
                        {questions.map((question, index) => (
                            <QuestionBlock 
                                key={question.id}
                                question={question}
                                index={index}
                                totalQuestions={questions.length}
                                onDelete={() => handleDeleteQuestion(question.id)}
                                onTextChange={(newText) => handleQuestionTextChange(question.id, newText)}
                                onSaveToChange={(newSaveTo) => handleSaveToChange(question.id, newSaveTo)}
                                onMove={handleMove}
                                canBeDeleted={questions.length > 1}
                                saveToOptions={integrationOptions[selectedIntegration]}
                            />
                        ))}
                    </div>
                </div>

                {/* Button Wrapper */}
                <div className="w-full flex-shrink-0">
                    <button
                        onClick={handleAddData}
                        className="box-border flex flex-row justify-center items-center px-3 gap-1 w-full h-10 min-h-[40px] max-h-[40px] bg-white border border-[#D5D5DE] rounded hover:bg-gray-50 transition-colors text-sm font-medium text-gray-800"
                        style={{
                            boxShadow: '0px 5px 2px rgba(182, 182, 194, 0.01), 0px 3px 2px rgba(182, 182, 194, 0.05), 0px 1px 1px rgba(182, 182, 194, 0.09), 0px 0px 1px rgba(182, 182, 194, 0.1)',
                        }}
                    >
                        <PlusIcon />
                        <span>Agregar dato</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataCollectionContent;