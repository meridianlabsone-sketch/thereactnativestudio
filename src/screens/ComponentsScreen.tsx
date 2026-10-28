import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
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

const sampleImageUri =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="160" viewBox="0 0 300 160"><rect width="300" height="160" fill="%230c160f"/><circle cx="150" cy="80" r="45" fill="none" stroke="%2322c55e" stroke-width="4"/><circle cx="150" cy="80" r="18" fill="%2322c55e"/><path d="M70,80 Q150,20 230,80 Q150,140 70,80" fill="none" stroke="%23ffffff" stroke-width="2" stroke-dasharray="4,4"/><text x="150" y="145" font-family="monospace" font-size="11" fill="%2322c55e" text-anchor="middle" font-weight="bold">REACT NATIVE &lt;Image /&gt;</text></svg>';

export interface ComponentsScreenHandle {
  scrollToTop: () => void;
}

type ComponentCategory = 'all' | 'textinput' | 'view_text' | 'image' | 'pressable_ui';

export const ComponentsScreen = forwardRef<ComponentsScreenHandle>((_props, ref) => {
  const scrollViewRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    scrollToTop: () => {
      scrollViewRef.current?.scrollTo?.({ y: 0, animated: true });
    },
  }));

  // Quick navigation category filter
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory>('all');

  // 1. TextInput state (Echo)
  const [typedText, setTypedText] = useState('React Native Mobile');
  const [isSecure, setIsSecure] = useState(false);

  // 2. View flexbox state
  const [direction, setDirection] = useState<'row' | 'column'>('row');

  // 3. Text numberOfLines state
  const [lines, setLines] = useState<number | undefined>(1);

  // 4. Pressable touch counter
  const [pressCount, setPressCount] = useState(0);

  // 5. Button click counter
  const [btnClicks, setBtnClicks] = useState(0);

  // 6. Switch state
  const [switchState, setSwitchState] = useState(true);

  const shouldShow = (category: ComponentCategory) => {
    return selectedCategory === 'all' || selectedCategory === category;
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.introHeader}>
        <Text style={styles.badge}>BASIC COMPONENTS & UI</Text>
        <Text style={styles.mainTitle}>Componentes Básicos</Text>
        <Text style={styles.subtitle}>
          Os blocos de construção essenciais utilizados por quase todos os aplicativos React Native.
        </Text>
      </View>

      {/* Quick Category Navigation Pill Bar */}
      <View style={styles.quickNavContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.quickNavScroll}
        >
          <Pressable
            style={[styles.navPill, selectedCategory === 'all' && styles.navPillActive]}
            onPress={() => setSelectedCategory('all')}
          >
            <Text
              style={[
                styles.navPillText,
                selectedCategory === 'all' && styles.navPillTextActive,
              ]}
            >
              Todos (7)
            </Text>
          </Pressable>

          <Pressable
            style={[styles.navPill, selectedCategory === 'textinput' && styles.navPillActive]}
            onPress={() => setSelectedCategory('textinput')}
          >
            <Text
              style={[
                styles.navPillText,
                selectedCategory === 'textinput' && styles.navPillTextActive,
              ]}
            >
              TextInput
            </Text>
          </Pressable>

          <Pressable
            style={[styles.navPill, selectedCategory === 'view_text' && styles.navPillActive]}
            onPress={() => setSelectedCategory('view_text')}
          >
            <Text
              style={[
                styles.navPillText,
                selectedCategory === 'view_text' && styles.navPillTextActive,
              ]}
            >
              View & Text
            </Text>
          </Pressable>

          <Pressable
            style={[styles.navPill, selectedCategory === 'image' && styles.navPillActive]}
            onPress={() => setSelectedCategory('image')}
          >
            <Text
              style={[
                styles.navPillText,
                selectedCategory === 'image' && styles.navPillTextActive,
              ]}
            >
              Image
            </Text>
          </Pressable>

          <Pressable
            style={[styles.navPill, selectedCategory === 'pressable_ui' && styles.navPillActive]}
            onPress={() => setSelectedCategory('pressable_ui')}
          >
            <Text
              style={[
                styles.navPillText,
                selectedCategory === 'pressable_ui' && styles.navPillTextActive,
              ]}
            >
              Pressable & UI
            </Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* ========================================================================= */}
      {/* 1. TEXTINPUT (COM TEXTO EXIBIDO DEPOIS EM TEMPO REAL) */}
      {/* ========================================================================= */}
      {shouldShow('textinput') && (
        <View style={[styles.card, styles.cardHighlight]}>
          <View style={styles.tagRow}>
            <Text style={styles.tag}>&lt;TextInput /&gt;</Text>
            <Text style={styles.category}>Basic Component</Text>
          </View>

          <Text style={styles.desc}>
            A component for inputting text into the app via a keyboard.
          </Text>
          <Text style={styles.explainer}>
            Utiliza a prop <Text style={styles.bold}>onChangeText</Text> para capturar o que o usuário digita no teclado do celular.
          </Text>

          {/* Input box */}
          <View style={styles.inputContainer}>
            <View style={styles.inputLabelRow}>
              <Text style={styles.inputLabel}>DIGITE NO CAMPO:</Text>
              <Pressable onPress={() => setIsSecure(!isSecure)}>
                <Text style={styles.toggleText}>
                  {isSecure ? 'Mostrar Texto' : 'Ocultar (Senha)'}
                </Text>
              </Pressable>
            </View>

            <TextInput
              style={styles.textInput}
              value={typedText}
              onChangeText={setTypedText}
              placeholder="Digite algo aqui..."
              placeholderTextColor="#525252"
              secureTextEntry={isSecure}
            />
          </View>

          {/* O TEXTO É EXIBIDO AQUI DEPOIS EM TEMPO REAL */}
          <View style={styles.echoBox}>
            <View style={styles.echoHeader}>
              <Text style={styles.echoHeaderTitle}>⚡ TEXTO EXIBIDO DEPOIS:</Text>
              <Text style={styles.echoCharCount}>{typedText.length} caracteres</Text>
            </View>

            {typedText.trim().length > 0 ? (
              <Text style={styles.echoOutput}>
                &quot;<Text style={styles.echoHighlight}>{typedText}</Text>&quot;
              </Text>
            ) : (
              <Text style={styles.echoEmpty}>
                (Nenhum texto digitado. Escreva no TextInput acima!)
              </Text>
            )}

            <Text style={styles.codeSnippet}>
              &lt;Text&gt;&#123;typedText&#125;&lt;/Text&gt;
            </Text>
          </View>
        </View>
      )}

      {/* ========================================================================= */}
      {/* 2. VIEW */}
      {/* ========================================================================= */}
      {shouldShow('view_text') && (
        <View style={styles.card}>
          <View style={styles.tagRow}>
            <Text style={styles.tag}>&lt;View /&gt;</Text>
            <Text style={styles.category}>Basic Component</Text>
          </View>

          <Text style={styles.desc}>
            The most fundamental component for building a UI.
          </Text>
          <Text style={styles.explainer}>
            Um contêiner que suporta layout Flexbox, estilo, toques e acessibilidade. Por padrão, organiza seus filhos em coluna.
          </Text>

          <View style={styles.controlsRow}>
            <Text style={styles.controlLabel}>flexDirection:</Text>
            <Pressable
              style={[styles.smallBtn, direction === 'row' && styles.smallBtnActive]}
              onPress={() => setDirection('row')}
            >
              <Text style={[styles.smallBtnText, direction === 'row' && styles.smallBtnTextActive]}>
                row
              </Text>
            </Pressable>
            <Pressable
              style={[styles.smallBtn, direction === 'column' && styles.smallBtnActive]}
              onPress={() => setDirection('column')}
            >
              <Text style={[styles.smallBtnText, direction === 'column' && styles.smallBtnTextActive]}>
                column
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
      )}

      {/* ========================================================================= */}
      {/* 3. TEXT */}
      {/* ========================================================================= */}
      {shouldShow('view_text') && (
        <View style={styles.card}>
          <View style={styles.tagRow}>
            <Text style={styles.tag}>&lt;Text /&gt;</Text>
            <Text style={styles.category}>Basic Component</Text>
          </View>

          <Text style={styles.desc}>
            A component for displaying text.
          </Text>
          <Text style={styles.explainer}>
            Obrigatório para renderizar qualquer string. Suporta aninhamento, estilos tipográficos e truncamento com <Text style={styles.inlineCode}>numberOfLines</Text>.
          </Text>

          <View style={styles.controlsRow}>
            <Text style={styles.controlLabel}>numberOfLines:</Text>
            <Pressable
              style={[styles.smallBtn, lines === 1 && styles.smallBtnActive]}
              onPress={() => setLines(1)}
            >
              <Text style={[styles.smallBtnText, lines === 1 && styles.smallBtnTextActive]}>
                1 linha (reticências)
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
              No React Native, todo texto DEVE ser encapsulado por um elemento &lt;Text&gt;. Se você colocar uma string solta dentro de uma View, o aplicativo resultará em erro.
            </Text>
          </View>
        </View>
      )}

      {/* ========================================================================= */}
      {/* 4. IMAGE */}
      {/* ========================================================================= */}
      {shouldShow('image') && (
        <View style={styles.card}>
          <View style={styles.tagRow}>
            <Text style={styles.tag}>&lt;Image /&gt;</Text>
            <Text style={styles.category}>Basic Component</Text>
          </View>

          <Text style={styles.desc}>
            A component for displaying images.
          </Text>
          <Text style={styles.explainer}>
            Exibe imagens locais (via <Text style={styles.inlineCode}>require()</Text>) ou remotas via <Text style={styles.inlineCode}>source=&#123;&#123; uri: &#39;...&#39; &#125;&#125;</Text>.
          </Text>

          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: sampleImageUri }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
      )}

      {/* ========================================================================= */}
      {/* 5. PRESSABLE */}
      {/* ========================================================================= */}
      {shouldShow('pressable_ui') && (
        <View style={styles.card}>
          <View style={styles.tagRow}>
            <Text style={styles.tag}>&lt;Pressable /&gt;</Text>
            <Text style={styles.category}>Basic Component</Text>
          </View>

          <Text style={styles.desc}>
            A wrapper component that can detect various stages of press interactions on any of its children.
          </Text>
          <Text style={styles.explainer}>
            Detecta toques, cliques longos e fornece o estado <Text style={styles.inlineCode}>({'{ pressed }'})</Text> para estilização dinâmica.
          </Text>

          <View style={styles.pressableRow}>
            <Text style={styles.counterText}>Toques: {pressCount}</Text>
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
      )}

      {/* ========================================================================= */}
      {/* 6. BUTTON & SWITCH (USER INTERFACE) */}
      {/* ========================================================================= */}
      {shouldShow('pressable_ui') && (
        <View style={styles.card}>
          <View style={styles.tagRow}>
            <Text style={styles.tag}>&lt;Button /&gt; & &lt;Switch /&gt;</Text>
            <Text style={styles.category}>User Interface</Text>
          </View>

          <Text style={styles.desc}>
            Button: A basic button component for handling touches. Switch: Renders a boolean input.
          </Text>

          {/* Official React Native Button */}
          <View style={styles.uiItem}>
            <View style={styles.uiLabelRow}>
              <Text style={styles.uiTitle}>&lt;Button title=&quot;...&quot; /&gt;</Text>
              <Text style={styles.uiClicks}>{btnClicks} cliques</Text>
            </View>
            <Button
              title="Pressione o &lt;Button /&gt;"
              color="#22c55e"
              onPress={() => setBtnClicks((c) => c + 1)}
            />
          </View>

          {/* Switch */}
          <View style={styles.uiItem}>
            <View style={styles.switchRow}>
              <View>
                <Text style={styles.uiTitle}>&lt;Switch value=&#123;...&#125; /&gt;</Text>
                <Text style={styles.switchStateText}>
                  Estado: {switchState ? 'LIGADO (true)' : 'DESLIGADO (false)'}
                </Text>
              </View>
              <Switch
                value={switchState}
                onValueChange={setSwitchState}
                trackColor={{ false: '#262626', true: '#22c55e' }}
                thumbColor="#ffffff"
              />
            </View>
          </View>
        </View>
      )}

      {/* ========================================================================= */}
      {/* 7. SCROLLVIEW & STYLESHEET */}
      {/* ========================================================================= */}
      {shouldShow('all') && (
        <View style={styles.card}>
          <View style={styles.tagRow}>
            <Text style={styles.tag}>ScrollView & StyleSheet</Text>
            <Text style={styles.category}>Basic Components</Text>
          </View>

          <Text style={styles.desc}>
            ScrollView: Provides a scrolling container. StyleSheet: Provides an abstraction layer similar to CSS stylesheets.
          </Text>
          <Text style={styles.explainer}>
            Toda esta tela está encapsulada dentro de um <Text style={styles.bold}>&lt;ScrollView&gt;</Text> para permitir rolagem vertical, e todas as cores, bordas e alinhamentos são definidos com <Text style={styles.bold}>StyleSheet.create</Text>.
          </Text>

          <View style={styles.codeBlock}>
            <Text style={styles.codeLine}>const styles = StyleSheet.create(&#123;</Text>
            <Text style={styles.codeLine}>{'  '}card: &#123; backgroundColor: &#39;#000000&#39;, borderColor: &#39;#22c55e&#39; &#125;,</Text>
            <Text style={styles.codeLine}>&#125;);</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
});

ComponentsScreen.displayName = 'ComponentsScreen';

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 90,
    gap: 16,
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
  quickNavContainer: {
    marginVertical: 2,
  },
  quickNavScroll: {
    gap: 8,
    paddingVertical: 2,
  },
  navPill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#090e0b',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  navPillActive: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  navPillText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: 'monospace',
    color: '#737373',
  },
  navPillTextActive: {
    color: '#000000',
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#080c09',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  cardHighlight: {
    borderColor: 'rgba(34, 197, 94, 0.5)',
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
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#193420',
  },
  category: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#737373',
  },
  desc: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ffffff',
  },
  explainer: {
    fontSize: 12,
    color: '#a3a3a3',
    lineHeight: 18,
  },
  bold: {
    color: '#ffffff',
    fontWeight: '700',
  },
  inlineCode: {
    fontFamily: 'monospace',
    color: '#22c55e',
    fontSize: 11,
  },
  inputContainer: {
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
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#737373',
    fontWeight: '700',
  },
  toggleText: {
    fontSize: 10,
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
    paddingVertical: 8,
    fontSize: 14,
  },
  echoBox: {
    backgroundColor: '#0c160f',
    borderWidth: 1,
    borderColor: '#1b3822',
    borderRadius: 10,
    padding: 12,
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
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#22c55e',
  },
  echoCharCount: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#737373',
  },
  echoOutput: {
    fontSize: 18,
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
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#22c55e',
    marginTop: 2,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  controlLabel: {
    fontSize: 11,
    color: '#737373',
  },
  smallBtn: {
    backgroundColor: '#171717',
    paddingHorizontal: 8,
    paddingVertical: 4,
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
    minHeight: 60,
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 8,
  },
  box: {
    width: 36,
    height: 32,
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
    fontSize: 12,
  },
  boxTextLight: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 12,
  },
  textDemoBox: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: 10,
  },
  textDemo: {
    fontSize: 12,
    color: '#d4d4d4',
    lineHeight: 18,
  },
  imageWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  image: {
    width: '100%',
    height: 140,
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
    fontSize: 16,
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
    opacity: 0.7,
  },
  pressableBtnText: {
    color: '#000000',
    fontWeight: '700',
    fontSize: 12,
  },
  uiItem: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 10,
    padding: 12,
    gap: 8,
  },
  uiLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  uiTitle: {
    fontSize: 11,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#22c55e',
  },
  uiClicks: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#737373',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  switchStateText: {
    fontSize: 11,
    color: '#a3a3a3',
    marginTop: 2,
  },
  codeBlock: {
    backgroundColor: '#000000',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: 10,
  },
  codeLine: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#22c55e',
  },
});
