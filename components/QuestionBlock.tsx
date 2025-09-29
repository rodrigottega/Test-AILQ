import * as React from 'react';
import { Question } from './DataCollectionContent';
import { TrashIcon } from './icons/TrashIcon';
import { ArrowUpIcon } from './icons/ArrowUpIcon';
import { ArrowDownIcon } from './icons/ArrowDownIcon';
import { SelectChevronIcon } from './icons/SelectChevronIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface QuestionBlockProps {
    question: Question;
    index: number;
    totalQuestions: number;
    canBeDeleted: boolean;
    onTextChange: (newText: string) => void;
    onSaveToChange: (newSaveTo: string) => void;
    onDelete: () => void;
    onMove: (index: number, direction: 'up' | 'down') => void;
    saveToOptions: string[];
}

const QuestionBlock: React.FC<QuestionBlockProps> = ({ question, index, totalQuestions, canBeDeleted, onTextChange, onSaveToChange, onDelete, onMove, saveToOptions }) => {
    return (
        <div className="flex flex-col items-start p-4 gap-4 self-stretch bg-white rounded">
            {/* Top Buttons */}
            <div className="flex flex-row justify-between items-center self-stretch h-8">
                {/* Badge */}
                <div className="box-border flex flex-row items-center py-0.5 px-2 bg-[#F7F8FF] border border-[#D5DCFF] rounded-full">
                    <span className="text-sm font-medium text-[#4646B9]">Dato - {index + 1}</span>
                </div>
                {/* Buttons Wrapper */}
                <div className="flex flex-row items-center gap-2">
                    {canBeDeleted && (
                        <button 
                            onClick={onDelete} 
                            className="box-border flex justify-center items-center w-8 h-8 bg-white border border-[#D5D5DE] rounded hover:bg-gray-50 transition-colors"
                            style={{ boxShadow: '0px 5px 2px rgba(182, 182, 194, 0.01), 0px 3px 2px rgba(182, 182, 194, 0.05), 0px 1px 1px rgba(182, 182, 194, 0.09), 0px 0px 1px rgba(182, 182, 194, 0.1)' }}
                            aria-label="Eliminar dato"
                        >
                            <TrashIcon />
                        </button>
                    )}
                    <div 
                        className="flex flex-row items-center bg-white border border-[#D5D5DE] rounded"
                        style={{ boxShadow: '0px 5px 2px rgba(182, 182, 194, 0.01), 0px 3px 2px rgba(182, 182, 194, 0.05), 0px 1px 1px rgba(182, 182, 194, 0.09), 0px 0px 1px rgba(182, 182, 194, 0.1)' }}
                    >
                       <button 
                            disabled={index === 0} 
                            onClick={() => onMove(index, 'up')} 
                            className="p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors rounded-l-sm"
                            aria-label="Mover dato hacia arriba"
                        >
                            <ArrowUpIcon />
                        </button>
                       <div className="w-px h-4 bg-[#D5D5DE]"></div>
                       <button 
                            disabled={index === totalQuestions - 1} 
                            onClick={() => onMove(index, 'down')} 
                            className="p-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors rounded-r-sm"
                            aria-label="Mover dato hacia abajo"
                        >
                            <ArrowDownIcon />
                        </button>
                    </div>
                </div>
            </div>

            {/* Input + Dropdown */}
            <div className="flex flex-row justify-center items-center gap-3 self-stretch">
                {/* Data Name Input */}
                <div className="flex-1">
                    <input 
                        type="text"
                        value={question.text}
                        onChange={(e) => onTextChange(e.target.value)}
                        placeholder="Nombre del dato..."
                        className="box-border w-full h-10 px-3 py-2 bg-white border border-[#D5D5DE] rounded text-sm text-gray-900 focus:border-[#6464FF] outline-none"
                    />
                </div>
                
                <div className="text-gray-400 flex-shrink-0">
                    <ArrowRightIcon />
                </div>

                {/* Dropdown */}
                <div className="relative flex-1">
                    <select
                        value={question.saveTo}
                        onChange={(e) => onSaveToChange(e.target.value)}
                        className="appearance-none w-full h-10 pl-3 pr-8 bg-white border border-[#D5D5DE] rounded text-sm text-gray-900 focus:border-[#6464FF] outline-none cursor-pointer"
                    >
                        <option value="" disabled>Seleccionar...</option>
                        {saveToOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <SelectChevronIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionBlock;