import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TextInput, Pressable, FlatList } from './native';
import { Search, Plus, Trash2, CheckCircle, Circle, Layers } from 'lucide-react';
import { NativeTaskItem } from '../types/native';

const initialItems: NativeTaskItem[] = [
  {
    id: 'rn-1',
    title: 'Configurar Hermes Engine & ProGuard',
    category: 'Compilação',
    renderCost: '0.12ms',
    active: true,
    timestamp: 'Hoje',
  },
  {
    id: 'rn-2',
    title: 'Memoizar renderItem com React.memo no FlatList',
    category: 'Performance',
    renderCost: '0.08ms',
    active: true,
    timestamp: 'Hoje',
  },
  {
    id: 'rn-3',
    title: 'Definir getItemLayout para altura estática de células',
    category: 'Virtualização',
    renderCost: '0.04ms',
    active: true,
    timestamp: 'Ontem',
  },
  {
    id: 'rn-4',
    title: 'Remover console.log em builds de produção',
    category: 'Runtime',
    renderCost: '0.02ms',
    active: false,
    timestamp: 'Ontem',
  },
  {
    id: 'rn-5',
    title: 'Implementar useNativeDriver para transições de opacidade',
    category: 'Animações',
    renderCost: '0.15ms',
    active: true,
    timestamp: '2 dias',
  },
  {
    id: 'rn-6',
    title: 'Otimizar resolução de imagens com resizeMode aspectFit',
    category: 'Assets',
    renderCost: '0.18ms',
    active: false,
    timestamp: '3 dias',
  },
];

// Pure memoized item to showcase zero re-render waste
interface ListItemProps {
  item: NativeTaskItem;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const MemoizedListItem = React.memo<ListItemProps>(({ item, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-[#0a0f0b] hover:bg-[#0f1711] transition-colors rounded-xl border border-[#162219]">
      <div className="flex items-center gap-3.5 min-w-0 flex-1 mr-3">
        <button
          type="button"
          onClick={() => onToggle(item.id)}
          aria-label={item.active ? 'Marcar como concluído' : 'Marcar como ativo'}
          className="text-neutral-500 hover:text-[#22c55e] transition-colors shrink-0 cursor-pointer"
        >
          {item.active ? (
            <CheckCircle className="w-5 h-5 text-[#22c55e]" />
          ) : (
            <Circle className="w-5 h-5 text-neutral-600" />
          )}
        </button>

        <div className="flex flex-col min-w-0">
          <span
            className={`text-sm font-medium tracking-tight truncate ${
              item.active ? 'text-white' : 'text-neutral-500 line-through'
            }`}
          >
            {item.title}
          </span>
          <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
            <span className="text-[#22c55e] font-mono text-[11px]">{item.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px] tabular-nums">Custo: {item.renderCost}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[11px]">{item.timestamp}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onDelete(item.id)}
        aria-label={`Remover ${item.title}`}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:text-red-400 hover:bg-neutral-900 transition-colors shrink-0 cursor-pointer"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
});

MemoizedListItem.displayName = 'MemoizedListItem';

export const FlatListShowcase: React.FC = () => {
  const [items, setItems] = useState<NativeTaskItem[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Otimização');

  // Filter items memoized
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [items, searchQuery]);

  const handleToggle = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  }, []);

  const handleDelete = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleAddItem = useCallback(() => {
    if (!newItemTitle.trim()) return;

    const newItem: NativeTaskItem = {
      id: `rn-${Date.now()}`,
      title: newItemTitle.trim(),
      category: newItemCategory,
      renderCost: '0.05ms',
      active: true,
      timestamp: 'Agora',
    };

    setItems((prev) => [newItem, ...prev]);
    setNewItemTitle('');
  }, [newItemTitle, newItemCategory]);

  return (
    <section id="flatlist-demo" className="py-16 md:py-24 border-b border-[#141e17] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold text-[#22c55e] uppercase tracking-wider mb-2">
              Virtualização de Alta Escala
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Demonstração de FlatList
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Renderizador de listas reativo com chaveamento único (<code className="text-[#22c55e] font-mono">keyExtractor</code>), busca com filtro instantâneo e separadores atômicos.
            </p>
          </div>

          {/* Telemetry pill */}
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 bg-[#0a0e0b] border border-[#162219] px-4 py-2 rounded-xl">
            <span>Pool: <strong className="text-white">{items.length}</strong></span>
            <span aria-hidden="true">·</span>
            <span>Visíveis: <strong className="text-[#22c55e]">{filteredItems.length}</strong></span>
            <span aria-hidden="true">·</span>
            <span>FPS: <strong className="text-[#22c55e]">60.0</strong></span>
          </div>
        </div>

        {/* Search Bar + Quick Insert */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
          <div className="lg:col-span-7">
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Buscar por tarefa ou categoria (ex: Hermes, FlatList, Animações)..."
              leftIcon={<Search className="w-4 h-4" />}
              clearButtonMode="while-editing"
            />
          </div>

          <div className="lg:col-span-5 flex items-center gap-2">
            <div className="flex-1">
              <TextInput
                value={newItemTitle}
                onChangeText={setNewItemTitle}
                placeholder="Nova tarefa de performance..."
                onSubmitEditing={handleAddItem}
              />
            </div>
            <Pressable
              onPress={handleAddItem}
              disabled={!newItemTitle.trim()}
              className="h-10 px-4 bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 shrink-0 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Adicionar</span>
            </Pressable>
          </div>
        </div>

        {/* FlatList Container */}
        <div className="bg-[#080c09] border border-[#162219] rounded-2xl p-4 sm:p-6">
          <FlatList
            data={filteredItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MemoizedListItem
                item={item}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            )}
            ItemSeparatorComponent={() => <div className="h-2.5" />}
            ListEmptyComponent={
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <Layers className="w-10 h-10 text-neutral-600 mb-3" />
                <Text variant="h3" className="text-sm font-semibold text-neutral-300">
                  Nenhum item encontrado
                </Text>
                <Text variant="caption" className="text-neutral-500 mt-1">
                  Experimente buscar por outros termos ou adicione uma nova entrada acima.
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
};
