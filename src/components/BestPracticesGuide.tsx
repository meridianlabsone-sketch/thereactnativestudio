import React from 'react';
import { Cpu, Zap, ListOrdered, Palette } from 'lucide-react';

export const BestPracticesGuide: React.FC = () => {
  const practices = [
    {
      number: '01',
      title: 'Memoização com React.memo e useCallback',
      icon: <Cpu className="w-5 h-5 text-[#22c55e]" />,
      summary:
        'Evite re-renderizações em cascata quando o usuário digita em um TextInput.',
      detail:
        'Encapsule componentes de linha e entradas em React.memo. Ao passar callbacks (como onChangeText ou onPress), use useCallback com listas de dependências estáveis para evitar que funções inline forcem uma reavaliação de toda a árvore.',
      codeSnippet: `const handleText = useCallback((text: string) => {
  setValue(text);
}, []); // Função estável entre renders`,
    },
    {
      number: '02',
      title: 'FlatList com keyExtractor e getItemLayout',
      icon: <ListOrdered className="w-5 h-5 text-[#22c55e]" />,
      summary:
        'Elimine cálculos dinâmicos de layout e mantenha rolagem com 60 FPS garantidos.',
      detail:
        'Sempre forneça uma chave estática com keyExtractor (evite o índice numérico cru se a lista puder ser reordenada). Se os itens tiverem altura fixa, use getItemLayout para que a FlatList calcule as posições instantaneamente sem medições assíncronas.',
      codeSnippet: `getItemLayout={(data, index) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
})}`,
    },
    {
      number: '03',
      title: 'Animações com useNativeDriver: true',
      icon: <Zap className="w-5 h-5 text-[#22c55e]" />,
      summary:
        'Transfira as atualizações de animação diretamente para a thread de UI nativa.',
      detail:
        'Nunca anime propriedades que alteram a geometria do layout (como width, height, margin) em frames contínuos. Anime transform e opacity com useNativeDriver: true, permitindo que a animação continue suave mesmo durante picos na thread JS.',
      codeSnippet: `Animated.timing(fadeAnim, {
  toValue: 1,
  duration: 200,
  useNativeDriver: true, // Thread nativa de UI
}).start();`,
    },
    {
      number: '04',
      title: 'Estilos Centralizados com StyleSheet.create',
      icon: <Palette className="w-5 h-5 text-[#22c55e]" />,
      summary:
        'Envie definições de estilo uma única vez pela ponte nativa.',
      detail:
        'Criar objetos de estilo literais dentro do JSX (<View style={{ padding: 10 }}>) aloca um novo objeto a cada ciclo de render. Utilizar StyleSheet.create registra os identificadores estáticos de ID uma única vez no motor de layout Yoga.',
      codeSnippet: `const styles = StyleSheet.create({
  container: {
    backgroundColor: '#070908',
    padding: 16,
  },
});`,
    },
  ];

  return (
    <section id="best-practices" className="py-16 md:py-24 border-b border-[#141e17] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-semibold text-[#22c55e] uppercase tracking-wider mb-2">
            Engenharia de Performance
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Melhores Práticas para Alta Performance
          </h2>
          <p className="text-sm text-neutral-400 mt-2 max-w-2xl">
            Padrões técnicos recomendados pelas equipes de engenharia do React Native para garantir latência nula, menor consumo de bateria e resposta fluida.
          </p>
        </div>

        {/* 2x2 Grid of Best Practice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practices.map((item) => (
            <div
              key={item.number}
              className="bg-[#090d0a] border border-[#17231b] rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-[#223628] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#0f1711] border border-[#1a281e] flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <span className="font-mono text-sm font-bold text-[#22c55e] tabular-nums">
                      {item.number}.
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">React Native Core</span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-white mb-2 tracking-tight">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm font-medium text-neutral-300 mb-2 leading-relaxed">
                  {item.summary}
                </p>

                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  {item.detail}
                </p>
              </div>

              {/* Code Snippet */}
              <div className="bg-[#050705] p-3 rounded-xl border border-[#131d16] font-mono text-xs text-neutral-300 overflow-x-auto">
                <pre className="text-[11px] leading-relaxed text-neutral-300">
                  {item.codeSnippet}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
