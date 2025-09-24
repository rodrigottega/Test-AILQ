// This is a static component for visual representation on the final screen.
import * as React from 'react';
import { ListIcon } from './icons/ListIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import { WarningIcon } from './icons/WarningIcon';

const ActionsPreviewCard: React.FC = () => (
    <div className="relative flex items-center justify-center">
        {/* Background glow */}
        <div className="absolute w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-20"></div>

        {/* Card */}
        <div className="z-10 w-[280px] bg-[#1A1A1A] rounded-lg border border-gray-700/50 p-3 flex flex-col gap-3 text-white font-sans">
            {/* Header */}
            <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-gray-200">Acciones</p>
                <div className="flex items-center gap-2 text-gray-400">
                    <ListIcon />
                    <div className="text-gray-600"><ArrowLeftIcon /></div>
                    <div className="text-gray-600"><ArrowRightIcon /></div>
                </div>
            </div>

            {/* Content */}
            <p className="text-xs text-gray-400 leading-snug">
                Como agente virtual de atención, una de tus tareas es solicitar la fecha de n...
            </p>

            <div className="bg-black/20 rounded p-2">
                <p className="text-xs text-gray-400">Formato de dato</p>
                <p className="text-sm text-gray-200">Fecha de nacimiento</p>
            </div>
            <div className="bg-black/20 rounded p-2">
                <p className="text-xs text-gray-400">Guardar respuesta</p>
                <p className="text-sm font-mono text-gray-200">{`{{hubspot_birthday}}`}</p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-2 mt-2">
                <OptionItem label="Todas las acciones se completaron" />
                <OptionItem label="No se completó ninguna de las acciones" />
                <OptionItem label="Quedaron acciones sin completar" />
                <OptionItem label="Conversación crítica" isCritical={true} />
            </div>
        </div>
    </div>
);

interface OptionItemProps {
    label: string;
    isCritical?: boolean;
}

const OptionItem: React.FC<OptionItemProps> = ({ label, isCritical = false }) => (
    <div className={`flex justify-between items-center p-2 rounded ${isCritical ? 'border border-[#FF4D4D]' : ''}`}>
        <div className="flex items-center gap-2">
            {isCritical && <WarningIcon />}
            <p className={`text-xs ${isCritical ? 'text-red-300' : 'text-gray-300'}`}>{label}</p>
        </div>
        <div className="w-3 h-3 rounded-full border border-blue-400/50 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
        </div>
    </div>
);

export default ActionsPreviewCard;