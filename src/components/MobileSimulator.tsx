import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Switch, FlatList } from './native';
import {
  Smartphone,
  Wifi,
  Battery,
  Sliders,
  CheckCircle2,
  ListTodo,
  Layers,
  Sparkles,
} from 'lucide-react';

export const MobileSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inputs' | 'list'>('inputs');
  const [inputText, setInputText] = useState('Build rápido');
  const [switchState, setSwitchState] = useState(true);
  const [phoneItems, setPhoneItems] = useState([
    { id: '1', title: 'Hermes Bytecode Habilitado', done: true },
    { id: '2', title: 'React.memo nas células da lista', done: true },
    { id: '3', title: 'Zero vazamento de render', done: false },
  ]);

  const handleToggleDone = (id: string) => {
    setPhoneItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it))
    );
  };

  return (
    <section className="py-12 border-b border-[#141e17] flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <div className="text-xs font-semibold text-[#22c55e] uppercase tracking-wider mb-1">
          Simulação de Viewport Nativo
        </div>
        <h3 className="text-2xl font-bold text-white tracking-tight">
          React Native no Formato Mobile
        </h3>
        <p className="text-xs text-neutral-400 mt-1">
          Interaja com as primitivas diretamente dentro do frame de dispositivo móvel.
        </p>
      </div>

      {/* iPhone Device Frame */}
      <div className="relative w-full max-w-[380px] h-[720px] bg-[#070908] rounded-[48px] border-[6px] border-[#1d2a20] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(34,197,94,0.1)] flex flex-col overflow-hidden">
        {/* Dynamic Island / Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-end px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-neutral-800" />
        </div>

        {/* Status Bar */}
        <div className="h-10 pt-3 px-6 flex items-center justify-between text-[11px] font-mono text-neutral-400 z-20 shrink-0 select-none">
          <span className="font-semibold text-white">09:41</span>
          <div className="flex items-center gap-2">
            <Wifi className="w-3 h-3 text-neutral-300" />
            <Battery className="w-3.5 h-3.5 text-[#22c55e]" />
          </div>
        </div>

        {/* Mobile Header Bar */}
        <div className="px-5 py-3 border-b border-[#141f17] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
            <span className="text-xs font-bold text-white tracking-tight">VORTEX MOBILE</span>
          </div>
          <span className="text-[10px] font-mono text-[#22c55e] bg-[#0d1610] px-1.5 py-0.5 rounded border border-[#1b2b20]">
            60 FPS
          </span>
        </div>

        {/* Scrollable View Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'inputs' ? (
            <div className="space-y-4">
              <div className="bg-[#0b100c] border border-[#17251c] rounded-xl p-3.5 space-y-3">
                <Text variant="caption" className="text-[#22c55e] font-semibold">
                  ENTRADA DE ALTA PERFORMANCE
                </Text>
                <TextInput
                  label="Título do Componente"
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="Nome do módulo..."
                  clearButtonMode="while-editing"
                />
                <TextInput
                  label="Chave Privada"
                  placeholder="••••••••••••"
                  secureTextEntry={true}
                />
              </div>

              <div className="bg-[#0b100c] border border-[#17251c] rounded-xl p-3.5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-white">Modo Turbo Engine</p>
                  <p className="text-[10px] text-neutral-400">Zero overhead no Hermes</p>
                </div>
                <Switch value={switchState} onValueChange={setSwitchState} />
              </div>

              <Pressable
                onPress={() => alert('Componente acionado com sucesso no frame mobile!')}
                className="w-full py-3 bg-[#22c55e] text-black font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-[#22c55e]/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Testar Toque Tátil</span>
              </Pressable>
            </div>
          ) : (
            <div className="space-y-3">
              <Text variant="caption" className="text-neutral-400 px-1 font-mono">
                FLATLIST MOBILE (NATIVO)
              </Text>
              <div className="space-y-2">
                {phoneItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleToggleDone(item.id)}
                    className="w-full text-left p-3 rounded-xl bg-[#0b100c] border border-[#17251c] flex items-center justify-between"
                  >
                    <span
                      className={`text-xs ${
                        item.done ? 'text-neutral-500 line-through' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </span>
                    <CheckCircle2
                      className={`w-4 h-4 ${
                        item.done ? 'text-[#22c55e]' : 'text-neutral-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Bottom Tab Bar */}
        <div className="h-16 bg-[#070b08] border-t border-[#141f17] grid grid-cols-2 px-6 items-center shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('inputs')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'inputs' ? 'text-[#22c55e]' : 'text-neutral-500'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span className="text-[10px] font-medium">Inputs</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('list')}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === 'list' ? 'text-[#22c55e]' : 'text-neutral-500'
            }`}
          >
            <ListTodo className="w-4 h-4" />
            <span className="text-[10px] font-medium">FlatList</span>
          </button>
        </div>

        {/* Home Indicator Bar */}
        <div className="h-4 flex items-center justify-center pb-1">
          <div className="w-28 h-1 bg-neutral-600 rounded-full" />
        </div>
      </div>
    </section>
  );
};
