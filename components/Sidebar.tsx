import * as React from 'react';
import { FileTextIcon } from './icons/FileTextIcon';
import { SlidersIcon } from './icons/SlidersIcon';
import { DatabaseIcon } from './icons/DatabaseIcon';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {

  const tabs = [
    { name: 'Datos para recolectar', icon: <FileTextIcon /> },
    { name: 'Instrucciones generales', icon: <SlidersIcon /> },
    { name: 'Base de conocimiento', icon: <DatabaseIcon /> },
  ];

  return (
    <aside className="w-[360px] flex-shrink-0">
      <div className="flex flex-col items-start gap-2 self-stretch">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`box-border flex flex-row items-center p-4 gap-4 w-full h-14 rounded cursor-pointer transition-colors ${
              activeTab === tab.name
                ? 'bg-white border border-zinc-900'
                : 'bg-transparent border border-transparent hover:bg-gray-100'
            }`}
          >
            {tab.icon}
            <span className="text-sm font-medium text-gray-900">{tab.name}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;