export class IngressoPedidoDto {
  tipo: string;
  valor: number;
  sessaoId: number;
}

export class LanchePedidoDto {
  id: number;
  qtUnidade: number;
  subtotal: number;
}

export class CreatePedidoDto {
  qtInteira: number;
  qtMeia: number;
  valorTotal: number;
  ingressos?: IngressoPedidoDto[];
  lanches?: LanchePedidoDto[];
}
