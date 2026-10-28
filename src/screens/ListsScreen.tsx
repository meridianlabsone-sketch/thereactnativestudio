import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Switch,
  FlatList,
  SectionList,
  StyleSheet,
} from 'react-native';
import { CrudCategory, CrudItem } from '../types/crud';

interface ListsScreenProps {
  items: CrudItem[];
  onToggleItem: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onEditItem: (item: CrudItem) => void;
  onResetDefaults: () => void;
  onNavigateToCreate: () => void;
}

export const ListsScreen: React.FC<ListsScreenProps> = ({
  items,
  onToggleItem,
  onDeleteItem,
  onEditItem,
  onResetDefaults,
  onNavigateToCreate,
}) => {
  const [activeTab, setActiveTab] = useState<'flatlist' | 'sectionlist'>('flatlist');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter items based on search and category
  const filteredItems = useMemo(() => {
    return items.filter((it) => {
      const matchCat =
        selectedCategory === 'all' || it.category === selectedCategory;
      const matchSearch =
        !search.trim() ||
        it.title.toLowerCase().includes(search.toLowerCase()) ||
        it.description.toLowerCase().includes(search.toLowerCase()) ||
        it.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [items, search, selectedCategory]);

  // Group items for SectionList
  const sectionedData = useMemo(() => {
    const categories: CrudCategory[] = ['Performance', 'UI/UX', 'Arquitetura', 'Nativo'];
    return categories
      .map((cat) => ({
        title: cat,
        data: filteredItems.filter((it) => it.category === cat),
      }))
      .filter((sec) => sec.data.length > 0);
  }, [filteredItems]);

  const activeCount = useMemo(() => items.filter((it) => it.active).length, [items]);

  // Header Component for seamless full-page scrolling
  const renderListHeader = (
    <View style={styles.headerContainer}>
      {/* Title & Badge */}
      <View style={styles.introHeader}>
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>GERENCIAR CRUD · READ / UPDATE / DELETE</Text>
          <Text style={styles.badgeFps}>60 FPS VIRTUAL</Text>
        </View>
        <Text style={styles.mainTitle}>Listagem & Gestão</Text>
        <Text style={styles.subtitle}>
          Visualização dos registros em memória via &lt;FlatList&gt; e &lt;SectionList&gt;. Alterne o status, edite ou exclua qualquer registro.
        </Text>
      </View>

      {/* KPI Stats Strip */}
      <View style={styles.statsStrip}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>TOTAL DE ITENS</Text>
          <Text style={styles.statValue}>{items.length}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>STATUS ATIVO</Text>
          <Text style={[styles.statValue, styles.statGreen]}>{activeCount}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>PENDENTES</Text>
          <Text style={styles.statValue}>{items.length - activeCount}</Text>
        </View>
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
            &lt;FlatList /&gt; (Lista Única)
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
            &lt;SectionList /&gt; (Agrupada)
          </Text>
        </Pressable>
      </View>

      {/* Search Input Bar */}
      <View style={styles.searchCard}>
        <Text style={styles.filterTitle}>BUSCA INSTANTÂNEA NO CRUD:</Text>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Filtrar por nome, descrição ou categoria..."
          placeholderTextColor="#525252"
        />

        {/* Category Filter Pills */}
        <View style={styles.filterPillsRow}>
          {['all', 'Performance', 'UI/UX', 'Arquitetura', 'Nativo'].map((cat) => (
            <Pressable
              key={cat}
              style={[
                styles.pillBtn,
                selectedCategory === cat && styles.pillBtnActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.pillBtnText,
                  selectedCategory === cat && styles.pillBtnTextActive,
                ]}
              >
                {cat === 'all' ? 'Todos' : cat}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Section Subtitle */}
      <View style={styles.listSubheader}>
        <Text style={styles.listSubheaderText}>
          {activeTab === 'flatlist'
            ? `REGISTROS RENDERIZADOS VIA FLATLIST (${filteredItems.length})`
            : `REGISTROS AGRUPADOS VIA SECTIONLIST (${filteredItems.length})`}
        </Text>
        {items.length === 0 && (
          <Pressable onPress={onResetDefaults}>
            <Text style={styles.resetText}>Restaurar Padrões</Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  // Render Item for both lists
  const renderCrudItem = (item: CrudItem) => (
    <View style={styles.crudCard}>
      {/* Top row: Image thumbnail + Title + Category */}
      <View style={styles.cardTopRow}>
        <View style={styles.imageBox}>
          <Image
            source={{ uri: item.imageUri }}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.cardMainInfo}>
          <View style={styles.titleCatRow}>
            <Text style={styles.cardCategory}>{item.category}</Text>
            <Text style={styles.cardDate}>{item.createdAt}</Text>
          </View>
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
      </View>

      {/* Description with numberOfLines={2} */}
      <Text numberOfLines={2} style={styles.cardDesc}>
        {item.description}
      </Text>

      {/* Bottom actions row: Switch (Update status) + Edit button + Delete button */}
      <View style={styles.cardActionsRow}>
        <View style={styles.statusToggle}>
          <Switch
            value={item.active}
            onValueChange={() => onToggleItem(item.id)}
            trackColor={{ false: '#262626', true: '#22c55e' }}
            thumbColor="#ffffff"
          />
          <Text
            style={[
              styles.statusLabel,
              item.active ? styles.statusActive : styles.statusInactive,
            ]}
          >
            {item.active ? 'ATIVO' : 'PENDENTE'}
          </Text>
        </View>

        <View style={styles.buttonActionGroup}>
          <Pressable
            style={styles.editBtn}
            onPress={() => onEditItem(item)}
          >
            <Text style={styles.editBtnText}>✏️ Editar</Text>
          </Pressable>

          <Pressable
            style={styles.deleteBtn}
            onPress={() => onDeleteItem(item.id)}
          >
            <Text style={styles.deleteBtnText}>🗑️ Excluir</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {activeTab === 'flatlist' ? (
        <FlatList
          data={filteredItems}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderListHeader}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          renderItem={({ item }) => renderCrudItem(item)}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Nenhum registro encontrado</Text>
              <Text style={styles.emptyDesc}>
                Tente ajustar a busca ou adicione um novo registro no CRUD.
              </Text>
              <View style={styles.emptyActions}>
                <Pressable
                  style={styles.emptyBtnPrimary}
                  onPress={onNavigateToCreate}
                >
                  <Text style={styles.emptyBtnPrimaryText}>+ Criar Novo Registro</Text>
                </Pressable>
                <Pressable
                  style={styles.emptyBtnSecondary}
                  onPress={onResetDefaults}
                >
                  <Text style={styles.emptyBtnSecondaryText}>Restaurar Originais</Text>
                </Pressable>
              </View>
            </View>
          }
          ListFooterComponent={
            <View style={styles.footerCodeCard}>
              <Text style={styles.codeText}>
                &lt;FlatList data=&#123;itensCRUD&#125; renderItem=&#123;renderCard&#125; keyExtractor=&#123;(it) =&gt; it.id&#125; /&gt;
              </Text>
            </View>
          }
        />
      ) : (
        <SectionList
          sections={sectionedData}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderListHeader}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          renderSectionHeader={({ section: { title, data } }) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{title}</Text>
              <Text style={styles.sectionBadge}>{data.length} ITENS</Text>
            </View>
          )}
          renderItem={({ item }) => renderCrudItem(item)}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
          ListEmptyComponent={
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Nenhuma seção disponível</Text>
              <Text style={styles.emptyDesc}>Não há itens correspondentes aos filtros.</Text>
            </View>
          }
          ListFooterComponent={
            <View style={styles.footerCodeCard}>
              <Text style={styles.codeText}>
                &lt;SectionList sections=&#123;dadosAgrupados&#125; renderSectionHeader=&#123;header&#125; /&gt;
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 110,
  },
  headerContainer: {
    gap: 16,
    marginBottom: 16,
  },
  introHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: 16,
    gap: 6,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 6,
  },
  badge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#22c55e',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  badgeFps: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#ffffff',
    backgroundColor: '#122416',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#1d3e23',
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: '#a3a3a3',
    lineHeight: 20,
  },
  statsStrip: {
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#070b08',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#737373',
    fontWeight: '700',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    fontFamily: 'monospace',
  },
  statGreen: {
    color: '#22c55e',
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#090e0b',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 4,
    gap: 4,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
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
  searchCard: {
    backgroundColor: '#070b08',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  filterTitle: {
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#737373',
  },
  searchInput: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 8,
    color: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 13,
  },
  filterPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingTop: 2,
  },
  pillBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: '#0d130e',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  pillBtnActive: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  pillBtnText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#8a8a8a',
    fontWeight: '600',
  },
  pillBtnTextActive: {
    color: '#000000',
    fontWeight: '800',
  },
  listSubheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  listSubheaderText: {
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#22c55e',
  },
  resetText: {
    fontSize: 11,
    color: '#22c55e',
    textDecorationLine: 'underline',
  },
  crudCard: {
    backgroundColor: '#080c09',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  cardTopRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  imageBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#050705',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardMainInfo: {
    flex: 1,
    gap: 4,
  },
  titleCatRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardCategory: {
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#22c55e',
    backgroundColor: '#0c160e',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#193420',
  },
  cardDate: {
    fontSize: 10,
    color: '#737373',
    fontFamily: 'monospace',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
  },
  cardDesc: {
    fontSize: 13,
    color: '#a3a3a3',
    lineHeight: 18,
  },
  cardActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusLabel: {
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '700',
  },
  statusActive: {
    color: '#22c55e',
  },
  statusInactive: {
    color: '#737373',
  },
  buttonActionGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  editBtn: {
    backgroundColor: '#0e1711',
    borderWidth: 1,
    borderColor: '#1f3824',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  editBtnText: {
    color: '#22c55e',
    fontSize: 12,
    fontWeight: '600',
  },
  deleteBtn: {
    backgroundColor: '#170c0c',
    borderWidth: 1,
    borderColor: '#381f1f',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  deleteBtnText: {
    color: '#f87171',
    fontSize: 12,
    fontWeight: '600',
  },
  separator: {
    height: 12,
  },
  emptyCard: {
    backgroundColor: '#080c09',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 32,
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  emptyDesc: {
    fontSize: 12,
    color: '#737373',
    textAlign: 'center',
    maxWidth: 260,
  },
  emptyActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  emptyBtnPrimary: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  emptyBtnPrimaryText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 12,
  },
  emptyBtnSecondary: {
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },
  emptyBtnSecondaryText: {
    color: '#ffffff',
    fontSize: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0d1810',
    borderWidth: 1,
    borderColor: '#18301e',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 12,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
    fontFamily: 'monospace',
  },
  sectionBadge: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#22c55e',
    fontWeight: '700',
  },
  sectionSeparator: {
    height: 12,
  },
  footerCodeCard: {
    backgroundColor: '#050705',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 14,
    marginTop: 20,
  },
  codeText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#22c55e',
  },
});
