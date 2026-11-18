
export type TDisponivelFilter = 'todos' | 'true' | 'false';
export type TStatusFilter = 'todos' | 'ativa' | 'finalizada';

export const FILTER_OPTIONS: Array<{ label: string, value: TDisponivelFilter }> = [
  { label: 'Todos', value: 'todos' },
  { label: 'Disponíveis', value: 'true' },
  { label: 'Indisponíveis', value: 'false' },
];

export const RENTAL_FILTER_OPTIONS: Array<{ label: string, value: TStatusFilter }> = [
  { label: 'Todos', value: 'todos' },
  { label: 'Ativos', value: 'ativa' },
  { label: 'Finalizados', value: 'finalizada' },
];
