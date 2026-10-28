import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Switch, ActivityIndicator, Modal } from './native';
import { Layers, Smartphone, ToggleLeft, Loader2, Sparkles, Sliders } from 'lucide-react';

export const NativePrimitivesShowcase: React.FC = () => {
  const [demoSwitch, setDemoSwitch] = useState(true);
  const [demoLoading, setDemoLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [counter, setCounter] = useState(0);

  return (
    <section id="native-primitives" className="py-16 md:py-24 border-b border-[#141e17] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-semibold text-[#22c55e] uppercase tracking-wider mb-2">
            Catálogo de Componentes
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Primitivas do Ecossistema React Native
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
            Visão detalhada dos blocos de construção essenciais que alimentam aplicações móveis de alto desempenho.
          </p>
        </div>

        {/* Bento Grid of Native Components */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: View */}
          <div className="bg-[#090d0a] border border-[#162219] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-[#22c55e] bg-[#101c13] px-2 py-0.5 rounded border border-[#1a2c1f]">
                  &lt;View /&gt;
                </span>
                <Layers className="w-4 h-4 text-neutral-500" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Contêiner Estrutural Flexbox</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                O componente fundamental para construir interfaces. Por padrão no React Native, possui <code className="text-neutral-300">flexDirection: &#39;column&#39;</code>.
              </p>
            </div>

            {/* Live Interactive View Demo */}
            <div className="bg-[#050705] p-3 rounded-xl border border-[#142017] flex items-center justify-between gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#22c55e]/20 border border-[#22c55e] flex items-center justify-center text-xs text-[#22c55e] font-mono font-bold">
                1
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-xs text-white font-mono font-bold">
                2
              </div>
              <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xs text-neutral-400 font-mono font-bold">
                3
              </div>
            </div>
          </div>

          {/* Card 2: Text */}
          <div className="bg-[#090d0a] border border-[#162219] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-[#22c55e] bg-[#101c13] px-2 py-0.5 rounded border border-[#1a2c1f]">
                  &lt;Text /&gt;
                </span>
                <span className="text-xs text-neutral-500 font-mono">numberOfLines</span>
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Tipografia & Truncamento</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                No React Native, todo texto DEVE ser encapsulado por um nó <code className="text-neutral-300">&lt;Text&gt;</code> para compilação nativa.
              </p>
            </div>

            {/* Live Interactive Text Demo */}
            <div className="bg-[#050705] p-3 rounded-xl border border-[#142017]">
              <Text numberOfLines={1} className="text-xs text-neutral-300">
                Texto longo truncado automaticamente com reticências pelo motor nativo...
              </Text>
            </div>
          </div>

          {/* Card 3: TextInput */}
          <div className="bg-[#090d0a] border border-[#162219] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-[#22c55e] bg-[#101c13] px-2 py-0.5 rounded border border-[#1a2c1f]">
                  &lt;TextInput /&gt;
                </span>
                <Sliders className="w-4 h-4 text-neutral-500" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Entrada de Texto Controlada</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Suporta teclados numéricos, modo de senha segura (<code className="text-neutral-300">secureTextEntry</code>), e limpeza rápida.
              </p>
            </div>

            <TextInput
              placeholder="Digite para testar..."
              clearButtonMode="while-editing"
            />
          </div>

          {/* Card 4: Pressable */}
          <div className="bg-[#090d0a] border border-[#162219] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-[#22c55e] bg-[#101c13] px-2 py-0.5 rounded border border-[#1a2c1f]">
                  &lt;Pressable /&gt;
                </span>
                <Sparkles className="w-4 h-4 text-neutral-500" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Interação Tátil com Escala</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Substitui o antigo <code className="text-neutral-300">TouchableOpacity</code> com estados dinâmicos <code className="text-neutral-300">{"{({ pressed }) => ...}"}</code>.
              </p>
            </div>

            <div className="flex items-center justify-between gap-3">
              <Pressable
                onPress={() => setCounter((c) => c + 1)}
                className="flex-1 py-2.5 px-4 bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold text-xs rounded-xl flex items-center justify-center gap-2"
              >
                <span>Tocar: {counter}</span>
              </Pressable>
              <Pressable
                onPress={() => setCounter(0)}
                className="py-2.5 px-3 bg-[#111913] border border-[#1b2b20] text-neutral-400 hover:text-white text-xs rounded-xl"
              >
                Zerar
              </Pressable>
            </div>
          </div>

          {/* Card 5: Switch & ActivityIndicator */}
          <div className="bg-[#090d0a] border border-[#162219] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-[#22c55e] bg-[#101c13] px-2 py-0.5 rounded border border-[#1a2c1f]">
                  &lt;Switch /&gt; & &lt;ActivityIndicator /&gt;
                </span>
                <ToggleLeft className="w-4 h-4 text-neutral-500" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Controles Nativos de Estado</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Alternadores booleanos fluidos e spinners assíncronos configuráveis em preto, verde e branco.
              </p>
            </div>

            <div className="bg-[#050705] p-3 rounded-xl border border-[#142017] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Switch
                  value={demoSwitch}
                  onValueChange={setDemoSwitch}
                  accessibilityLabel="Demonstração Switch"
                />
                <span className="text-xs text-neutral-300">
                  {demoSwitch ? 'Ativado' : 'Desativado'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <ActivityIndicator
                  animating={demoLoading}
                  size="small"
                  color="#22c55e"
                />
                <button
                  type="button"
                  onClick={() => setDemoLoading(!demoLoading)}
                  className="text-[11px] font-mono text-neutral-400 hover:text-white"
                >
                  {demoLoading ? 'Pausar' : 'Girar'}
                </button>
              </div>
            </div>
          </div>

          {/* Card 6: Modal */}
          <div className="bg-[#090d0a] border border-[#162219] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-[#22c55e] bg-[#101c13] px-2 py-0.5 rounded border border-[#1a2c1f]">
                  &lt;Modal /&gt;
                </span>
                <Smartphone className="w-4 h-4 text-neutral-500" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">Janela Modal com Safe Dismiss</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Sobreposição modal com suporte a fechamento por clique externo, tecla ESC e bloqueio de scroll.
              </p>
            </div>

            <Pressable
              onPress={() => setModalVisible(true)}
              className="w-full py-2.5 px-4 bg-[#111913] hover:bg-[#162219] border border-[#1b2b20] text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#22c55e]" />
              <span>Abrir &lt;Modal /&gt; de Exemplo</span>
            </Pressable>
          </div>
        </div>

        {/* Demo Modal Instance */}
        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          title="Modal Nativo React Native"
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm text-neutral-300 leading-relaxed">
              Este modal é renderizado utilizando o padrão declarativo <code className="text-[#22c55e] font-mono">&lt;Modal visible=&#123;true&#125; /&gt;</code> do React Native, com controle de foco e backdrop com desfoque estético.
            </p>

            <div className="bg-[#050705] p-3.5 rounded-xl border border-[#152218] text-xs font-mono text-neutral-400">
              <span className="text-[#22c55e]">&lt;Modal</span>
              <br />
              {'  '}visible=&#123;visible&#125;
              <br />
              {'  '}animationType=&quot;slide&quot;
              <br />
              {'  '}onRequestClose=&#123;closeModal&#125;
              <br />
              <span className="text-[#22c55e]">&gt;</span>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Pressable
                onPress={() => setModalVisible(false)}
                className="px-4 py-2 bg-[#22c55e] text-black font-semibold text-xs rounded-lg hover:bg-[#16a34a] transition-colors"
              >
                Entendi, Fechar
              </Pressable>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};
