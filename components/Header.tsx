// Fix: Updated React import for consistency and to prevent potential type errors.
import * as React from 'react';
import { CloseIcon } from './icons/CloseIcon';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side button based on guidance */}
        <button className="flex h-10 min-h-[40px] max-h-[40px] items-center justify-center gap-1 rounded bg-transparent px-3 text-gray-800 transition-colors hover:bg-gray-100">
          <CloseIcon />
          <span className="text-sm font-sans whitespace-nowrap">Salir del creador</span>
        </button>

        {/* Right side button based on guidance */}
        <button className="flex h-8 min-h-[32px] max-h-[32px] items-center justify-center gap-0.5 rounded bg-transparent px-2 text-gray-800 transition-colors hover:bg-gray-100">
          <span className="text-sm font-sans whitespace-nowrap">Ir a configuración manual</span>
        </button>
      </div>
    </header>
  );
};

export default Header;