import React, { useState, useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  SectionList,
  StyleSheet,
} from 'react-native';

interface TaskItem {
  id: string;
  title: string;
  tag: string;
  done: boolean;
}

interface SectionData {
  title: string;
  data: string[];
}

const initialFlatTasks: TaskItem[] = [
  { id: '1', title: 'Virtualização com FlatList para rolagem a 60 FPS', tag: 'Core', done: true },
  { id: '2', title: 'Adicionar keyExtractor com IDs estáveis e únicos', tag: 'Chaves', done: true },
  { id: '3', title: 'Utilizar SectionList para listas com categorias', tag: 'Seções', done: true },
  { id: '4', title: 'Definir getItemLayout para prever alturas fixas', tag: 'Perf', done: false },
  { id: '5', title: 'Otimizar renderItem com React.memo', tag: 'Memo', done: false },
  { id: '6', title: 'Remover console.log em builds de produção', tag: 'Build', done: false },
  { id: '7', title: 'Ativar Hermes Engine para compilação bytecode', tag: 'Engine', done: false },
];

const initialSections: SectionData[] = [
  {
    title: 'Basic Components',
    data: ['View', 'Text', 'Image', 'TextInput', 'Pressable', 'ScrollView', 'StyleSheet'],
  },
  {
    title: 'User Interface',
    data: ['Button', 'Switch'],
  },
  {
    title: 'List Views (Virtualizados)',
    data: ['FlatList', 'SectionList'],
  },
];

export interface ListsScreenHandle {
  scrollToTop: () => void;
}

