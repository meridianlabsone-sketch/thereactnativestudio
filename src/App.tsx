/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  Switch,
  Modal,
  ScrollView,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { ComponentsScreen } from './screens/ComponentsScreen';
import { ListsScreen } from './screens/ListsScreen';
import { CrudCategory, CrudItem, INITIAL_ITEMS } from './types/crud';

const sampleRNCode = `// CRUD em Memória 100% React Native
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Button,
  Switch,
  FlatList,
  SectionList,
  StyleSheet,
} from 'react-native';

export default function CrudApp() {
  const [items, setItems] = useState([
    { id: '1', title: 'Item Exemplo', category: 'Nativo', active: true },
  ]);
  const [title, setTitle] = useState('');

  // CREATE
  const handleAdd = () => {
    if (!title.trim()) return;
    setItems([{ id: Date.now().toString(), title, category: 'Nativo', active: true }, ...items]);
    setTitle('');
  };

  // UPDATE
  const handleToggle = (id) => {
    setItems(items.map(it => it.id === id ? { ...it, active: !it.active } : it));
  };

  // DELETE
  const handleDelete = (id) => {
    setItems(items.filter(it => it.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CRUD React Native</Text>
      
      {/* Create Input */}
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Digite o título..."
        placeholderTextColor="#525252"
      />
      <Button title="Salvar Registro" color="#22c55e" onPress={handleAdd} />

      {/* Read & Delete via FlatList */}
      <FlatList
        data={items}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.text}>{item.title}</Text>
            <Switch value={item.active} onValueChange={() => handleToggle(item.id)} />
            <Pressable onPress={() => handleDelete(item.id)}>
              <Text style={styles.del}>✕</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000', padding: 20 },
  header: { color: '#ffffff', fontSize: 24, fontWeight: '800', marginBottom: 16 },
  input: { backgroundColor: '#0a0e0b', borderColor: '#22c55e', borderWidth: 1, padding: 12, borderRadius: 8, color: '#ffffff', marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderColor: '#1f2d22' },
  text: { color: '#ffffff', fontSize: 14, flex: 1 },
  del: { color: '#f87171', paddingHorizontal: 12, fontSize: 16 },
});
`;

