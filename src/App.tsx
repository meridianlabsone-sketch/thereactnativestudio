/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  Modal,
  ScrollView,
  StyleSheet,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { ComponentsScreen, ComponentsScreenHandle } from './screens/ComponentsScreen';
import { ListsScreen, ListsScreenHandle } from './screens/ListsScreen';

const sampleRNCode = `// Código Oficial React Native
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Button,
  Switch,
  FlatList,
  SectionList,
} from 'react-native';

export default function MobileApp() {
  const [text, setText] = useState('');
  const [active, setActive] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Meu App React Native</Text>

      {/* TextInput com texto exibido depois */}
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Digite algo..."
        placeholderTextColor="#525252"
      />
      <Text style={styles.echo}>Texto digitado: {text}</Text>

      {/* Switch e Button */}
      <Switch value={active} onValueChange={setActive} />
      <Button title="Salvar" color="#22c55e" onPress={() => {}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000', padding: 16 },
  title: { color: '#ffffff', fontSize: 22, fontWeight: '800' },
  input: { backgroundColor: '#0a0e0b', borderWidth: 1, borderColor: '#22c55e', color: '#ffffff', padding: 10, borderRadius: 8 },
  echo: { color: '#22c55e', fontSize: 16, fontWeight: '700', marginTop: 8 },
});
`;

