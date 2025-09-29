import * as React from 'react';
import { Question } from './DataCollectionContent';
import { CloseIcon } from './icons/CloseIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { SelectChevronIcon } from './icons/SelectChevronIcon';

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

interface SaveDataModalProps {
    isOpen: boolean;
    onClose: () => void;
    onContinue: () => void;
    questions: Question[];
    setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
    selectedIntegration: 'HubSpot' | 'Sheets' | 'Treble';
    setSelectedIntegration: React.Dispatch<React.SetStateAction<'HubSpot' | 'Sheets' | 'Treble'>>;
}

const SaveDataModal: React.FC<SaveDataModalProps> = ({ isOpen, onClose, onContinue, questions, setQuestions, selectedIntegration, setSelectedIntegration }) => {
    const integrations: ('HubSpot' | 'Sheets' | 'Treble')[] = ['HubSpot', 'Sheets', 'Treble'];

    React.useEffect(() => {
        // Reset saveTo when integration changes
        setQuestions(prevQuestions => prevQuestions.map(q => ({ ...q, saveTo: '' })));
    }, [selectedIntegration, setQuestions]);

    const handleSaveToChange = (id: number, newSaveTo: string) => {
        setQuestions(questions.map(q => (q.id === id ? { ...q, saveTo: newSaveTo } : q)));
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 animate-fadeIn">
            <div 
                className="box-border flex flex-col items-start bg-white border border-[#EBEBF0] rounded-lg w-[544px] max-h-[90vh]"
                style={{
                    boxShadow: '0px 14px 5px rgba(182, 182, 194, 0.01), 0px 8px 5px rgba(182, 182, 194, 0.05), 0px 3px 3px rgba(182, 182, 194, 0.09), 0px 1px 2px rgba(182, 182, 194, 0.1)'
                }}
            >
                {/* Header */}
                <div className="flex flex-row justify-between items-center self-stretch p-6 pb-4">
                    <h2 className="text-base font-medium text-gray-900">¿Donde se deben guardar los datos recolectados?</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
                        <CloseIcon />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col items-start px-6 pt-4 pb-6 gap-6 self-stretch overflow-y-auto">
                    {/* Tabs */}
                    <div className="box-border flex flex-row items-center gap-1 self-stretch border-b border-[#EBEBF0]">
                        {integrations.map(name => {
                            const isSelected = selectedIntegration === name;
                            return (
                                <button 
                                    key={name}
                                    onClick={() => setSelectedIntegration(name)}
                                    className={`flex-1 flex justify-center items-center px-4 h-12 text-sm font-medium transition-colors ${isSelected ? 'text-gray-900 border-b-2 border-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
                                >
                                    {name}
                                </button>
                            );
                        })}
                    </div>

                    {/* Mapping List */}
                    <div className="flex flex-col items-start gap-3 self-stretch">
                        {questions.map(question => (
                            <div key={question.id} className="flex flex-row justify-center items-center gap-3 self-stretch">
                                {/* Field Name Input */}
                                <div className="flex-1">
                                    <input 
                                        type="text"
                                        value={question.text}
                                        disabled
                                        className="box-border w-full h-10 px-3 py-2 bg-gray-50 border border-[#EBEBF0] rounded text-sm text-gray-700 cursor-not-allowed"
                                    />
                                </div>
                                
                                <div className="text-gray-400 flex-shrink-0">
                                    <ArrowRightIcon />
                                </div>

                                {/* Dropdown */}
                                <div className="relative flex-1">
                                    <select
                                        value={question.saveTo}
                                        onChange={(e) => handleSaveToChange(question.id, e.target.value)}
                                        className="appearance-none w-full h-10 pl-3 pr-8 bg-white border border-[#D5D5DE] rounded text-sm text-gray-900 focus:border-[#6464FF] outline-none cursor-pointer"
                                    >
                                        <option value="" disabled>Seleccionar...</option>
                                        {integrationOptions[selectedIntegration].map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <SelectChevronIcon />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Footer */}
                <div className="flex flex-row justify-end items-center self-stretch p-6 pt-4 border-t border-[#EBEBF0]">
                    <button
                        onClick={onContinue}
                        className="h-10 px-4 bg-[#6464FF] text-white text-sm font-medium rounded hover:bg-[#7474FF] active:bg-[#5050DD] transition-colors"
                    >
                        Guardar y continuar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SaveDataModal;