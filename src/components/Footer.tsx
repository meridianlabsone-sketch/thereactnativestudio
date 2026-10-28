import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-[#050705] border-t border-[#121c15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-sm bg-[#22c55e]" />
          <span className="text-sm font-bold text-white tracking-tight">VORTEX NATIVE</span>
          <span className="text-xs text-neutral-500 ml-2">
            · Padrões React Native & Alta Performance
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-neutral-400 font-medium">
          <a href="#inputs-studio" className="hover:text-white transition-colors">
            Inputs
          </a>
          <a href="#flatlist-demo" className="hover:text-white transition-colors">
            FlatList
          </a>
          <a href="#native-primitives" className="hover:text-white transition-colors">
            Componentes
          </a>
          <a href="#best-practices" className="hover:text-white transition-colors">
            Boas Práticas
          </a>
        </div>

        <div className="text-xs text-neutral-500 font-mono">
          Estético em Preto, Verde e Branco
        </div>
      </div>
    </footer>
  );
};
