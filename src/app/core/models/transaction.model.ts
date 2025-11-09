export interface Transaction {
  id?: string;
  tipo: 'entrada' | 'saida';
  descricao: string;
  conta: string;
  valor: number;
  data: string;
  status?: 'pendente' | 'pago';
}
