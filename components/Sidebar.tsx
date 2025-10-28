import * as React from 'react';
import { ObjectiveIcon } from './icons/ObjectiveIcon';
import { SlidersIcon } from './icons/SlidersIcon';
import { DatabaseIcon } from './icons/DatabaseIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {

  const tabs = [
    { name: 'Objetivo que se debe lograr', icon: <ObjectiveIcon /> },
    { name: 'Instrucciones generales', icon: <SlidersIcon /> },
    { name: 'Base de conocimiento', icon: <DatabaseIcon /> },
  ];

  return (
    <aside className="w-[360px] flex-shrink-0">
      <div className="flex flex-col items-start gap-2 self-stretch">
        {tabs.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
                <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`box-border flex flex-row justify-between items-center p-4 gap-4 w-full h-14 rounded cursor-pointer transition-colors ${
                    isActive
                        ? 'bg-white border border-zinc-900'
                        : 'bg-transparent border border-transparent hover:bg-gray-100'
                    }`}
                >
                    <div className="flex flex-row items-center gap-4">
                        {tab.icon}
                        <span className="text-sm font-medium text-gray-900">{tab.name}</span>
                    </div>
                    {isActive && <ChevronRightIcon />}
                </button>
            );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;