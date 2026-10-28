export type CrudCategory = 'Performance' | 'UI/UX' | 'Arquitetura' | 'Nativo';

export interface CrudItem {
  id: string;
  title: string;
  category: CrudCategory;
  description: string;
  imageUri: string;
  active: boolean;
  createdAt: string;
}

export const INITIAL_ITEMS: CrudItem[] = [
  {
    id: '1',
    title: 'Otimização com FlatList & keyExtractor',
    category: 'Performance',
    description: 'Recicla células fora da tela e reduz consumo de memória RAM a 60 FPS.',
    imageUri:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="%230c1810"/><circle cx="60" cy="60" r="32" fill="none" stroke="%2322c55e" stroke-width="4"/><path d="M42,60 L54,72 L78,48" fill="none" stroke="%2322c55e" stroke-width="5" stroke-linecap="round"/><text x="60" y="108" font-family="monospace" font-size="9" fill="%2322c55e" text-anchor="middle" font-weight="bold">FLATLIST</text></svg>',
    active: true,
    createdAt: 'Hoje',
  },
  {
    id: '2',
    title: 'TextInput Reativo com onChangeText',
    category: 'UI/UX',
    description: 'Captura dados do teclado móvel e propaga o estado instantaneamente sem re-renders residuais.',
    imageUri:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="%230c1810"/><rect x="25" y="38" width="70" height="44" rx="8" fill="none" stroke="%23ffffff" stroke-width="3"/><path d="M40,52 L80,52 M40,68 L65,68" stroke="%2322c55e" stroke-width="4" stroke-linecap="round"/><text x="60" y="108" font-family="monospace" font-size="9" fill="%2322c55e" text-anchor="middle" font-weight="bold">INPUT</text></svg>',
    active: true,
    createdAt: 'Hoje',
  },
  {
    id: '3',
    title: 'SectionList para Agrupamento Categórico',
    category: 'Arquitetura',
    description: 'Organiza coleções de dados com cabeçalhos fixos nativos de seções.',
    imageUri:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="%230c1810"/><rect x="28" y="30" width="64" height="16" rx="4" fill="%2322c55e"/><rect x="28" y="52" width="64" height="14" rx="4" fill="%231a281e"/><rect x="28" y="70" width="64" height="14" rx="4" fill="%231a281e"/><text x="60" y="108" font-family="monospace" font-size="9" fill="%2322c55e" text-anchor="middle" font-weight="bold">SECTIONS</text></svg>',
    active: true,
    createdAt: 'Ontem',
  },
  {
    id: '4',
    title: 'Controle Booleano com Switch & Button',
    category: 'Nativo',
    description: 'Componentes padrão de controle de usuário compilados para os widgets nativos do sistema.',
    imageUri:
      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" fill="%230c1810"/><rect x="30" y="44" width="60" height="32" rx="16" fill="%231a2c1f" stroke="%2322c55e" stroke-width="2"/><circle cx="74" cy="60" r="11" fill="%2322c55e"/><text x="60" y="108" font-family="monospace" font-size="9" fill="%2322c55e" text-anchor="middle" font-weight="bold">SWITCH</text></svg>',
    active: false,
    createdAt: 'Ontem',
  },
];
