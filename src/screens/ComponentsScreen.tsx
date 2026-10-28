import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  Button,
  Switch,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { CrudCategory, CrudItem } from '../types/crud';

interface ComponentsScreenProps {
  onCreateItem: (item: Omit<CrudItem, 'id' | 'createdAt'>) => void;
  onNavigateToList: () => void;
}

const sampleImageUri =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 300 150"><rect width="300" height="150" fill="%230c160f"/><circle cx="150" cy="75" r="42" fill="none" stroke="%2322c55e" stroke-width="4"/><circle cx="150" cy="75" r="16" fill="%2322c55e"/><path d="M75,75 Q150,15 225,75 Q150,135 75,75" fill="none" stroke="%23ffffff" stroke-width="2" stroke-dasharray="4,4"/><text x="150" y="138" font-family="monospace" font-size="11" fill="%2322c55e" text-anchor="middle" font-weight="bold">REACT NATIVE &lt;Image /&gt;</text></svg>';

export const ComponentsScreen: React.FC<ComponentsScreenProps> = ({
  onCreateItem,
  onNavigateToList,
}) => {
  // CRUD Create form state
  const [formTitle, setFormTitle] = useState('Novo Componente Reativo');
  const [formDesc, setFormDesc] = useState('Criado sem backend, persistido em memória.');
  const [formCategory, setFormCategory] = useState<CrudCategory>('Performance');
  const [formActive, setFormActive] = useState(true);
  const [isSecure, setIsSecure] = useState(false);
  const [showCreatedFeedback, setShowCreatedFeedback] = useState(false);

  // View flexbox demo state
  const [direction, setDirection] = useState<'row' | 'column'>('row');

  // Text numberOfLines demo state
  const [lines, setLines] = useState<number | undefined>(1);

  // Pressable touch counter
  const [pressCount, setPressCount] = useState(0);

  const handleCreate = () => {
    if (!formTitle.trim()) return;

    onCreateItem({
      title: formTitle.trim(),
      description: formDesc.trim() || 'Sem descrição.',
      category: formCategory,
      active: formActive,
      imageUri: sampleImageUri,
    });

    setShowCreatedFeedback(true);
    setTimeout(() => setShowCreatedFeedback(false), 2500);
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={true}
    >
      {/* Intro Header */}
      <View style={styles.introHeader}>
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>CRUD EM MEMÓRIA · REACT NATIVE</Text>
          <Text style={styles.badgeSub}>SEM BACKEND</Text>
        </View>
        <Text style={styles.mainTitle}>Cadastrar Registro</Text>
        <Text style={styles.subtitle}>
          Utilize os componentes nativos abaixo para alimentar a lista em tempo real. Cada elemento é explicado e interativo.
        </Text>
      </View>

      {/* ========================================================================= */}
      {/* 1. FORMULÁRIO DE CADASTRO DO CRUD (CREATE) COM TEXTINPUT E LIVE ECHO */}
      {/* ========================================================================= */}
      <View style={[styles.card, styles.cardHighlight]}>
        <View style={styles.tagRow}>
          <Text style={styles.tag}>&lt;TextInput /&gt; · [CREATE]</Text>
          <Text style={styles.categoryBadge}>Entrada de Dados</Text>
        </View>

        <Text style={styles.cardHeading}>Formulário CRUD</Text>
        <Text style={styles.explainer}>
          Preencha os campos para inserir um novo registro no estado do app. O React Native usa a prop <Text style={styles.bold}>onChangeText</Text> para atualizar os dados diretamente.
        </Text>

        {/* Input 1: Título com exibição em tempo real */}
        <View style={styles.inputBox}>
          <View style={styles.inputLabelRow}>
            <Text style={styles.inputLabel}>TÍTULO DO REGISTRO:</Text>
            <Pressable onPress={() => setIsSecure(!isSecure)}>
              <Text style={styles.toggleText}>
                {isSecure ? '👁 Exibir' : '🔒 Ocultar (Senha)'}
              </Text>
            </Pressable>
          </View>

          <TextInput
            style={styles.textInput}
            value={formTitle}
            onChangeText={setFormTitle}
            placeholder="Digite o título do registro..."
            placeholderTextColor="#525252"
            secureTextEntry={isSecure}
          />
        </View>

        {/* ============================================================ */}
        {/* TEXTO EXIBIDO DEPOIS EM TEMPO REAL (SOLICITADO PELO USUÁRIO) */}
        {/* ============================================================ */}
        <View style={styles.echoBox}>
          <View style={styles.echoHeader}>
            <Text style={styles.echoHeaderTitle}>⚡ TEXTO EXIBIDO EM TEMPO REAL:</Text>
            <Text style={styles.echoCharCount}>{formTitle.length} caracteres</Text>
          </View>

          {formTitle.trim().length > 0 ? (
            <Text style={styles.echoOutput}>
              &quot;<Text style={styles.echoHighlight}>{formTitle}</Text>&quot;
            </Text>
          ) : (
            <Text style={styles.echoEmpty}>
              (Campo vazio. Digite no TextInput acima para ver a renderização instantânea!)
            </Text>
          )}

          <Text style={styles.codeSnippet}>
            &lt;Text&gt;Texto: &#123;formTitle&#125;&lt;/Text&gt;
          </Text>
        </View>

        {/* Input 2: Descrição */}
        <View style={styles.inputBox}>
          <Text style={styles.inputLabel}>DESCRIÇÃO:</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={formDesc}
            onChangeText={setFormDesc}
            placeholder="Descreva este item do CRUD..."
            placeholderTextColor="#525252"
            multiline={true}
            numberOfLines={2}
          />
        </View>

        {/* Categoria Selector */}
        <View style={styles.categoryPicker}>
          <Text style={styles.inputLabel}>CATEGORIA (SECTIONLIST):</Text>
          <View style={styles.categoryRow}>
            {(['Performance', 'UI/UX', 'Arquitetura', 'Nativo'] as CrudCategory[]).map(
              (cat) => (
                <Pressable
                  key={cat}
                  style={[
                    styles.catBtn,
                    formCategory === cat && styles.catBtnActive,
                  ]}
                  onPress={() => setFormCategory(cat)}
                >
                  <Text
                    style={[
                      styles.catBtnText,
                      formCategory === cat && styles.catBtnTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </Pressable>
              )
            )}
          </View>
        </View>

        {/* Switch Status */}
        <View style={styles.switchRow}>
          <View>
            <Text style={styles.switchTitle}>&lt;Switch /&gt; Status Inicial</Text>
            <Text style={styles.switchDesc}>
              {formActive ? 'ATIVO (Verde no CRUD)' : 'INATIVO (Pendente)'}
            </Text>
          </View>
          <Switch
            value={formActive}
            onValueChange={setFormActive}
            trackColor={{ false: '#262626', true: '#22c55e' }}
            thumbColor="#ffffff"
          />
        </View>

        {/* Action Button: Criar */}
        <View style={styles.actionRow}>
          <View style={styles.btnWrap}>
            <Button
              title="+ Adicionar Registro ao CRUD"
              color="#22c55e"
              onPress={handleCreate}
            />
          </View>

          <Pressable style={styles.viewListBtn} onPress={onNavigateToList}>
            <Text style={styles.viewListBtnText}>Ir para Lista →</Text>
          </Pressable>
        </View>

        {/* Feedback visual */}
        {showCreatedFeedback && (
          <View style={styles.feedbackToast}>
            <Text style={styles.feedbackToastText}>
              ✓ Item adicionado com sucesso ao CRUD em memória!
            </Text>
          </View>
        )}
      </View>

      {/* ========================================================================= */}
      {/* 2. COMPONENTES BÁSICOS EXPLICADOS DIDATICAMENTE */}
      {/* ========================================================================= */}
      
      {/* View & Flexbox */}
      <View style={styles.card}>
        <View style={styles.tagRow}>
          <Text style={styles.tag}>&lt;View /&gt;</Text>
          <Text style={styles.categoryBadge}>Basic Component</Text>
        </View>
        <Text style={styles.cardHeading}>The most fundamental component for building a UI</Text>
        <Text style={styles.explainer}>
          Equivalente à &lt;div&gt; da web. No React Native, ela é responsável por empilhar e organizar os elementos na tela. Possui <Text style={styles.inlineCode}>flexDirection: &#39;column&#39;</Text> por padrão.
        </Text>

        <View style={styles.controlsRow}>
          <Text style={styles.controlLabel}>flexDirection:</Text>
          <Pressable
            style={[styles.smallBtn, direction === 'row' && styles.smallBtnActive]}
            onPress={() => setDirection('row')}
          >
            <Text style={[styles.smallBtnText, direction === 'row' && styles.smallBtnTextActive]}>
              row (linha)
            </Text>
          </Pressable>
          <Pressable
            style={[styles.smallBtn, direction === 'column' && styles.smallBtnActive]}
            onPress={() => setDirection('column')}
          >
            <Text style={[styles.smallBtnText, direction === 'column' && styles.smallBtnTextActive]}>
              column (coluna)
            </Text>
          </Pressable>
        </View>

        <View style={[styles.viewDemo, { flexDirection: direction }]}>
          <View style={[styles.box, styles.boxGreen]}>
            <Text style={styles.boxTextDark}>1</Text>
          </View>
          <View style={[styles.box, styles.boxWhite]}>
            <Text style={styles.boxTextDark}>2</Text>
          </View>
          <View style={[styles.box, styles.boxDark]}>
            <Text style={styles.boxTextLight}>3</Text>
          </View>
        </View>
      </View>

      {/* Text & Truncation */}
      <View style={styles.card}>
        <View style={styles.tagRow}>
          <Text style={styles.tag}>&lt;Text /&gt;</Text>
          <Text style={styles.categoryBadge}>Basic Component</Text>
        </View>
        <Text style={styles.cardHeading}>A component for displaying text</Text>
        <Text style={styles.explainer}>
          No React Native, todo texto DEVE estar dentro de uma tag &lt;Text&gt;. Suporta truncamento automático com reticências através da propriedade <Text style={styles.inlineCode}>numberOfLines</Text>.
        </Text>

        <View style={styles.controlsRow}>
          <Text style={styles.controlLabel}>numberOfLines:</Text>
          <Pressable
            style={[styles.smallBtn, lines === 1 && styles.smallBtnActive]}
            onPress={() => setLines(1)}
          >
            <Text style={[styles.smallBtnText, lines === 1 && styles.smallBtnTextActive]}>
              1 linha (truncado)
            </Text>
          </Pressable>
          <Pressable
            style={[styles.smallBtn, lines === undefined && styles.smallBtnActive]}
            onPress={() => setLines(undefined)}
          >
            <Text style={[styles.smallBtnText, lines === undefined && styles.smallBtnTextActive]}>
              Completo
            </Text>
          </Pressable>
        </View>

        <View style={styles.textDemoBox}>
          <Text numberOfLines={lines} style={styles.textDemo}>
            O React Native compila a tag &lt;Text&gt; diretamente para os componentes nativos dos sistemas operacionais móveis: TextView no Android e UILabel no iOS.
          </Text>
        </View>
      </View>

      {/* Image */}
      <View style={styles.card}>
        <View style={styles.tagRow}>
          <Text style={styles.tag}>&lt;Image /&gt;</Text>
          <Text style={styles.categoryBadge}>Basic Component</Text>
        </View>
        <Text style={styles.cardHeading}>A component for displaying images</Text>
        <Text style={styles.explainer}>
          Exibe imagens locais ou remotas via <Text style={styles.inlineCode}>source=&#123;&#123; uri: &#39;...&#39; &#125;&#125;</Text>. Cada item do nosso CRUD inclui um thumbnail renderizado com esta tag.
        </Text>

        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: sampleImageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Pressable */}
      <View style={styles.card}>
        <View style={styles.tagRow}>
          <Text style={styles.tag}>&lt;Pressable /&gt;</Text>
          <Text style={styles.categoryBadge}>Basic Component</Text>
        </View>
        <Text style={styles.cardHeading}>
          A wrapper component that can detect various stages of press interactions
        </Text>
        <Text style={styles.explainer}>
          Componente de toque moderno que substitui o TouchableOpacity, fornecendo estados dinâmicos <Text style={styles.inlineCode}>({'{ pressed }'})</Text>.
        </Text>

        <View style={styles.pressableRow}>
          <Text style={styles.counterText}>Cliques: {pressCount}</Text>
          <Pressable
            style={({ pressed }: { pressed: boolean }) => [
              styles.pressableBtn,
              pressed && styles.pressableBtnPressed,
            ]}
            onPress={() => setPressCount((c) => c + 1)}
          >
            <Text style={styles.pressableBtnText}>Tocar no Pressable</Text>
          </Pressable>
        </View>
      </View>

      {/* StyleSheet & ScrollView */}
      <View style={styles.card}>
        <View style={styles.tagRow}>
          <Text style={styles.tag}>ScrollView & StyleSheet</Text>
          <Text style={styles.categoryBadge}>Basic Components</Text>
        </View>
        <Text style={styles.cardHeading}>ScrollView & StyleSheet.create</Text>
        <Text style={styles.explainer}>
          Esta tela inteira utiliza o <Text style={styles.bold}>&lt;ScrollView&gt;</Text> para permitir rolagem fluida e confortável com a roda do mouse e toques de tela. Todos os estilos são 100% nativos.
        </Text>

        <View style={styles.codeSnippetCard}>
          <Text style={styles.codeText}>
            const styles = StyleSheet.create(&#123; card: &#123; backgroundColor: &#39;#000000&#39; &#125; &#125;);
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
    gap: 18,
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
    gap: 8,
  },
  badge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#22c55e',
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  badgeSub: {
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
  card: {
    backgroundColor: '#080c09',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 18,
    gap: 12,
  },
  cardHighlight: {
    borderColor: 'rgba(34, 197, 94, 0.45)',
    backgroundColor: '#08100a',
  },
  tagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    fontSize: 13,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#22c55e',
    backgroundColor: '#0d1a10',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#193420',
  },
  categoryBadge: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#737373',
  },
  cardHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  explainer: {
    fontSize: 13,
    color: '#a3a3a3',
    lineHeight: 19,
  },
  bold: {
    color: '#ffffff',
    fontWeight: '700',
  },
  inlineCode: {
    fontFamily: 'monospace',
    color: '#22c55e',
    fontSize: 12,
  },
  inputBox: {
    backgroundColor: '#0a0f0c',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 12,
    gap: 6,
  },
  inputLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  inputLabel: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#737373',
    fontWeight: '700',
  },
  toggleText: {
    fontSize: 11,
    color: '#22c55e',
    fontWeight: '600',
  },
  textInput: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: '#22c55e',
    borderRadius: 8,
    color: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  textArea: {
    minHeight: 56,
  },
  echoBox: {
    backgroundColor: '#0c160f',
    borderWidth: 1,
    borderColor: '#1b3822',
    borderRadius: 10,
    padding: 14,
    gap: 6,
  },
  echoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
    paddingBottom: 4,
  },
  echoHeaderTitle: {
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#22c55e',
  },
  echoCharCount: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#737373',
  },
  echoOutput: {
    fontSize: 19,
    fontWeight: '700',
    fontFamily: 'monospace',
    color: '#ffffff',
    paddingVertical: 4,
  },
  echoHighlight: {
    color: '#22c55e',
  },
  echoEmpty: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#525252',
    paddingVertical: 4,
  },
  codeSnippet: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#22c55e',
    marginTop: 2,
  },
  categoryPicker: {
    gap: 6,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  catBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#0d130e',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  catBtnActive: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  catBtnText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#a3a3a3',
    fontWeight: '600',
  },
  catBtnTextActive: {
    color: '#000000',
    fontWeight: '800',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0a0e0b',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 10,
    padding: 12,
  },
  switchTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
  },
  switchDesc: {
    fontSize: 11,
    color: '#22c55e',
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
    marginTop: 4,
  },
  btnWrap: {
    flex: 1,
    minWidth: 180,
  },
  viewListBtn: {
    backgroundColor: '#0a0e0b',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
  },
  viewListBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  feedbackToast: {
    backgroundColor: '#0c1a10',
    borderWidth: 1,
    borderColor: '#22c55e',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  feedbackToastText: {
    color: '#22c55e',
    fontSize: 12,
    fontWeight: '700',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  controlLabel: {
    fontSize: 12,
    color: '#737373',
  },
  smallBtn: {
    backgroundColor: '#171717',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  smallBtnActive: {
    backgroundColor: '#22c55e',
  },
  smallBtnText: {
    fontSize: 11,
    color: '#a3a3a3',
    fontWeight: '600',
  },
  smallBtnTextActive: {
    color: '#000000',
    fontWeight: '700',
  },
  viewDemo: {
    minHeight: 68,
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 10,
    padding: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 8,
  },
  box: {
    width: 42,
    height: 36,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxGreen: {
    backgroundColor: '#22c55e',
  },
  boxWhite: {
    backgroundColor: '#ffffff',
  },
  boxDark: {
    backgroundColor: '#262626',
  },
  boxTextDark: {
    color: '#000000',
    fontWeight: '800',
    fontSize: 13,
  },
  boxTextLight: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 13,
  },
  textDemoBox: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 10,
    padding: 12,
  },
  textDemo: {
    fontSize: 13,
    color: '#d4d4d4',
    lineHeight: 20,
  },
  imageWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#0a0f0c',
  },
  pressableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  counterText: {
    fontSize: 17,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#22c55e',
  },
  pressableBtn: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  pressableBtnPressed: {
    opacity: 0.75,
  },
  pressableBtnText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 13,
  },
  codeSnippetCard: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: 12,
  },
  codeText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#22c55e',
  },
});
