import React from 'react';
import { Code2, BookOpen, Layers } from 'lucide-react';

interface HeaderProps {
  activePage: 'componentes' | 'listas';
  onSelectPage: (page: 'componentes' | 'listas') => void;
  onOpenCode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onSelectPage,
  onOpenCode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#000000]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-2 select-none">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] shadow-[0_0_10px_#22c55e]" />
          <span className="text-sm font-bold font-mono tracking-tight text-white">
            react-native<span className="text-[#22c55e]">.lab</span>
          </span>
        </div>

        {/* 2-Page Segmented Switch */}
        <nav className="flex items-center p-1 bg-[#090c0a] border border-white/[0.08] rounded-full">
          <button
            type="button"
            onClick={() => onSelectPage('componentes')}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-150 cursor-pointer ${
              activePage === 'componentes'
                ? 'bg-[#22c55e] text-black font-semibold shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Componentes</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectPage('listas')}
            className={`flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-150 cursor-pointer ${
              activePage === 'listas'
                ? 'bg-[#22c55e] text-black font-semibold shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>FlatList vs Scroll</span>
          </button>
        </nav>

        {/* Code Button */}
        <button
          type="button"
          onClick={onOpenCode}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-neutral-300 hover:text-[#22c55e] border border-white/[0.1] hover:border-[#22c55e]/40 rounded-lg transition-colors cursor-pointer"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Código RN</span>
        </button>
      </div>
    </header>
  );
};
