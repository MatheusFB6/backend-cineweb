export class CreateLanchDto {
  nome: string;
  descricao?: string;
  valorUnitario: number;
  quantidade: number;
  subtotal?: number;
  pedidoId?: number;
}
