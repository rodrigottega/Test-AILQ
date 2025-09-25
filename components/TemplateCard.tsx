import * as React from 'react';
import { PlusIcon } from './icons/PlusIcon';

export interface Template {
    icon: string;
    title: string;
    fields: string[];
    description: string;
}

interface TemplateCardProps {
    template: Template;
    onTemplateClick: (fields: string[]) => void;
    isTyping: boolean;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onTemplateClick, isTyping }) => {
    const [hovered, setHovered] = React.useState<boolean>(false);

    return (
        <div className="box-border flex flex-col items-start p-3 gap-4 border border-[#EBEBF0] rounded bg-white h-full">
            {/* Top section: Icon and Button */}
            <div className="flex flex-row justify-between items-start self-stretch">
                <div className="w-8 h-8 rounded-full border border-[#EBEBF0] flex items-center justify-center bg-white">
                  <span aria-hidden="true">{template.icon}</span>
                </div>
                <div 
                  className="relative"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  <button
                    onClick={() => onTemplateClick(template.fields)}
                    disabled={isTyping}
                    className="box-border flex justify-center items-center w-6 h-6 min-w-[24px] max-w-[24px] h-6 min-h-[24px] max-h-[24px] bg-white border border-[#EBEBF0] rounded text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      boxShadow: '0px 5px 2px rgba(182, 182, 194, 0.01), 0px 3px 2px rgba(182, 182, 194, 0.05), 0px 1px 1px rgba(182, 182, 194, 0.09), 0px 0px 1px rgba(182, 182, 194, 0.1)',
                    }}
                    aria-label={`Usar plantilla ${template.title}`}
                  >
                    <PlusIcon />
                  </button>
                  {hovered && (
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
            <p className="text-xs text-gray-500 self-stretch mt-auto pt-2">
                {template.description}
            </p>
        </div>
    );
};

export default TemplateCard;
