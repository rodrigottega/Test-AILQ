import * as React from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { EditIcon } from './icons/EditIcon';
import { BookIcon } from './icons/BookIcon';
import { ButtonSpinnerIcon } from './icons/ButtonSpinnerIcon';

interface AgentCreatorHeaderProps {
  onSaveAndContinue: () => void;
  objective: string;
}

const AgentCreatorHeader: React.FC<AgentCreatorHeaderProps> = ({ onSaveAndContinue, objective }) => {
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSaveClick = () => {
    if (isSaving) return;
    setIsSaving(true);
    setTimeout(() => {
        onSaveAndContinue();
    }, 2000);
  };
  
  const getAgentTitle = (objectiveText: string) => {
      if (!objectiveText) return { name: 'Nuevo Agente', goal: 'Define un objetivo' };
      const lowerObjective = objectiveText.toLowerCase();

      if (lowerObjective.includes('cita')) {
          return { name: 'Agente para citas', goal: 'Logra un objetivo concreto' };
      }
      if (lowerObjective.includes('inscripción') || lowerObjective.includes('programa')) {
          return { name: 'Agente de inscripción', goal: 'Inscripción a programa' };
      }
      if (lowerObjective.includes('compra')) {
          return { name: 'Agente de ventas', goal: 'Compra en línea' };
      }
      return { name: 'Agente para primer contacto', goal: 'Califica clientes potenciales' };
  };
  
  const { name, goal } = getAgentTitle(objective);


  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left side */}
        <button className="flex h-10 items-center justify-center gap-2 rounded px-3 text-gray-800 transition-colors hover:bg-gray-100">
          <CloseIcon />
          <span className="text-sm font-medium">Salir del creador</span>
        </button>

        {/* Center */}
        <div className="flex items-center gap-2">
            <button className="p-1 rounded hover:bg-gray-100" aria-label="Editar nombre del agente">
                <EditIcon />
            </button>
            <h1 className="text-sm text-gray-900">
                {name} / <span className="text-gray-500">{goal}</span>
            </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
            <button className="flex h-9 items-center justify-center gap-1.5 rounded px-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 border border-transparent">
                <BookIcon />
                <span>Documentación</span>
            </button>
            <button
                onClick={handleSaveClick}
                disabled={isSaving}
                className="flex h-9 w-[160px] items-center justify-center rounded bg-[#6464FF] px-4 text-sm font-medium text-white transition-colors hover:bg-[#7474FF] active:bg-[#5050DD] disabled:bg-[#A6A6FF] disabled:cursor-not-allowed whitespace-nowrap"
            >
                {isSaving ? <ButtonSpinnerIcon /> : 'Guardar y continuar'}
            </button>
        </div>
      </div>
    </header>
  );
};

export default AgentCreatorHeader;