export default function App() {
  const { width, height } = useWindowDimensions();
  const isMobile = width < 520;

  const [activeTab, setActiveTab] = useState<'components' | 'lists'>('components');
  const [isFluidMode, setIsFluidMode] = useState(false);
  const [codeModalVisible, setCodeModalVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const componentsRef = useRef<ComponentsScreenHandle>(null);
  const listsRef = useRef<ListsScreenHandle>(null);

  const handleTabPress = (tab: 'components' | 'lists') => {
    if (activeTab === tab) {
      // Classic native app pattern: tapping active tab scrolls to top
      if (tab === 'components') {
        componentsRef.current?.scrollToTop();
      } else {
        listsRef.current?.scrollToTop();
      }
    } else {
      setActiveTab(tab);
    }
  };

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(sampleRNCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const dynamicFrameStyle = isMobile
    ? {
        width: '100%' as const,
        maxWidth: '100%' as const,
        height: '100%' as const,
        maxHeight: '100%' as const,
        borderRadius: 0,
        borderWidth: 0,
        shadowOpacity: 0,
        elevation: 0,
      }
    : {
        width: '100%' as const,
        maxWidth: isFluidMode ? Math.min(width - 32, 720) : 420,
        height: '100%' as const,
        maxHeight: Math.min(height - 24, 880),
        borderRadius: isFluidMode ? 24 : 44,
        borderWidth: isFluidMode ? 2 : 8,
      };

  return (
    <SafeAreaView style={[styles.outerCanvas, isMobile && styles.outerCanvasMobile]}>
      <StatusBar barStyle="light-content" />

      {/* Mobile Device Frame */}
      <View style={[styles.phoneFrame, dynamicFrameStyle]}>
        {/* Dynamic Island / Notch */}
        {!isFluidMode && (
          <View style={[styles.dynamicIslandContainer, isMobile && styles.dynamicIslandMobile]}>
            <View style={styles.dynamicIsland}>
              <View style={styles.cameraDot} />
            </View>
          </View>
        )}

        {/* Mobile Status Bar */}
        <View style={styles.statusBar}>
          <Text style={styles.statusTime}>09:41</Text>
          <View style={styles.statusIcons}>
            <Text style={styles.statusIconText}>5G</Text>
            <View style={styles.batteryIcon}>
              <View style={styles.batteryFill} />
            </View>
          </View>
        </View>

        {/* Mobile Top App Bar */}
        <View style={styles.appBar}>
          <View style={styles.brandRow}>
            <View style={styles.brandDot} />
            <Text style={styles.brandTitle}>
              react-native<Text style={styles.brandAccent}>.lab</Text>
            </Text>
          </View>

          <View style={styles.headerRightActions}>
            {/* Scroll to Top quick button */}
            <Pressable
              style={styles.quickTopBtn}
              onPress={() => {
                if (activeTab === 'components') {
                  componentsRef.current?.scrollToTop();
                } else {
                  listsRef.current?.scrollToTop();
                }
              }}
            >
              <Text style={styles.quickTopText}>↑ Topo</Text>
            </Pressable>

            {/* Viewport switcher on desktop */}
            {!isMobile && (
              <Pressable
                style={styles.modeToggleBtn}
                onPress={() => setIsFluidMode(!isFluidMode)}
              >
                <Text style={styles.modeToggleText}>
                  {isFluidMode ? '📱 Celular' : '🖥️ Expandir'}
                </Text>
              </Pressable>
            )}

            <Pressable
              style={styles.codeSnippetBtn}
              onPress={() => setCodeModalVisible(true)}
            >
              <Text style={styles.codeSnippetBtnText}>&lt;/&gt; Código</Text>
            </Pressable>
          </View>
        </View>

        {/* Active Mobile Screen View (Unified Native Scroll) */}
        <View style={styles.screenContainer}>
          {activeTab === 'components' ? (
            <ComponentsScreen ref={componentsRef} />
          ) : (
            <ListsScreen ref={listsRef} />
          )}
        </View>

        {/* Mobile Bottom Tab Bar */}
        <View style={[styles.bottomTabBar, isMobile && styles.bottomTabBarMobile]}>
          <Pressable
            style={({ pressed }: { pressed: boolean }) => [
              styles.tabItem,
              activeTab === 'components' && styles.tabItemActive,
              pressed && styles.tabItemPressed,
            ]}
            onPress={() => handleTabPress('components')}
          >
            <View style={styles.tabIconBadgeRow}>
              <Text style={[styles.tabIcon, activeTab === 'components' && styles.tabIconActive]}>
                ❖
              </Text>
              <View style={styles.badgeCount}>
                <Text style={styles.badgeCountText}>7</Text>
              </View>
            </View>
            <Text style={[styles.tabLabel, activeTab === 'components' && styles.tabLabelActive]}>
              Componentes & UI
            </Text>
            {activeTab === 'components' && <View style={styles.activeIndicator} />}
          </Pressable>

          <Pressable
            style={({ pressed }: { pressed: boolean }) => [
              styles.tabItem,
              activeTab === 'lists' && styles.tabItemActive,
              pressed && styles.tabItemPressed,
            ]}
            onPress={() => handleTabPress('lists')}
          >
            <View style={styles.tabIconBadgeRow}>
              <Text style={[styles.tabIcon, activeTab === 'lists' && styles.tabIconActive]}>
                ≡
              </Text>
              <View style={styles.badgeCount}>
                <Text style={styles.badgeCountText}>2</Text>
              </View>
            </View>
            <Text style={[styles.tabLabel, activeTab === 'lists' && styles.tabLabelActive]}>
              List Views (60 FPS)
            </Text>
            {activeTab === 'lists' && <View style={styles.activeIndicator} />}
          </Pressable>
        </View>

        {/* Home Indicator Bar */}
        <View style={styles.homeIndicatorRow}>
          <View style={styles.homeIndicator} />
        </View>
      </View>

      {/* React Native Code Modal */}
      <Modal
        visible={codeModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setCodeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalBox,
              { maxWidth: Math.min(width * 0.92, 440), maxHeight: Math.min(height * 0.85, 620) },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Código Oficial React Native</Text>
              <Pressable style={styles.copyBtn} onPress={handleCopy}>
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
    backgroundColor: '#040605',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  outerCanvasMobile: {
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  phoneFrame: {
    backgroundColor: '#000000',
    borderColor: '#152419',
    overflow: 'hidden',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 20,
  },
  dynamicIslandContainer: {
    alignItems: 'center',
    paddingTop: 8,
    zIndex: 30,
  },
  dynamicIslandMobile: {
    paddingTop: 4,
  },
  dynamicIsland: {
    width: 100,
    height: 22,
    backgroundColor: '#000000',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1a1a1a',
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
    paddingHorizontal: 20,
    paddingVertical: 4,
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
    paddingHorizontal: 16,
    paddingVertical: 10,
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
    fontSize: 14,
    fontWeight: '800',
    fontFamily: 'monospace',
  },
  brandAccent: {
    color: '#22c55e',
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  quickTopBtn: {
    backgroundColor: '#08100a',
    borderWidth: 1,
    borderColor: '#19301e',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
  },
  quickTopText: {
    color: '#22c55e',
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '700',
  },
  modeToggleBtn: {
    backgroundColor: '#090e0a',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  modeToggleText: {
    color: '#a3a3a3',
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '600',
  },
  codeSnippetBtn: {
    backgroundColor: '#0c160f',
    borderWidth: 1,
    borderColor: '#1e3c25',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  codeSnippetBtnText: {
    color: '#22c55e',
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '700',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#000000',
  },
  bottomTabBar: {
    flexDirection: 'row',
    backgroundColor: '#050806',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    paddingVertical: 6,
    paddingHorizontal: 8,
    gap: 6,
  },
  bottomTabBarMobile: {
    paddingBottom: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 12,
    minHeight: 48,
    position: 'relative',
  },
  tabItemActive: {
    backgroundColor: '#0a140d',
  },
  tabItemPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.96 }],
  },
  tabIconBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tabIcon: {
    fontSize: 16,
    color: '#525252',
    fontWeight: '700',
  },
  tabIconActive: {
    color: '#22c55e',
  },
  badgeCount: {
    backgroundColor: '#0d1a10',
    borderWidth: 1,
    borderColor: '#1e3823',
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  badgeCountText: {
    fontSize: 9,
    fontFamily: 'monospace',
    color: '#22c55e',
    fontWeight: '700',
  },
  tabLabel: {
    fontSize: 10,
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
    width: 20,
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
  modalBox: {
    width: '100%',
    backgroundColor: '#080c09',
    borderWidth: 1,
    borderColor: '#22c55e',
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
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
    padding: 10,
  },
  codeSnippet: {
    color: '#22c55e',
    fontFamily: 'monospace',
    fontSize: 10,
    lineHeight: 16,
  },
  closeBtn: {
    backgroundColor: '#171717',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});
