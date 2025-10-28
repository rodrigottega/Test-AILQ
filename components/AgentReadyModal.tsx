import * as React from 'react';
import { InfoIcon } from './icons/InfoIcon';
import { CloseIcon } from './icons/CloseIcon';

interface AgentReadyModalProps {
  onClose: () => void;
}

const AgentReadyModal: React.FC<AgentReadyModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
      <div 
        className="relative bg-white rounded-lg border border-[#EBEBF0] w-[400px] flex flex-col"
        style={{
            boxShadow: '0px 14px 5px rgba(182, 182, 194, 0.01), 0px 8px 5px rgba(182, 182, 194, 0.05), 0px 3px 3px rgba(182, 182, 194, 0.09), 0px 1px 2px rgba(182, 182, 194, 0.1)'
        }}
    >
        {/* Header with close button */}
        <div className="absolute top-2 right-2">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors">
                <CloseIcon />
            </button>
        </div>

        {/* Modal Content */}
        <div className="flex flex-col items-center text-center px-6 pt-16 pb-6 gap-6">
          <p className="text-[64px] leading-[64px] text-[#676770] text-center self-stretch">🎉</p>
          
          <h2 className="text-lg font-semibold text-gray-900 leading-tight">¡Tu Agente IA para lograr un objetivo está listo!</h2>

          {/* Divider */}
          <div className="w-full max-w-[241px] border-t border-dashed border-[#D5D5DE]"></div>

          {/* Alert Box */}
          <div className="box-border flex flex-row items-start p-3 gap-3 w-full bg-white border border-[#D5D5DE] rounded">
            <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-left text-gray-600">
              Algunas configuraciones están predefinidas, te recomendamos probar tu Agente IA antes de utilizarlo con tus contactos.
            </p>
          </div>
        </div>

        {/* Footer with Button */}
        <div className="px-6 pb-6 pt-4 bg-white rounded-b-lg">
             <button
                onClick={onClose}
                className="w-full bg-[#6464FF] text-white font-medium py-2 px-4 rounded h-10 hover:bg-[#7474FF] active:bg-[#5050DD] transition-colors"
            >
                Entendido
            </button>
        </div>
      </div>
    </div>
  );
};

export default AgentReadyModal;