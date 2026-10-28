import React from 'react';
import { View, Text, Pressable } from './native';
import { ArrowRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onScrollToStudio: () => void;
  onOpenCode: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToStudio, onOpenCode }) => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#141e17] overflow-hidden">
      {/* Subtle ambient green radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#22c55e]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <View className="max-w-3xl">
          {/* Clean Unboxed Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mb-5 select-none font-medium">
            <span className="text-[#22c55e]">React Native Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Alta Performance</span>
            <span aria-hidden="true">·</span>
            <span>Zero Re-renders</span>
            <span aria-hidden="true">·</span>
            <span>Preto, Verde & Branco</span>
          </div>

          {/* Primary Headline with text-wrap: balance */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 [text-wrap:balance]">
            Interface Estética & Primitivas Nativas de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22c55e] via-[#4ade80] to-white">
              Alta Performance
            </span>
          </h1>

          {/* Body Prose */}
          <Text
            variant="body"
            className="text-neutral-400 text-base sm:text-lg mb-8 max-w-2xl leading-relaxed"
          >
            Implementação dos principais elementos do React Native —{' '}
            <code className="text-[#22c55e] font-mono text-sm bg-[#121c15] px-1.5 py-0.5 rounded border border-[#1b2b20]">
              &lt;TextInput /&gt;
            </code>
            ,{' '}
            <code className="text-white font-mono text-sm bg-[#121c15] px-1.5 py-0.5 rounded border border-[#1b2b20]">
              &lt;FlatList /&gt;
            </code>
            ,{' '}
            <code className="text-white font-mono text-sm bg-[#121c15] px-1.5 py-0.5 rounded border border-[#1b2b20]">
              &lt;Pressable /&gt;
            </code>{' '}
            e{' '}
            <code className="text-[#22c55e] font-mono text-sm bg-[#121c15] px-1.5 py-0.5 rounded border border-[#1b2b20]">
              &lt;Switch /&gt;
            </code>{' '}
            — seguindo as melhores práticas de memoização, zero latência e design visual de alta precisão.
          </Text>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-4">
            <Pressable
              onPress={onScrollToStudio}
              className="px-6 py-3 bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.25)] flex items-center gap-2 shrink-0"
            >
              <span>Explorar Inputs Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Pressable>

            <Pressable
              onPress={onOpenCode}
              className="px-5 py-3 bg-[#0d1410] hover:bg-[#131d16] text-white border border-[#1c2c20] hover:border-[#2b4431] font-medium text-sm rounded-xl transition-all flex items-center gap-2 shrink-0"
            >
              <span>Ver Especificação RN</span>
            </Pressable>
          </div>
        </View>

        {/* 3 Metrics & Principles Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14 pt-8 border-t border-[#141f17]">
          <div className="p-4 rounded-xl bg-[#090e0b] border border-[#17241a]">
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
              <Zap className="w-4 h-4 text-[#22c55e]" />
              <span className="font-medium text-white">60 FPS Consistente</span>
            </div>
            <p className="text-2xl font-bold font-mono text-white tabular-nums">16.6ms</p>
            <p className="text-xs text-neutral-500 mt-1">
              Frame budget respeitado com renderizações memoizadas.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#090e0b] border border-[#17241a]">
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
              <Sparkles className="w-4 h-4 text-[#22c55e]" />
              <span className="font-medium text-white">Controlled Inputs</span>
            </div>
            <p className="text-2xl font-bold font-mono text-white tabular-nums">0ms Lag</p>
            <p className="text-xs text-neutral-500 mt-1">
              Callbacks estáveis com useCallback sem render cascading.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#090e0b] border border-[#17241a]">
            <div className="flex items-center gap-2 text-xs text-neutral-400 mb-1">
              <ShieldCheck className="w-4 h-4 text-[#22c55e]" />
              <span className="font-medium text-white">FlatList Memory Efficient</span>
            </div>
            <p className="text-2xl font-bold font-mono text-white tabular-nums">O(1) Hash</p>
            <p className="text-xs text-neutral-500 mt-1">
              Chaves únicas via keyExtractor e chunking determinístico.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
