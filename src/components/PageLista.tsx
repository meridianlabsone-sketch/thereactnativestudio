import React, { useState, useCallback, useMemo } from 'react';
import { FlatList, TextInput, Pressable } from './native';
import { Search, Plus, Trash2, CheckCircle2, Circle, Zap, Layers, Cpu } from 'lucide-react';

interface ListItem {
  id: string;
  title: string;
  tag: string;
  done: boolean;
}

const initialItems: ListItem[] = [
  { id: '1', title: 'Entender a diferença entre ScrollView e FlatList', tag: 'Teoria', done: true },
  { id: '2', title: 'Implementar TextInput com onChangeText', tag: 'Inputs', done: true },
  { id: '3', title: 'Utilizar keyExtractor para identificar cada célula', tag: 'Chaves', done: true },
  { id: '4', title: 'Adicionar getItemLayout para alturas estáticas', tag: 'Perf', done: false },
  { id: '5', title: 'Ativar Hermes Engine para compilação bytecode', tag: 'Compilação', done: false },
];

export const PageLista: React.FC = () => {
  const [items, setItems] = useState<ListItem[]>(initialItems);
  const [search, setSearch] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(
      (it) => it.title.toLowerCase().includes(q) || it.tag.toLowerCase().includes(q)
    );
  }, [items, search]);

  const handleToggle = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it))
    );
  }, []);

  const handleDelete = useCallback((id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }, []);

  const handleAdd = useCallback(() => {
    if (!newTitle.trim()) return;
    const newItem: ListItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      tag: 'Item RN',
      done: false,
    };
    setItems((prev) => [newItem, ...prev]);
    setNewTitle('');
  }, [newTitle]);

  return (
    <div className="max-w-3xl mx-auto py-10 sm:py-16 px-4 space-y-12">
      {/* Title */}
      <div className="border-b border-white/[0.08] pb-8">
        <div className="text-[11px] font-mono font-semibold text-[#22c55e] uppercase tracking-wider mb-2">
          Arquitetura de Listas & Alta Performance
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <span>FlatList vs ScrollView</span>
          <span className="text-[#22c55e]">.</span>
        </h1>
        <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
          Entenda por que a escolha correta entre ScrollView e FlatList define se o seu app rodará a 60 FPS fluidos ou travará no celular do usuário.
        </p>
      </div>

      {/* Didactic Comparison Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ScrollView Explanation */}
        <div className="bg-[#050705] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-white mb-2">
              <Layers className="w-4 h-4 text-neutral-400" />
              <strong className="text-sm">&lt;ScrollView /&gt;</strong>
            </div>
            <p className="text-xs text-[#22c55e] font-mono mb-3">Renderização Imediata (Todos os nós)</p>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
              Renderiza <strong className="text-white">todos os elementos de uma só vez</strong> na memória do dispositivo. Se você tiver 1.000 itens, todos os 1.000 serão alocados imediatamente na RAM.
            </p>
          </div>

          <div className="p-3 bg-[#090d0a] border border-white/10 rounded-xl text-xs space-y-1">
            <p className="font-semibold text-white">Quando usar?</p>
            <p className="text-neutral-400">
              Formulários curtos, termos de contrato e telas estáticas que cabem em poucos scrolls.
            </p>
          </div>
        </div>

        {/* FlatList Explanation */}
        <div className="bg-[#050705] border border-[#22c55e]/30 rounded-2xl p-6 flex flex-col justify-between shadow-[0_0_20px_rgba(34,197,94,0.06)]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#22c55e] mb-2">
              <Zap className="w-4 h-4" />
              <strong className="text-sm">&lt;FlatList /&gt;</strong>
            </div>
            <p className="text-xs text-[#22c55e] font-mono mb-3">Virtualização Inteligente (Apenas o visível)</p>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
              Renderiza <strong className="text-white">apenas os itens visíveis na tela</strong>. À medida que o usuário rola, os itens fora de visão são reciclados da memória, mantendo 60 FPS fixos.
            </p>
          </div>

          <div className="p-3 bg-[#0c130e] border border-[#22c55e]/30 rounded-xl text-xs space-y-1">
            <p className="font-semibold text-[#22c55e]">Quando usar?</p>
            <p className="text-neutral-300">
              Feeds de redes sociais, listas de produtos, tarefas, históricos com dezenas ou milhares de dados.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive FlatList Live Simulator */}
      <section className="bg-[#050705] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Demonstração Interativa da FlatList</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Filtre em tempo real ou adicione novos itens pelo input abaixo.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-[#090d0a] border border-white/10 px-3 py-1.5 rounded-lg shrink-0">
            <span>Visíveis: <strong className="text-[#22c55e]">{filteredItems.length}</strong></span>
            <span aria-hidden="true">·</span>
            <span className="text-[#22c55e]">60 FPS</span>
          </div>
        </div>

        {/* Search Input */}
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar por termo ou tag (ex: Teoria, Inputs, Chaves)..."
          leftIcon={<Search className="w-4 h-4" />}
          clearButtonMode="while-editing"
        />

        {/* Quick Add Row with TextInput */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <TextInput
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="Digite um novo item para a FlatList..."
              onSubmitEditing={handleAdd}
            />
          </div>
          <Pressable
            onPress={handleAdd}
            disabled={!newTitle.trim()}
            className="h-10 px-4 bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Inserir</span>
          </Pressable>
        </div>

        {/* The FlatList Container */}
        <div className="bg-[#090d0a] border border-white/[0.08] rounded-xl overflow-hidden">
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <div className="flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-center gap-3 min-w-0 flex-1 mr-3">
                  <button
                    type="button"
                    onClick={() => handleToggle(item.id)}
                    aria-label={item.done ? 'Marcar como pendente' : 'Marcar como concluído'}
                    className="text-neutral-500 hover:text-[#22c55e] transition-colors shrink-0 cursor-pointer"
                  >
                    {item.done ? (
                      <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                    ) : (
                      <Circle className="w-4 h-4 text-neutral-600" />
                    )}
                  </button>

                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`text-xs sm:text-sm font-medium truncate ${
                        item.done ? 'text-neutral-500 line-through' : 'text-neutral-200'
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="text-[10px] font-mono text-[#22c55e] bg-[#0c1810] px-1.5 py-0.5 rounded border border-[#1b2b20] shrink-0">
                      {item.tag}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  aria-label={`Remover ${item.title}`}
                  className="opacity-0 group-hover:opacity-100 text-neutral-600 hover:text-red-400 transition-opacity p-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
            ItemSeparatorComponent={() => <div className="h-px bg-white/[0.04]" />}
            ListEmptyComponent={
              <div className="py-10 text-center text-xs text-neutral-500 font-mono">
                Nenhum item encontrado no filtro.
              </div>
            }
          />
        </div>

        {/* Code Formula Reference */}
        <div className="p-4 bg-[#080c09] border border-white/10 rounded-xl space-y-2">
          <p className="text-xs font-semibold text-white">Estrutura mínima de uma FlatList:</p>
          <pre className="text-[11px] font-mono text-neutral-300 overflow-x-auto leading-relaxed">
            <span className="text-[#22c55e]">&lt;FlatList</span>
            <br />
            {'  '}data=&#123;meusDados&#125;
            <br />
            {'  '}<span className="text-white">renderItem</span>=&#123;(&#123; item &#125;) =&gt; &lt;Text&gt;&#123;item.title&#125;&lt;/Text&gt;&#125;
            <br />
            {'  '}<span className="text-white">keyExtractor</span>=&#123;(item) =&gt; item.id&#125;
            <br />
            <span className="text-[#22c55e]">/&gt;</span>
          </pre>
        </div>
      </section>
    </div>
  );
};
