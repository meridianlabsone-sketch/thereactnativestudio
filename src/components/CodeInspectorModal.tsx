import React, { useState } from 'react';
import { Modal } from './native/Modal';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeInspectorModalProps {
  visible: boolean;
  onClose: () => void;
}

const sampleReactNativeCode = `import React, { useState, useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Switch,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function HighPerformanceScreen() {
  const [inputText, setInputText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Configurar Hermes Engine', completed: true },
    { id: '2', title: 'Otimizar TextInput com useCallback', completed: false },
  ]);
  const [isHighPerf, setIsHighPerf] = useState(true);
  const [loading, setLoading] = useState(false);

  // Callback memoizado para evitar recriação de função em cada render
  const handleTextChange = useCallback((text: string) => {
    setInputText(text);
  }, []);

  // Adicionar item
  const handleAddItem = useCallback(() => {
    if (!inputText.trim()) return;
    setTasks((prev) => [
      { id: Date.now().toString(), title: inputText.trim(), completed: false },
      ...prev,
    ]);
    setInputText('');
  }, [inputText]);

  // keyExtractor memoizado
  const keyExtractor = useCallback((item: Task) => item.id, []);

  // renderItem memoizado
  const renderItem = useCallback(
    ({ item }: { item: Task }) => (
      <View style={styles.card}>
        <Text style={styles.cardText}>{item.title}</Text>
        <Text style={styles.cardStatus}>
          {item.completed ? 'CONCLUÍDO' : 'PENDENTE'}
        </Text>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#070908" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>VORTEX NATIVE</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Turbo Mode</Text>
          <Switch
            value={isHighPerf}
            onValueChange={setIsHighPerf}
            trackColor={{ false: '#1c2720', true: '#22c55e' }}
            thumbColor="#ffffff"
          />
        </View>
      </View>

      {/* Input de Alta Performance */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={handleTextChange}
          placeholder="Digite o título da tarefa..."
          placeholderTextColor="#737373"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.8 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
          ]}
          onPress={handleAddItem}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </Pressable>
      </View>

      {/* FlatList Virtualizada */}
      <FlatList
        data={tasks}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070908',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#162219',
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    color: '#a3a3a3',
    fontSize: 12,
  },
  inputContainer: {
    padding: 20,
    flexDirection: 'row',
    gap: 10,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#0a0f0c',
    borderWidth: 1,
    borderColor: '#1f2d22',
    borderRadius: 12,
    paddingHorizontal: 16,
    color: '#ffffff',
    fontSize: 14,
  },
  button: {
    height: 48,
    paddingHorizontal: 20,
    backgroundColor: '#22c55e',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  card: {
    backgroundColor: '#0c120e',
    borderWidth: 1,
    borderColor: '#18241b',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  cardStatus: {
    color: '#22c55e',
    fontSize: 11,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
});
`;

export const CodeInspectorModal: React.FC<CodeInspectorModalProps> = ({ visible, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleReactNativeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      title="Código-Fonte React Native (TypeScript)"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Terminal className="w-4 h-4 text-[#22c55e]" />
            <span>HighPerformanceScreen.tsx</span>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 bg-[#142017] hover:bg-[#1a2b1f] border border-[#22c55e]/30 text-[#22c55e] text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Código</span>
              </>
            )}
          </button>
        </div>

        {/* Code display */}
        <div className="bg-[#050705] border border-[#142017] rounded-xl p-4 max-h-[60vh] overflow-y-auto font-mono text-xs text-neutral-300">
          <pre className="leading-relaxed">
            <code>{sampleReactNativeCode}</code>
          </pre>
        </div>
      </div>
    </Modal>
  );
};
