import * as React from 'react';
import { AddFillIcon } from './icons/AddFillIcon';
import { SubtractLineIcon } from './icons/SubtractLineIcon';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';
import { AlertCloseIcon } from './icons/AlertCloseIcon';

interface ObjectiveContentProps {
  objective: string;
  setObjective: React.Dispatch<React.SetStateAction<string>>;
  showAlert: boolean;
  setShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTab: (tab: string) => void;
}

const ObjectiveContent: React.FC<ObjectiveContentProps> = ({ objective, setObjective, showAlert, setShowAlert, setActiveTab }) => {
  const [count, setCount] = React.useState(3);

  const handleDecrement = () => {
    setCount(prev => Math.max(1, prev - 1));
  };

  const handleIncrement = () => {
    setCount(prev => Math.min(10, prev + 1));
  };

  return (
    <div className="flex flex-col h-full w-full max-w-[576px] gap-4 overflow-y-auto pr-2">
      <div className="flex flex-col items-start gap-2 self-stretch">
        <h2 className="text-base font-medium text-gray-900">Objetivo que se debe lograr</h2>
        <p className="text-sm text-gray-600">Define cuál es el objetivo que debe lograr el Agente IA.</p>
      </div>

      {showAlert && (
        <div className="box-border flex flex-row items-start p-3 gap-3 w-full bg-[#FFF9EE] border border-[rgba(255,162,3,0.29)] rounded">
          <div className="flex-shrink-0">
            <AlertTriangleIcon />
          </div>
          <p className="flex-grow text-sm text-[#443521] leading-relaxed">
            Este Agente IA responde a las preguntas de acuerdo a la información que hay en la{' '}
            <button onClick={() => setActiveTab('Base de conocimiento')} className="font-semibold underline hover:text-black focus:outline-none">Base de conocimiento</button>{' '}
            y las{' '}
            <button onClick={() => setActiveTab('Instrucciones generales')} className="font-semibold underline hover:text-black focus:outline-none">Instrucciones generales</button>.
          </p>
          <button onClick={() => setShowAlert(false)} className="flex-shrink-0" aria-label="Cerrar alerta">
            <AlertCloseIcon />
          </button>
        </div>
      )}
      
      {/* First content box */}
      <div className="flex flex-col justify-center items-center p-4 pb-10 gap-6 self-stretch bg-[#F7F8FF] rounded-lg">
        <div className="flex flex-col items-center">
            <div className="box-border flex flex-col justify-center items-center p-3 gap-2 w-[268px] bg-white border border-[#CEE0FF] rounded-xl">
                <div className="relative box-border w-[52px] h-[52px] bg-white border border-[#EBEBF0] rounded-full flex items-center justify-center">
                    <span className="text-[30px]" aria-hidden="true">🤖</span>
                </div>
                <p className="w-[244px] text-center text-sm text-[#1A3162] leading-tight">
                    Mi tarea consiste en responder preguntas o dudas del usuario
                </p>
            </div>

            <div className="flex flex-col items-center gap-1 my-3">
                <div className="w-px h-6 bg-[#5087FF]"></div>
                <span className="text-sm text-[#1A3162]">Hasta lograr</span>
                <div className="w-px h-6 bg-[#5087FF]"></div>
            </div>

            <div className="w-full max-w-[452px]">
                <input
                    type="text"
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    className="box-border flex items-center px-3 py-2 w-full h-10 bg-white border border-[#9494A1] rounded text-base placeholder-gray-500 focus:border-[#6464FF] outline-none transition-all duration-300"
                    placeholder="Agendar una cita en la clínica número 2"
                />
            </div>
        </div>
      </div>
      
      {/* Second content box */}
      <div className="flex flex-col justify-center items-center p-4 pb-10 gap-6 self-stretch bg-[#F7F8FF] rounded-lg">
        <div className="flex flex-col items-center">
            <div className="box-border flex flex-col justify-center items-center p-3 gap-2 w-[268px] bg-white border border-[#CEE0FF] rounded-xl">
                 <div className="relative box-border w-[52px] h-[52px] bg-white border border-[#EBEBF0] rounded-full flex items-center justify-center">
                    <span className="text-[30px]" aria-hidden="true">🤖</span>
                </div>
                <p className="w-[244px] text-center text-sm text-[#1A3162] leading-tight">
                    Estas son la cantidad de mensajes que puedo enviar para lograr mi objetivo antes de rendirme
                </p>
            </div>
            
            <div className="w-px h-6 bg-[#5087FF] my-3"></div>

            <div className="box-border flex flex-row flex-wrap justify-center items-center py-2 px-3 gap-2.5 w-full max-w-[423px] min-h-12 bg-white border border-[#EBEBF0] rounded">
                <span className="text-sm text-[#38383D]">Cuentas con:</span>
                
                <div className="box-border flex flex-row items-center w-auto h-8 bg-white border border-[#D5D5DE] rounded">
                    <button 
                        onClick={handleDecrement}
                        disabled={count <= 1}
                        className="flex justify-center items-center w-8 h-8 rounded-l hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Disminuir"
                    >
                        <SubtractLineIcon />
                    </button>
                    <span className="w-7 text-center text-sm text-[#121214]">{count}</span>
                    <button 
                        onClick={handleIncrement}
                        disabled={count >= 10}
                        className="flex justify-center items-center w-8 h-8 rounded-r hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Aumentar"
                    >
                        <AddFillIcon />
                    </button>
                </div>
                
                <span className="text-sm text-[#38383D]">mensajes para lograr el objetivo.</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ObjectiveContent;