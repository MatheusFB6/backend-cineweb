export class CreateLanchDto {
  nome: string;
  descricao?: string;
  valorUnitario: number;
  qtUnidade: number;
  subtotal?: number;
}
