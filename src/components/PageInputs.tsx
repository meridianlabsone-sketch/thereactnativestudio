import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Pressable, Switch, ActivityIndicator, Modal } from './native';
import {
  Type,
  Layout,
  MousePointerClick,
  ToggleLeft,
  Loader2,
  Maximize2,
  Sparkles,
  Info,
} from 'lucide-react';

export const PageInputs: React.FC = () => {
  // 1. TextInput state (the key user request!)
  const [liveText, setLiveText] = useState('React Native é incrível!');
  const [isPasswordMode, setIsPasswordMode] = useState(false);

  // 2. View flexbox state
  const [flexDirection, setFlexDirection] = useState<'row' | 'col'>('row');
  const [justifyContent, setJustifyContent] = useState<'start' | 'center' | 'between'>('between');

  // 3. Text numberOfLines state
  const [numberOfLines, setNumberOfLines] = useState<number | undefined>(1);

  // 4. Pressable touch counter
  const [touchCount, setTouchCount] = useState(0);

  // 5. Switch toggle state
  const [switchState, setSwitchState] = useState(true);

  // 6. ActivityIndicator state
  const [spinnerSize, setSpinnerSize] = useState<'small' | 'large'>('small');
  const [isSpinning, setIsSpinning] = useState(true);

  // 7. Modal state
  const [modalOpen, setModalOpen] = useState(false);

  const wordCount = liveText.trim() ? liveText.trim().split(/\s+/).length : 0;

  return (
    <div className="max-w-3xl mx-auto py-10 sm:py-16 px-4 space-y-12">
      {/* Page Title */}
      <div className="border-b border-white/[0.08] pb-8">
        <div className="text-[11px] font-mono font-semibold text-[#22c55e] uppercase tracking-wider mb-2">
          Trabalho Acadêmico / Documentação Interativa
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <span>Componentes do React Native</span>
          <span className="text-[#22c55e]">.</span>
        </h1>
        <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
          Cada bloco abaixo explica o papel fundamental do componente no ecossistema mobile, seu funcionamento técnico e uma demonstração interativa prática.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* 1. TEXTINPUT (DESTAQUE PRINCIPAL: DIGITAÇÃO E EXIBIÇÃO EM TEMPO REAL) */}
      {/* ========================================================================= */}
      <section className="bg-[#050705] border border-[#22c55e]/30 rounded-2xl p-6 sm:p-8 relative shadow-[0_0_30px_rgba(34,197,94,0.06)]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#22c55e] mb-3">
          <Type className="w-4 h-4" />
          <span className="font-bold">&lt;TextInput /&gt;</span>
          <span className="text-neutral-500">· Entrada de Dados do Usuário</span>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">
          O que o TextInput faz?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
          É o componente essencial para que o usuário insira textos via teclado do celular. Ao contrário da web que usa <code className="text-[#22c55e] font-mono">onChange</code> com <code className="text-neutral-400 font-mono">e.target.value</code>, no React Native utiliza-se <strong className="text-white">onChangeText</strong>, que entrega a string digitada diretamente para a função de estado.
        </p>

        {/* Interactive Controls */}
        <div className="space-y-4 bg-[#090d0a] border border-white/[0.08] rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-neutral-300">
              Teste interativo: digite qualquer texto abaixo
            </span>
            <button
              type="button"
              onClick={() => setIsPasswordMode(!isPasswordMode)}
              className="text-[11px] font-mono text-neutral-400 hover:text-[#22c55e] transition-colors cursor-pointer"
            >
              Modo Senha ({isPasswordMode ? 'Ligado' : 'Desligado'})
            </button>
          </div>

          <TextInput
            value={liveText}
            onChangeText={setLiveText}
            placeholder="Digite algo aqui para ver o texto aparecer abaixo..."
            secureTextEntry={isPasswordMode}
            clearButtonMode="while-editing"
          />
        </div>

        {/* LIVE DISPLAY BOX (O QUE O USUÁRIO DIGITA MOSTRA AQUI) */}
        <div className="bg-[#0c120e] border border-[#22c55e]/40 rounded-xl p-5">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 pb-2 border-b border-white/[0.08] mb-3">
            <span className="flex items-center gap-1.5 text-[#22c55e] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Texto capturado pelo onChangeText:
            </span>
            <span className="tabular-nums">
              {liveText.length} caracteres · {wordCount} palavras
            </span>
          </div>

          {liveText.trim().length > 0 ? (
            <div className="py-2">
              <p className="text-lg sm:text-xl font-mono font-bold text-white break-words">
                &quot;<span className="text-[#22c55e]">{liveText}</span>&quot;
              </p>
            </div>
          ) : (
            <p className="text-xs font-mono text-neutral-500 italic py-2">
              (O campo está vazio. Digite algo no TextInput acima para ver a mágica do estado reativo!)
            </p>
          )}

          {/* Quick Code Reference */}
          <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-neutral-400 overflow-x-auto">
            <span className="text-[#22c55e]">&lt;TextInput</span>
            <span className="text-white"> value=&#123;texto&#125;</span>
            <span className="text-[#22c55e]"> onChangeText=&#123;setTexto&#125;</span>
            <span className="text-[#22c55e]"> /&gt;</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. VIEW (ESTRUTURA E FLEXBOX) */}
      {/* ========================================================================= */}
      <section className="bg-[#050705] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-mono text-[#22c55e] mb-3">
          <Layout className="w-4 h-4" />
          <span className="font-bold">&lt;View /&gt;</span>
          <span className="text-neutral-500">· Contêiner Estrutural Base</span>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">
          O que a View faz?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5">
          É o equivalente à <code className="text-white font-mono">&lt;div&gt;</code> do HTML. No React Native, ela serve para agrupar outros elementos e estruturar layouts. <strong className="text-white">Diferença crucial para a web:</strong> a View tem <code className="text-[#22c55e] font-mono">flexDirection: &#39;column&#39;</code> por padrão (empilha verticalmente), enquanto a web usa linha.
        </p>

        {/* Live Flexbox Demo */}
        <div className="bg-[#090d0a] border border-white/[0.08] rounded-xl p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">flexDirection:</span>
              <button
                type="button"
                onClick={() => setFlexDirection('row')}
                className={`px-2.5 py-1 rounded text-xs font-mono cursor-pointer ${
                  flexDirection === 'row' ? 'bg-[#22c55e] text-black font-bold' : 'bg-neutral-800 text-neutral-300'
                }`}
              >
                row (linha)
              </button>
              <button
                type="button"
                onClick={() => setFlexDirection('col')}
                className={`px-2.5 py-1 rounded text-xs font-mono cursor-pointer ${
                  flexDirection === 'col' ? 'bg-[#22c55e] text-black font-bold' : 'bg-neutral-800 text-neutral-300'
                }`}
              >
                column (coluna)
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-neutral-400">justifyContent:</span>
              <button
                type="button"
                onClick={() => setJustifyContent('center')}
                className={`px-2 py-1 rounded text-xs font-mono cursor-pointer ${
                  justifyContent === 'center' ? 'bg-[#22c55e] text-black font-bold' : 'bg-neutral-800 text-neutral-300'
                }`}
              >
                center
              </button>
              <button
                type="button"
                onClick={() => setJustifyContent('between')}
                className={`px-2 py-1 rounded text-xs font-mono cursor-pointer ${
                  justifyContent === 'between' ? 'bg-[#22c55e] text-black font-bold' : 'bg-neutral-800 text-neutral-300'
                }`}
              >
                space-between
              </button>
            </div>
          </div>

          {/* Visual Container */}
          <div
            className={`min-h-[100px] p-4 bg-[#050705] border border-dashed border-white/20 rounded-lg flex ${
              flexDirection === 'row' ? 'flex-row' : 'flex-col'
            } ${
              justifyContent === 'center'
                ? 'justify-center items-center'
                : justifyContent === 'between'
                ? 'justify-between items-center'
                : 'justify-start items-center'
            } gap-3 transition-all`}
          >
            <div className="w-12 h-10 rounded bg-[#22c55e] text-black font-mono font-bold flex items-center justify-center text-xs">
              Item 1
            </div>
            <div className="w-12 h-10 rounded bg-white text-black font-mono font-bold flex items-center justify-center text-xs">
              Item 2
            </div>
            <div className="w-12 h-10 rounded bg-neutral-800 text-white font-mono font-bold flex items-center justify-center text-xs">
              Item 3
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TEXT (TIPOGRAFIA OBRIGATÓRIA) */}
      {/* ========================================================================= */}
      <section className="bg-[#050705] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-mono text-[#22c55e] mb-3">
          <Type className="w-4 h-4" />
          <span className="font-bold">&lt;Text /&gt;</span>
          <span className="text-neutral-500">· Exibição de Texto Nativo</span>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">
          O que o Text faz?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5">
          No React Native, <strong className="text-white">todo texto DEVE estar dentro de um &lt;Text&gt;</strong>, caso contrário o app falhará em tempo de execução. Ele suporta a propriedade <code className="text-[#22c55e] font-mono">numberOfLines</code> para truncar textos longos de forma limpa.
        </p>

        {/* Live Truncation Demo */}
        <div className="bg-[#090d0a] border border-white/[0.08] rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-400">numberOfLines:</span>
            <button
              type="button"
              onClick={() => setNumberOfLines(1)}
              className={`px-2.5 py-1 rounded text-xs font-mono cursor-pointer ${
                numberOfLines === 1 ? 'bg-[#22c55e] text-black font-bold' : 'bg-neutral-800 text-neutral-300'
              }`}
            >
              1 linha (com reticências)
            </button>
            <button
              type="button"
              onClick={() => setNumberOfLines(undefined)}
              className={`px-2.5 py-1 rounded text-xs font-mono cursor-pointer ${
                numberOfLines === undefined ? 'bg-[#22c55e] text-black font-bold' : 'bg-neutral-800 text-neutral-300'
              }`}
            >
              Todas as linhas
            </button>
          </div>

          <div className="p-3 bg-[#050705] border border-white/10 rounded-lg">
            <Text numberOfLines={numberOfLines} className="text-xs sm:text-sm text-neutral-300">
              O React Native compila para componentes nativos do iOS (UILabel/UITextView) e Android (TextView). Por isso, não aceita textos soltos na raiz como acontece nos navegadores comuns da web.
            </Text>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PRESSABLE (BOTÃO E INTERAÇÃO TÁTIL) */}
      {/* ========================================================================= */}
      <section className="bg-[#050705] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-mono text-[#22c55e] mb-3">
          <MousePointerClick className="w-4 h-4" />
          <span className="font-bold">&lt;Pressable /&gt;</span>
          <span className="text-neutral-500">· Toque e Cliques Nativos</span>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">
          O que o Pressable faz?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5">
          É a API moderna para botões e detecção de toques no celular, substituindo o antigo <code className="text-neutral-400 font-mono">TouchableOpacity</code>. Ele expõe a função <code className="text-[#22c55e] font-mono">({'{ pressed }'})</code> para mudar estilos instantaneamente quando o dedo toca a tela.
        </p>

        {/* Live Touch Demo */}
        <div className="bg-[#090d0a] border border-white/[0.08] rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-xs text-neutral-400">Total de toques registrados:</p>
            <p className="text-2xl font-mono font-bold text-[#22c55e] tabular-nums">
              {touchCount} cliques
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Pressable
              onPress={() => setTouchCount((c) => c + 1)}
              className="flex-1 sm:flex-none px-6 py-3 bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold text-xs tracking-wider uppercase rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all cursor-pointer"
            >
              Tocar no Pressable
            </Pressable>

            <button
              type="button"
              onClick={() => setTouchCount(0)}
              className="px-3 py-3 bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white text-xs font-mono rounded-xl cursor-pointer"
            >
              Zerar
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SWITCH & ACTIVITYINDICATOR (CONTROLES DE ESTADO) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Switch Card */}
        <div className="bg-[#050705] border border-white/[0.08] rounded-2xl p-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#22c55e] mb-3">
            <ToggleLeft className="w-4 h-4" />
            <span className="font-bold">&lt;Switch /&gt;</span>
          </div>
          <h3 className="text-base font-bold text-white mb-1">
            Interruptor Booleano
          </h3>
          <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
            Renderiza o alternador de ligar/desligar nativo do iOS ou Android usando as propriedades <code className="text-[#22c55e] font-mono">value</code> e <code className="text-[#22c55e] font-mono">onValueChange</code>.
          </p>

          <div className="bg-[#090d0a] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-300">
              Status: <strong className={switchState ? 'text-[#22c55e]' : 'text-neutral-500'}>{switchState ? 'LIGADO' : 'DESLIGADO'}</strong>
            </span>
            <Switch
              value={switchState}
              onValueChange={setSwitchState}
              accessibilityLabel="Alternar Switch"
            />
          </div>
        </div>

        {/* ActivityIndicator Card */}
        <div className="bg-[#050705] border border-white/[0.08] rounded-2xl p-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#22c55e] mb-3">
            <Loader2 className="w-4 h-4" />
            <span className="font-bold">&lt;ActivityIndicator /&gt;</span>
          </div>
          <h3 className="text-base font-bold text-white mb-1">
            Loading / Spinner Nativo
          </h3>
          <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
            Exibe o spinner circular de carregamento enquanto dados assíncronos ou telas estão sendo processados.
          </p>

          <div className="bg-[#090d0a] border border-white/[0.08] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ActivityIndicator
                animating={isSpinning}
                size={spinnerSize}
                color="#22c55e"
              />
              <span className="text-xs font-mono text-neutral-400">
                {isSpinning ? 'Carregando...' : 'Pausado'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsSpinning(!isSpinning)}
              className="px-2.5 py-1 text-xs font-mono bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white rounded cursor-pointer"
            >
              {isSpinning ? 'Parar' : 'Girar'}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. MODAL (SOBREPOSIÇÃO) */}
      {/* ========================================================================= */}
      <section className="bg-[#050705] border border-white/[0.08] rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 text-xs font-mono text-[#22c55e] mb-3">
          <Maximize2 className="w-4 h-4" />
          <span className="font-bold">&lt;Modal /&gt;</span>
          <span className="text-neutral-500">· Janela de Sobreposição</span>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">
          O que o Modal faz?
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5">
          Apresenta uma janela que cobre a tela inteira com foco prioritário. Controlado declarativamente via <code className="text-[#22c55e] font-mono">visible=&#123;true&#125;</code> e fechado com <code className="text-[#22c55e] font-mono">onRequestClose</code>.
        </p>

        <Pressable
          onPress={() => setModalOpen(true)}
          className="w-full py-3 bg-[#090d0a] hover:bg-[#101712] border border-white/10 text-white font-medium text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <span>Abrir Demonstração do &lt;Modal /&gt;</span>
        </Pressable>

        <Modal
          visible={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          title="Componente <Modal /> Nativo"
        >
          <div className="space-y-4">
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Você abriu um modal declarativo do React Native! Ele sobrepõe a visualização atual, bloqueia o scroll de fundo e pode conter formulários, alertas e seletores.
            </p>
            <div className="p-3 bg-[#050705] border border-white/10 rounded-lg text-xs font-mono text-neutral-400">
              <span className="text-[#22c55e]">&lt;Modal visible=&#123;true&#125; animationType=&quot;slide&quot;&gt;</span>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-[#22c55e] text-black font-semibold text-xs rounded-lg cursor-pointer hover:bg-[#16a34a] transition-colors"
              >
                Entendi, Fechar
              </button>
            </div>
          </div>
        </Modal>
      </section>
    </div>
  );
};