export const ListsScreen = forwardRef<ListsScreenHandle>((_props, ref) => {
  const [flatTasks, setFlatTasks] = useState<TaskItem[]>(initialFlatTasks);
  const [activeTab, setActiveTab] = useState<'flatlist' | 'sectionlist'>('flatlist');
  const [search, setSearch] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const flatListRef = useRef<FlatList<TaskItem>>(null);
  const sectionListRef = useRef<SectionList<string, SectionData>>(null);

  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      if (activeTab === 'flatlist') {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
      } else {
        sectionListRef.current?.scrollToLocation({
          sectionIndex: 0,
          itemIndex: 0,
          animated: true,
        });
      }
    },
  }));

  // Filter for FlatList
  const filteredTasks = useMemo(() => {
    if (!search.trim()) return flatTasks;
    const q = search.toLowerCase();
    return flatTasks.filter(
      (t) => t.title.toLowerCase().includes(q) || t.tag.toLowerCase().includes(q)
    );
  }, [flatTasks, search]);

  const handleToggle = (id: string) => {
    setFlatTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const handleDelete = (id: string) => {
    setFlatTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    const newTask: TaskItem = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      tag: 'Custom',
      done: false,
    };
    setFlatTasks((prev) => [newTask, ...prev]);
    setNewTitle('');
  };

  // Shared Header for the screen
  const renderSharedHeader = (
    <View style={styles.headerContainer}>
      {/* Intro Badge & Title */}
      <View style={styles.introHeader}>
        <Text style={styles.badge}>LIST VIEWS (ALTA PERFORMANCE)</Text>
        <Text style={styles.mainTitle}>Listas Virtuais</Text>
        <Text style={styles.subtitle}>
          Unlike the more generic ScrollView, list view components only render elements that are currently showing on the screen.
        </Text>
      </View>

      {/* Segmented Switch: FlatList vs SectionList */}
      <View style={styles.segmentContainer}>
        <Pressable
          style={[styles.segmentBtn, activeTab === 'flatlist' && styles.segmentBtnActive]}
          onPress={() => setActiveTab('flatlist')}
        >
          <Text
            style={[
              styles.segmentBtnText,
              activeTab === 'flatlist' && styles.segmentBtnTextActive,
            ]}
          >
            &lt;FlatList /&gt;
          </Text>
        </Pressable>

        <Pressable
          style={[styles.segmentBtn, activeTab === 'sectionlist' && styles.segmentBtnActive]}
          onPress={() => setActiveTab('sectionlist')}
        >
          <Text
            style={[
              styles.segmentBtnText,
              activeTab === 'sectionlist' && styles.segmentBtnTextActive,
            ]}
          >
            &lt;SectionList /&gt;
          </Text>
        </Pressable>
      </View>

      {/* Concept Explainer Banner */}
      <View style={styles.conceptCard}>
        <View style={styles.conceptTagRow}>
          <Text style={styles.conceptTag}>
            {activeTab === 'flatlist' ? '<FlatList />' : '<SectionList />'}
          </Text>
          <Text style={styles.conceptFps}>60 FPS Virtual</Text>
        </View>

        <Text style={styles.conceptDesc}>
          {activeTab === 'flatlist'
            ? 'A component for rendering performant scrollable lists.'
            : 'Like FlatList, but for sectioned lists.'}
        </Text>
        <Text style={styles.conceptExplainer}>
          {activeTab === 'flatlist'
            ? 'Recicla itens fora do viewport. Ideal para listas longas, feeds de redes sociais e históricos.'
            : 'Agrupa itens por categorias com suporte a cabeçalhos fixos (renderSectionHeader).'}
        </Text>
      </View>

      {/* Controls only shown in FlatList mode */}
      {activeTab === 'flatlist' && (
        <View style={styles.controlsCard}>
          <View style={styles.searchRow}>
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Buscar nas tarefas (TextInput)..."
              placeholderTextColor="#525252"
            />
          </View>

          <View style={styles.addRow}>
            <TextInput
              style={[styles.searchInput, styles.addInput]}
              value={newTitle}
              onChangeText={setNewTitle}
              placeholder="Nova tarefa na FlatList..."
              placeholderTextColor="#525252"
              onSubmitEditing={handleAdd}
            />
            <Pressable style={styles.addBtn} onPress={handleAdd}>
              <Text style={styles.addBtnText}>+ Inserir</Text>
            </Pressable>
          </View>

          <View style={styles.statsRow}>
            <Text style={styles.statsLabel}>ITENS NA VIRTUALIZAÇÃO:</Text>
            <Text style={styles.statsCount}>{filteredTasks.length} tarefas · 60 FPS</Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {activeTab === 'flatlist' ? (
        <FlatList
          ref={flatListRef}
          data={filteredTasks}
          keyExtractor={(item: TaskItem) => item.id}
          ListHeaderComponent={renderSharedHeader}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: TaskItem }) => (
            <View style={styles.listItem}>
              <Pressable
                style={styles.itemLeft}
                onPress={() => handleToggle(item.id)}
              >
                <Text style={styles.checkbox}>{item.done ? '✓' : '○'}</Text>
                <Text
                  style={[styles.itemText, item.done && styles.itemTextDone]}
                >
                  {item.title}
                </Text>
              </Pressable>

              <View style={styles.itemRight}>
                <Text style={styles.itemTag}>{item.tag}</Text>
                <Pressable
                  style={styles.deleteBtn}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={styles.deleteBtnText}>✕</Text>
                </Pressable>
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Text style={styles.emptyText}>Nenhuma tarefa encontrada.</Text>
            </View>
          }
          ListFooterComponent={
            <View style={styles.footerCodeCard}>
              <Text style={styles.codeText}>
                &lt;FlatList data=&#123;data&#125; renderItem=&#123;renderItem&#125; keyExtractor=&#123;key&#125; /&gt;
              </Text>
            </View>
          }
        />
      ) : (
        <SectionList
          ref={sectionListRef}
          sections={initialSections}
          keyExtractor={(item: string, index: number) => item + index}
          ListHeaderComponent={renderSharedHeader}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{title}</Text>
              <Text style={styles.sectionBadge}>SEÇÃO</Text>
            </View>
          )}
          renderItem={({ item }: { item: string }) => (
            <View style={styles.sectionItem}>
              <View style={styles.bullet} />
              <Text style={styles.sectionItemText}>{item}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
          ListFooterComponent={
            <View style={styles.footerCodeCard}>
              <Text style={styles.codeText}>
                &lt;SectionList sections=&#123;secoes&#125; renderSectionHeader=&#123;header&#125; /&gt;
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
});

ListsScreen.displayName = 'ListsScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 90,
  },
  headerContainer: {
    gap: 14,
    marginBottom: 12,
  },
  introHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: 14,
  },
  badge: {
    fontSize: 10,
    fontWeight: '700',
    color: '#22c55e',
    fontFamily: 'monospace',
    letterSpacing: 1,
    marginBottom: 4,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 12,
    color: '#a3a3a3',
    marginTop: 4,
    lineHeight: 18,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#090e0b',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 3,
    gap: 4,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  segmentBtnActive: {
    backgroundColor: '#22c55e',
  },
  segmentBtnText: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'monospace',
    color: '#737373',
  },
  segmentBtnTextActive: {
    color: '#000000',
  },
  conceptCard: {
    backgroundColor: '#080c09',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.3)',
    borderRadius: 14,
    padding: 14,
    gap: 6,
  },
  conceptTagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conceptTag: {
    fontSize: 12,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#22c55e',
  },
  conceptFps: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#22c55e',
    fontWeight: '700',
  },
  conceptDesc: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  conceptExplainer: {
    fontSize: 11,
    color: '#a3a3a3',
    lineHeight: 16,
  },
  controlsCard: {
    backgroundColor: '#070b08',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    padding: 12,
    gap: 10,
  },
  searchRow: {
    width: '100%',
  },
  searchInput: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    color: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
  },
  addRow: {
    flexDirection: 'row',
    gap: 8,
  },
  addInput: {
    flex: 1,
  },
  addBtn: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 12,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
  },
  statsLabel: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#737373',
  },
  statsCount: {
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#22c55e',
  },
  listItem: {
    backgroundColor: '#080c09',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  checkbox: {
    fontSize: 14,
    fontWeight: '700',
    color: '#22c55e',
    width: 20,
    textAlign: 'center',
  },
  itemText: {
    fontSize: 13,
    color: '#ffffff',
    flex: 1,
  },
  itemTextDone: {
    color: '#525252',
    textDecorationLine: 'line-through',
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemTag: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#22c55e',
    backgroundColor: '#0c160e',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  deleteBtn: {
    padding: 4,
  },
  deleteBtnText: {
    fontSize: 12,
    color: '#737373',
  },
  separator: {
    height: 6,
  },
  emptyCard: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#080c09',
    borderRadius: 10,
  },
  emptyText: {
    color: '#525252',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0d1810',
    borderWidth: 1,
    borderColor: '#18301e',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 8,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'monospace',
  },
  sectionBadge: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: '#22c55e',
    fontWeight: '700',
  },
  sectionItem: {
    backgroundColor: '#080c09',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#22c55e',
  },
  sectionItemText: {
    fontSize: 13,
    color: '#d4d4d4',
    fontFamily: 'monospace',
  },
  sectionSeparator: {
    height: 8,
  },
  footerCodeCard: {
    backgroundColor: '#050705',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
  },
  codeText: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#22c55e',
  },
});
