import * as React from 'react';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

const FinalScreen: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center py-8 px-4 gap-[30px] w-full min-h-screen bg-[#FAFAFC] font-sans">
            {/* Emoji Circle */}
            <div className="box-border w-[154px] h-[154px] bg-[#F4FCF3] border border-[#C2ECBE] rounded-full flex items-center justify-center">
                <span className="text-[54px] leading-[74px] text-center">✅</span>
            </div>

            <h1 className="text-xl font-medium text-gray-900 text-center">
                Puedes utilizar este Agente IA en el creador de conversaciones
            </h1>

            <button className="h-10 px-6 bg-[#6464FF] text-white text-sm font-medium rounded hover:bg-[#7474FF] active:bg-[#5050DD] transition-colors">
                Ir al centro IA
            </button>

            <div className="w-[311px] border-t border-[#D5D5DE]"></div>

            <div className="flex flex-col items-center gap-4 w-full max-w-[562px]">
                <p className="text-sm text-gray-600">
                    Aprende como sacar el mayor provecho a tu Agente IA
                </p>

                <div className="flex flex-col gap-2 self-stretch">
                   <InfoTile
                        icon={<span className="text-[29.72px] leading-[39px]">🛠️</span>}
                        iconBg="bg-violet-50"
                        title="Utiliza flujos condicionales"
                        description="Define caminos dependiendo de los datos obtenidos."
                    />
                    <InfoTile
                        icon={<span className="text-[29.72px] leading-[39px]">🚀</span>}
                        iconBg="bg-green-50"
                        title="Utiliza en conversaciones inbound o outbound"
                        description="Descubre en que casos funciona mejor tu Agente IA"
                    />
                    <InfoTile
                        icon={<span className="text-[29.72px] leading-[39px]">📣</span>}
                        iconBg="bg-amber-50"
                        title="Conecta con otros Agentes IA"
                        description="Crea flujos más potentes conectando varios Agentes IA"
                    />
                </div>
            </div>
        </div>
    );
};

interface InfoTileProps {
    icon: React.ReactNode;
    iconBg: string;
    title: string;
    description: string;
}

const InfoTile: React.FC<InfoTileProps> = ({ icon, iconBg, title, description }) => (
    <a href="#" className="box-border flex flex-row items-center p-4 gap-4 w-full h-[92px] bg-white border border-[#EBEBF0] rounded-lg transition-colors hover:bg-gray-50 group">
        <div className="flex-grow flex items-center gap-4">
            <div className={`flex items-center justify-center w-[60px] h-[60px] min-w-[60px] rounded-xl ${iconBg}`}>
                {icon}
            </div>
            <div className="flex flex-col gap-0.5">
                <h3 className="text-base font-medium text-[#121214]">{title}</h3>
                <p className="text-sm text-[#676770]">{description}</p>
            </div>
        </div>
        <div className="w-10 h-10 flex justify-center items-center rounded transition-colors group-hover:bg-gray-200/50">
             <ChevronRightIcon />
        </div>
    </a>
);

export default FinalScreen;