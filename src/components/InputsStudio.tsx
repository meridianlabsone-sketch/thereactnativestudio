import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, TextInput, Pressable, Switch, ActivityIndicator } from './native';
import {
  User,
  AtSign,
  Mail,
  Lock,
  DollarSign,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Sliders,
  Copy,
  Check,
} from 'lucide-react';

interface FormState {
  fullName: string;
  username: string;
  email: string;
  secretKey: string;
  budget: string;
  notes: string;
  turboMemo: boolean;
  hapticTouch: boolean;
  realtimeSync: boolean;
  optimizationLevel: 'essencial' | 'balanceado' | 'extremo';
}

const initialFormState: FormState = {
  fullName: 'Lucas Oliveira',
  username: 'lucas.native',
  email: 'lucas@vortex.dev',
  secretKey: 'vtx_secret_9981',
  budget: '12500',
  notes: 'Otimização de FlatList com memoização em cada célula para garantir rolagem fluida a 60fps.',
  turboMemo: true,
  hapticTouch: true,
  realtimeSync: false,
  optimizationLevel: 'balanceado',
};

export const InputsStudio: React.FC = () => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [copiedState, setCopiedState] = useState(false);

  // Email validation memoized
  const emailError = useMemo(() => {
    if (!formData.email) return 'E-mail é obrigatório';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Digite um formato de e-mail válido (ex: nome@dominio.com)';
    }
    return '';
  }, [formData.email]);

  // Username validation memoized
  const usernameError = useMemo(() => {
    if (!formData.username) return 'Identificador é obrigatório';
    if (formData.username.length < 3) return 'Mínimo de 3 caracteres';
    if (/[^a-zA-Z0-9._]/.test(formData.username)) {
      return 'Apenas letras, números, ponto e sublinhado';
    }
    return '';
  }, [formData.username]);

  // Password strength memoized
  const passwordStrength = useMemo(() => {
    const len = formData.secretKey.length;
    if (len === 0) return { label: 'Vazia', color: 'text-neutral-500', score: 0 };
    if (len < 6) return { label: 'Fraca', color: 'text-red-400', score: 1 };
    if (len < 10) return { label: 'Média', color: 'text-yellow-400', score: 2 };
    return { label: 'Forte & Criptografada', color: 'text-[#22c55e]', score: 3 };
  }, [formData.secretKey]);

  // Memoized update handler to prevent re-renders
  const handleUpdate = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 450);
  }, []);

  const handleReset = useCallback(() => {
    setFormData(initialFormState);
  }, []);

  const handleCopyJSON = useCallback(() => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  }, [formData]);

  return (
    <section id="inputs-studio" className="py-16 md:py-24 border-b border-[#141e17] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs font-semibold text-[#22c55e] uppercase tracking-wider mb-2">
              Primitivas Nativas
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Studio de Inputs & Controles
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Campos interativos utilizando o contrato <code className="text-[#22c55e] font-mono">TextInput</code> do React Native, com controle de estado atômico, formatação e validações.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Pressable
              onPress={handleReset}
              className="px-3.5 py-2 bg-[#0e1410] border border-[#1b281f] text-neutral-300 hover:text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Padrões</span>
            </Pressable>
          </div>
        </div>

        {/* 2-Column Split: Form Controls vs Live Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: The Interactive Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#090d0a] border border-[#17231b] rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#152018]">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#22c55e]" />
                <h3 className="text-base font-semibold text-white">Configuração de Perfil & Runtime</h3>
              </div>
              <span className="text-xs font-mono text-neutral-400">Contrato RN Puro</span>
            </div>

            {/* Input 1: Nome Completo */}
            <TextInput
              label="Nome do Desenvolvedor"
              value={formData.fullName}
              onChangeText={(text) => handleUpdate('fullName', text)}
              placeholder="Digite seu nome completo"
              leftIcon={<User className="w-4 h-4" />}
              clearButtonMode="while-editing"
              helperText="Utiliza onChangeText com callbacks memoizados via useCallback."
            />

            {/* Input 2 & 3: Username & Email in a 2-col row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <TextInput
                label="Identificador do Perfil"
                value={formData.username}
                onChangeText={(text) => handleUpdate('username', text.toLowerCase())}
                placeholder="usuario.app"
                leftIcon={<AtSign className="w-4 h-4" />}
                errorText={usernameError}
                clearButtonMode="while-editing"
              />

              <TextInput
                label="E-mail de Notificação"
                value={formData.email}
                onChangeText={(text) => handleUpdate('email', text)}
                placeholder="desenvolvedor@empresa.com"
                keyboardType="email-address"
                leftIcon={<Mail className="w-4 h-4" />}
                errorText={emailError}
                clearButtonMode="while-editing"
              />
            </div>

            {/* Input 4 & 5: Password & Numeric Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <TextInput
                  label="Chave Secreta de API"
                  value={formData.secretKey}
                  onChangeText={(text) => handleUpdate('secretKey', text)}
                  placeholder="Insira a credencial"
                  secureTextEntry={true}
                  leftIcon={<Lock className="w-4 h-4" />}
                />
                <div className="flex items-center justify-between text-[11px] px-1 mt-0.5">
                  <span className="text-neutral-500">Força da credencial:</span>
                  <span className={`font-semibold ${passwordStrength.color}`}>
                    {passwordStrength.label}
                  </span>
                </div>
              </div>

              <TextInput
                label="Meta de Render (Ciclos / Min)"
                value={formData.budget}
                onChangeText={(text) => handleUpdate('budget', text.replace(/[^0-9]/g, ''))}
                placeholder="10000"
                keyboardType="numeric"
                leftIcon={<DollarSign className="w-4 h-4" />}
                helperText="Filtra apenas caracteres numéricos no callback."
              />
            </div>

            {/* Input 6: Multiline TextInput (Bio/Notes) */}
            <TextInput
              label="Diretrizes de Arquitetura & Otimização"
              value={formData.notes}
              onChangeText={(text) => handleUpdate('notes', text)}
              placeholder="Descreva as técnicas de alta performance adotadas..."
              multiline={true}
              numberOfLines={3}
              maxLength={220}
              helperText="Componente nativo multiline com cálculo estático de altura."
            />

            {/* Input 7: Optimization Level (Segmented Control) */}
            <div className="flex flex-col gap-2 pt-2">
              <label className="text-xs font-medium text-neutral-300">
                Nível de Otimização de Render
              </label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-[#060806] border border-[#162219] rounded-xl">
                {(['essencial', 'balanceado', 'extremo'] as const).map((level) => {
                  const isActive = formData.optimizationLevel === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => handleUpdate('optimizationLevel', level)}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg capitalize transition-all select-none ${
                        isActive
                          ? 'bg-[#22c55e] text-black shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                          : 'text-neutral-400 hover:text-white hover:bg-[#101812]'
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input 8: Switches Strip */}
            <div className="flex flex-col gap-3 pt-3 border-t border-[#152018]">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#070b08] border border-[#141f17]">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">
                    Turbo Memoization (`React.memo`)
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Evita re-renderizações desnecessárias em elementos filhos.
                  </span>
                </div>
                <Switch
                  value={formData.turboMemo}
                  onValueChange={(val) => handleUpdate('turboMemo', val)}
                  accessibilityLabel="Ativar Turbo Memoization"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#070b08] border border-[#141f17]">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-white">
                    Feedback Háptico Tátil
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Simula sensação de toque físico em botões Pressable.
                  </span>
                </div>
                <Switch
                  value={formData.hapticTouch}
                  onValueChange={(val) => handleUpdate('hapticTouch', val)}
                  accessibilityLabel="Ativar Feedback Háptico"
                />
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <Pressable
                onPress={handleSubmit}
                disabled={isSubmitting || !!emailError || !!usernameError}
                className="w-full py-3.5 bg-[#22c55e] hover:bg-[#16a34a] text-black font-semibold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.25)] flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <ActivityIndicator size="small" color="#000000" />
                    <span>Processando Estado...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Salvar Estado de Inputs</span>
                  </>
                )}
              </Pressable>
            </div>

            {/* Toast feedback */}
            {showToast && (
              <div className="p-3 bg-[#0d1e12] border border-[#22c55e]/50 rounded-xl flex items-center gap-2 text-xs text-[#22c55e] animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Estado sincronizado com sucesso no contrato React Native.</span>
              </div>
            )}
          </div>

          {/* Column 2: Live React Native State Inspector (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-[#090d0a] border border-[#17231b] rounded-2xl p-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#152018] mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#22c55e]" />
                  <h3 className="text-base font-semibold text-white">Inspetor de Estado em Tempo Real</h3>
                </div>
                <button
                  type="button"
                  onClick={handleCopyJSON}
                  aria-label="Copiar JSON do estado"
                  className="px-2.5 py-1 bg-[#101812] hover:bg-[#18251b] border border-[#1b2b20] text-xs font-medium text-neutral-300 hover:text-white rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedState ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                      <span className="text-[#22c55e]">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar JSON</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
                Cada tecla digitada nos inputs acima atualiza o estado centralizado com complexidade computacional mínima e zero vazamento de memória.
              </p>

              {/* Formatted Code Block */}
              <div className="bg-[#050705] border border-[#142017] rounded-xl p-4 font-mono text-xs text-neutral-300 overflow-x-auto">
                <div className="flex items-center justify-between text-[11px] text-neutral-500 pb-2 border-b border-[#121c15] mb-3">
                  <span>form_state.json</span>
                  <span className="text-[#22c55e]">60 FPS · Pure State</span>
                </div>
                <pre className="text-neutral-300 leading-relaxed">
                  <span className="text-[#22c55e]">&#123;</span>
                  {'\n  '}&quot;<span className="text-white">fullName</span>&quot;: &quot;
                  <span className="text-[#86efac]">{formData.fullName}</span>&quot;,
                  {'\n  '}&quot;<span className="text-white">username</span>&quot;: &quot;
                  <span className="text-[#86efac]">@{formData.username}</span>&quot;,
                  {'\n  '}&quot;<span className="text-white">email</span>&quot;: &quot;
                  <span className="text-[#86efac]">{formData.email}</span>&quot;,
                  {'\n  '}&quot;<span className="text-white">secretKey</span>&quot;: &quot;
                  <span className="text-neutral-500">{'*'.repeat(formData.secretKey.length)}</span>&quot;,
                  {'\n  '}&quot;<span className="text-white">budget</span>&quot;: {Number(formData.budget) || 0},
                  {'\n  '}&quot;<span className="text-white">turboMemo</span>&quot;: <span className={formData.turboMemo ? "text-[#22c55e]" : "text-neutral-500"}>{String(formData.turboMemo)}</span>,
                  {'\n  '}&quot;<span className="text-white">hapticTouch</span>&quot;: <span className={formData.hapticTouch ? "text-[#22c55e]" : "text-neutral-500"}>{String(formData.hapticTouch)}</span>,
                  {'\n  '}&quot;<span className="text-white">optimization</span>&quot;: &quot;<span className="text-white">{formData.optimizationLevel}</span>&quot;
                  {'\n'}<span className="text-[#22c55e]">&#125;</span>
                </pre>
              </div>
            </div>

            {/* Quick Best Practice Callout */}
            <div className="bg-[#090d0a] border border-[#17231b] rounded-2xl p-6">
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                <span>Dica de Performance para Inputs</span>
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed mb-3">
                No React Native, passar callbacks instanciados inline (como <code className="text-neutral-300 font-mono text-[11px] bg-[#121c15] px-1 py-0.5 rounded">{'onChangeText={(t) => setVal(t)}'}</code>) força o componente a recriar a função a cada ciclo de render.
              </p>
              <div className="bg-[#050705] p-3 rounded-lg border border-[#142017] font-mono text-[11px] text-neutral-300">
                <span className="text-[#22c55e]">// Recomendado:</span>
                <br />
                {'const handleText = useCallback((t) => { ... }, []);'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