export default function App() {
  const { width } = useWindowDimensions();
  const isMobile = width < 580;

  // Navigation tab: 'create' (Cadastrar / Primitivas) | 'manage' (Gerenciar CRUD)
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');
  const [isFluidMode, setIsFluidMode] = useState(false);
  const [codeModalVisible, setCodeModalVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  // In-memory CRUD central state (No backend / No database)
  const [crudItems, setCrudItems] = useState<CrudItem[]>(INITIAL_ITEMS);

  // Edit Modal State (Update)
  const [editingItem, setEditingItem] = useState<CrudItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editCategory, setEditCategory] = useState<CrudCategory>('Performance');
  const [editActive, setEditActive] = useState(true);

  // CREATE
  const handleCreateItem = (newItem: Omit<CrudItem, 'id' | 'createdAt'>) => {
    const item: CrudItem = {
      ...newItem,
      id: Date.now().toString(),
      createdAt: 'Agora',
    };
    setCrudItems((prev) => [item, ...prev]);
  };

  // UPDATE: Toggle active status directly
  const handleToggleItem = (id: string) => {
    setCrudItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, active: !it.active } : it))
    );
  };

  // UPDATE: Open edit modal
  const handleStartEdit = (item: CrudItem) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditDesc(item.description);
    setEditCategory(item.category);
    setEditActive(item.active);
  };

  // UPDATE: Save edit modal
  const handleSaveEdit = () => {
    if (!editingItem || !editTitle.trim()) return;
    setCrudItems((prev) =>
      prev.map((it) =>
        it.id === editingItem.id
          ? {
              ...it,
              title: editTitle.trim(),
              description: editDesc.trim(),
              category: editCategory,
              active: editActive,
            }
          : it
      )
    );
    setEditingItem(null);
  };

  // DELETE
  const handleDeleteItem = (id: string) => {
    setCrudItems((prev) => prev.filter((it) => it.id !== id));
  };

  // RESET
  const handleResetDefaults = () => {
    setCrudItems(INITIAL_ITEMS);
  };

  const handleCopyCode = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(sampleRNCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Frame width calculation for optimal visual comfort
  const frameWidth = isMobile
    ? '100%'
    : isFluidMode
    ? Math.min(width - 32, 860)
    : 600;

  return (
    <SafeAreaView style={styles.outerCanvas}>
      <StatusBar barStyle="light-content" />

      {/* Main Container - Comfortable, Spacious & Responsive */}
      <View
        style={[
          styles.mainFrame,
          isMobile
            ? styles.mainFrameMobile
            : {
                width: frameWidth,
                maxWidth: '100%',
                borderRadius: isFluidMode ? 20 : 36,
                borderWidth: isFluidMode ? 2 : 6,
              },
        ]}
      >
        {/* Dynamic Island on Desktop Phone Mode */}
        {!isMobile && !isFluidMode && (
          <View style={styles.dynamicIslandContainer}>
            <View style={styles.dynamicIsland}>
              <View style={styles.cameraDot} />
            </View>
          </View>
        )}

        {/* Status Bar */}
        <View style={styles.statusBar}>
          <Text style={styles.statusTime}>09:41</Text>
          <View style={styles.statusIcons}>
            <Text style={styles.statusIconText}>5G</Text>
            <View style={styles.batteryIcon}>
              <View style={styles.batteryFill} />
            </View>
          </View>
        </View>

        {/* App Top Bar */}
        <View style={styles.appBar}>
          <View style={styles.brandRow}>
            <View style={styles.brandDot} />
            <Text style={styles.brandTitle}>
              react-native<Text style={styles.brandAccent}>.crud</Text>
            </Text>
          </View>

          <View style={styles.headerRightActions}>
            {!isMobile && (
              <Pressable
                style={styles.modeToggleBtn}
                onPress={() => setIsFluidMode(!isFluidMode)}
              >
                <Text style={styles.modeToggleText}>
                  {isFluidMode ? '📱 Modo Celular' : '🖥️ Modo Amplo'}
                </Text>
              </Pressable>
            )}

            <Pressable
              style={styles.codeSnippetBtn}
              onPress={() => setCodeModalVisible(true)}
            >
              <Text style={styles.codeSnippetBtnText}>&lt;/&gt; Código RN</Text>
            </Pressable>
          </View>
        </View>

        {/* Screen Container (Receives seamless mouse wheel scroll) */}
        <View style={styles.screenContainer}>
          {activeTab === 'create' ? (
            <ComponentsScreen
              onCreateItem={handleCreateItem}
              onNavigateToList={() => setActiveTab('manage')}
            />
          ) : (
            <ListsScreen
              items={crudItems}
              onToggleItem={handleToggleItem}
              onDeleteItem={handleDeleteItem}
              onEditItem={handleStartEdit}
              onResetDefaults={handleResetDefaults}
              onNavigateToCreate={() => setActiveTab('create')}
            />
          )}
        </View>

        {/* Bottom Navigation Tab Bar */}
        <View style={[styles.bottomTabBar, isMobile && styles.bottomTabBarMobile]}>
          <Pressable
            style={({ pressed }: { pressed: boolean }) => [
              styles.tabItem,
              activeTab === 'create' && styles.tabItemActive,
              pressed && styles.tabItemPressed,
            ]}
            onPress={() => setActiveTab('create')}
          >
            <Text style={[styles.tabIcon, activeTab === 'create' && styles.tabIconActive]}>
              ＋
            </Text>
            <Text style={[styles.tabLabel, activeTab === 'create' && styles.tabLabelActive]}>
              Cadastrar & Primitivas
            </Text>
            {activeTab === 'create' && <View style={styles.activeIndicator} />}
          </Pressable>

          <Pressable
            style={({ pressed }: { pressed: boolean }) => [
              styles.tabItem,
              activeTab === 'manage' && styles.tabItemActive,
              pressed && styles.tabItemPressed,
            ]}
            onPress={() => setActiveTab('manage')}
          >
            <View style={styles.tabBadgeRow}>
              <Text style={[styles.tabIcon, activeTab === 'manage' && styles.tabIconActive]}>
                ☰
              </Text>
              <View style={styles.badgePill}>
                <Text style={styles.badgePillText}>{crudItems.length}</Text>
              </View>
            </View>
            <Text style={[styles.tabLabel, activeTab === 'manage' && styles.tabLabelActive]}>
              Gerenciar CRUD
            </Text>
            {activeTab === 'manage' && <View style={styles.activeIndicator} />}
          </Pressable>
        </View>

        {/* Home Indicator */}
        <View style={styles.homeIndicatorRow}>
          <View style={styles.homeIndicator} />
        </View>
      </View>

      {/* EDIT MODAL (CRUD UPDATE) */}
      <Modal
        visible={editingItem !== null}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setEditingItem(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.editModalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Editar Registro [UPDATE]</Text>
              <Pressable onPress={() => setEditingItem(null)}>
                <Text style={styles.closeIcon}>✕</Text>
              </Pressable>
            </View>

            <View style={styles.editForm}>
              <Text style={styles.editFieldLabel}>TÍTULO DO REGISTRO:</Text>
              <TextInput
                style={styles.editInput}
                value={editTitle}
                onChangeText={setEditTitle}
                placeholder="Título do item..."
                placeholderTextColor="#525252"
              />

              <Text style={styles.editFieldLabel}>DESCRIÇÃO:</Text>
              <TextInput
                style={[styles.editInput, { minHeight: 60 }]}
                value={editDesc}
                onChangeText={setEditDesc}
                placeholder="Descrição..."
                placeholderTextColor="#525252"
                multiline={true}
              />

              <Text style={styles.editFieldLabel}>CATEGORIA:</Text>
              <View style={styles.editCatRow}>
                {(['Performance', 'UI/UX', 'Arquitetura', 'Nativo'] as CrudCategory[]).map(
                  (cat) => (
                    <Pressable
                      key={cat}
                      style={[
                        styles.editCatBtn,
                        editCategory === cat && styles.editCatBtnActive,
                      ]}
                      onPress={() => setEditCategory(cat)}
                    >
                      <Text
                        style={[
                          styles.editCatBtnText,
                          editCategory === cat && styles.editCatBtnTextActive,
                        ]}
                      >
                        {cat}
                      </Text>
                    </Pressable>
                  )
                )}
              </View>

              <View style={styles.editSwitchRow}>
                <Text style={styles.editSwitchLabel}>STATUS ATIVO:</Text>
                <Switch
                  value={editActive}
                  onValueChange={setEditActive}
                  trackColor={{ false: '#262626', true: '#22c55e' }}
                  thumbColor="#ffffff"
                />
              </View>

              <View style={styles.editActionsRow}>
                <Pressable
                  style={styles.cancelBtn}
                  onPress={() => setEditingItem(null)}
                >
                  <Text style={styles.cancelBtnText}>Cancelar</Text>
                </Pressable>

                <Pressable
                  style={styles.saveBtn}
                  onPress={handleSaveEdit}
                >
                  <Text style={styles.saveBtnText}>Salvar Alterações</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* CODE INSPECTOR MODAL */}
      <Modal
        visible={codeModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setCodeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.codeModalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Código Oficial React Native (CRUD)</Text>
              <Pressable style={styles.copyBtn} onPress={handleCopyCode}>
                <Text style={styles.copyBtnText}>{copied ? '✓ Copiado' : 'Copiar'}</Text>
              </Pressable>
            </View>

            <ScrollView style={styles.codeScroll}>
              <Text style={styles.codeSnippet}>{sampleRNCode}</Text>
            </ScrollView>

            <Pressable
              style={styles.closeBtn}
              onPress={() => setCodeModalVisible(false)}
            >
              <Text style={styles.closeBtnText}>Fechar Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerCanvas: {
    flex: 1,
    minHeight: '100%',
    backgroundColor: '#030504',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  mainFrame: {
    flex: 1,
    height: '100%',
    maxHeight: '94vh' as any,
    backgroundColor: '#000000',
    borderColor: '#152419',
    overflow: 'hidden',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 36,
    elevation: 20,
  },
  mainFrameMobile: {
    width: '100%',
    height: '100%',
    maxHeight: '100%' as any,
    borderRadius: 0,
    borderWidth: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  dynamicIslandContainer: {
    alignItems: 'center',
    paddingTop: 8,
    zIndex: 30,
  },
  dynamicIsland: {
    width: 104,
    height: 22,
    backgroundColor: '#000000',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1f1f1f',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  cameraDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#0c160f',
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 6,
  },
  statusTime: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'monospace',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusIconText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'monospace',
  },
  batteryIcon: {
    width: 20,
    height: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#ffffff',
    padding: 1,
    justifyContent: 'center',
  },
  batteryFill: {
    width: '75%',
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 1.5,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    flexWrap: 'wrap',
    gap: 8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
  },
  brandTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  brandAccent: {
    color: '#22c55e',
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modeToggleBtn: {
    backgroundColor: '#0a100c',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  modeToggleText: {
    color: '#a3a3a3',
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '600',
  },
  codeSnippetBtn: {
    backgroundColor: '#0c160f',
    borderWidth: 1,
    borderColor: '#1e3c25',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  codeSnippetBtnText: {
    color: '#22c55e',
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '700',
  },
  screenContainer: {
    flex: 1,
    minHeight: 0, // Critical for React Native Web flex child scrolling
    backgroundColor: '#000000',
  },
  bottomTabBar: {
    flexDirection: 'row',
    backgroundColor: '#050806',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 8,
  },
  bottomTabBarMobile: {
    paddingBottom: 14,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 12,
    minHeight: 50,
    position: 'relative',
  },
  tabItemActive: {
    backgroundColor: '#0a140d',
  },
  tabItemPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.96 }],
  },
  tabIcon: {
    fontSize: 17,
    color: '#525252',
    fontWeight: '800',
  },
  tabIconActive: {
    color: '#22c55e',
  },
  tabBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  badgePill: {
    backgroundColor: '#0c1810',
    borderWidth: 1,
    borderColor: '#1e3823',
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  badgePillText: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#22c55e',
    fontWeight: '700',
  },
  tabLabel: {
    fontSize: 11,
    color: '#737373',
    fontWeight: '600',
    marginTop: 2,
    fontFamily: 'monospace',
  },
  tabLabelActive: {
    color: '#22c55e',
    fontWeight: '700',
  },
  activeIndicator: {
    width: 24,
    height: 2,
    borderRadius: 1,
    backgroundColor: '#22c55e',
    position: 'absolute',
    bottom: 2,
  },
  homeIndicatorRow: {
    alignItems: 'center',
    paddingVertical: 4,
    backgroundColor: '#050806',
  },
  homeIndicator: {
    width: 100,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#333333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  editModalBox: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#080c09',
    borderWidth: 1,
    borderColor: '#22c55e',
    borderRadius: 18,
    padding: 20,
    gap: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: 10,
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  closeIcon: {
    color: '#737373',
    fontSize: 16,
    padding: 4,
  },
  editForm: {
    gap: 10,
  },
  editFieldLabel: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#737373',
    fontWeight: '700',
  },
  editInput: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#22c55e',
    borderRadius: 8,
    color: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  editCatRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  editCatBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#0d130e',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  editCatBtnActive: {
    backgroundColor: '#22c55e',
  },
  editCatBtnText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#a3a3a3',
  },
  editCatBtnTextActive: {
    color: '#000000',
    fontWeight: '700',
  },
  editSwitchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  editSwitchLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  editActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#171717',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  saveBtn: {
    flex: 1,
    backgroundColor: '#22c55e',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '700',
  },
  codeModalBox: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '85%',
    backgroundColor: '#080c09',
    borderWidth: 1,
    borderColor: '#22c55e',
    borderRadius: 18,
    padding: 18,
    gap: 12,
  },
  copyBtn: {
    backgroundColor: '#0c160f',
    borderWidth: 1,
    borderColor: '#22c55e',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  copyBtnText: {
    color: '#22c55e',
    fontSize: 10,
    fontWeight: '700',
  },
  codeScroll: {
    backgroundColor: '#040705',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: 12,
  },
  codeSnippet: {
    color: '#22c55e',
    fontFamily: 'monospace',
    fontSize: 11,
    lineHeight: 18,
  },
  closeBtn: {
    backgroundColor: '#171717',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
});
