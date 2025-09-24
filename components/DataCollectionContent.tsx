import * as React from 'react';
import QuestionBlock from './QuestionBlock';
import { PlusIcon } from './icons/PlusIcon';

export interface Question {
    id: number;
    text: string;
    saveTo: string;
}

interface DataCollectionContentProps {
    questions: Question[];
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
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
        '{{hubspot_other}}',
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

const DataCollectionContent: React.FC<DataCollectionContentProps> = ({ questions, setQuestions }) => {
    const [selectedIntegration, setSelectedIntegration] = React.useState<'HubSpot' | 'Sheets' | 'Treble'>('HubSpot');
    const integrations: ('HubSpot' | 'Sheets' | 'Treble')[] = ['HubSpot', 'Sheets', 'Treble'];

    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [showShadow, setShowShadow] = React.useState(false);

    React.useEffect(() => {
        const checkScrollability = () => {
            const element = scrollContainerRef.current;
            if (element) {
                const isScrollable = element.scrollHeight > element.clientHeight;
                setShowShadow(isScrollable);
            }
        };

        // Initial check
        checkScrollability();

        // Check on window resize
        window.addEventListener('resize', checkScrollability);

        // Cleanup
        return () => {
            window.removeEventListener('resize', checkScrollability);
        };
    }, [questions]); // Re-run when questions change

    React.useEffect(() => {
        // When integration changes, reset the saveTo field for all questions
        setQuestions(prevQuestions => prevQuestions.map(q => ({ ...q, saveTo: '' })));
    }, [selectedIntegration, setQuestions]);


    const handleQuestionChange = (id: number, newText: string) => {
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

    const handleAddQuestion = () => {
        const newQuestion: Question = {
            id: Date.now(),
            text: '',
            saveTo: '',
        };
        setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
    };

    return (
        <div className="flex flex-col h-full w-full max-w-[576px]">
            {/* Section Title */}
            <div className="flex flex-col items-start gap-2 self-stretch flex-shrink-0">
                <h2 className="text-base font-medium text-gray-900">Datos que el Agente IA debe recolectar</h2>
                <p className="text-sm text-gray-600">El Agente IA recolecta información a través de preguntas.</p>
            </div>
            
            {/* Radio Wrapper */}
            <div className="flex flex-row items-start gap-2 self-stretch mt-6 flex-shrink-0">
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
                            <span className="text-sm font-medium text-gray-800">{`Guardar en ${name}`}</span>
                        </label>
                    );
                })}
            </div>

            {/* Scrollable Questions and Sticky Button Container */}
            <div ref={scrollContainerRef} className="flex-grow mt-4 overflow-y-auto relative">
                <div className="flex flex-col items-start gap-3 self-stretch pr-2">
                    {questions.map((question, index) => (
                        <QuestionBlock 
                            key={question.id}
                            question={question}
                            index={index}
                            totalQuestions={questions.length}
                            onDelete={() => handleDeleteQuestion(question.id)}
                            onTextChange={(newText) => handleQuestionChange(question.id, newText)}
                            onSaveToChange={(newSaveTo) => handleSaveToChange(question.id, newSaveTo)}
                            onMove={handleMove}
                            canBeDeleted={questions.length > 1}
                            saveToOptions={integrationOptions[selectedIntegration]}
                        />
                    ))}
                </div>

                 {/* Button Wrapper */}
                <div 
                    className="sticky bottom-0 pt-4 bg-white pr-2"
                    style={showShadow ? {boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.05)'} : {}}
                >
                    <button
                        onClick={handleAddQuestion}
                        className="box-border flex flex-row justify-center items-center px-3 gap-1 w-full h-10 min-h-[40px] max-h-[40px] bg-white border border-[#D5D5DE] rounded hover:bg-gray-50 transition-colors text-sm font-medium text-gray-800"
                        style={{
                            boxShadow: '0px 5px 2px rgba(182, 182, 194, 0.01), 0px 3px 2px rgba(182, 182, 194, 0.05), 0px 1px 1px rgba(182, 182, 194, 0.09), 0px 0px 1px rgba(182, 182, 194, 0.1)',
                        }}
                    >
                        <PlusIcon />
                        <span>Agregar pregunta</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataCollectionContent;