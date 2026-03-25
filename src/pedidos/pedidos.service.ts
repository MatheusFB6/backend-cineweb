import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Pedido } from '@prisma/client';

@Injectable()
export class PedidosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    return await this.prisma.pedido.create({
      data: {
        qtInteira: createPedidoDto.qtInteira,
        qtMeia: createPedidoDto.qtMeia,
        valorTotal: createPedidoDto.valorTotal,
      },
    });
  }

  async findAll(): Promise<Pedido[]> {
    return await this.prisma.pedido.findMany({
      include: {
        ingresso: true,
        lanche: true,
      },
    });
  }

  async findOne(id: number): Promise<Pedido | null> {
    return await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        ingresso: true,
        lanche: true,
      },
    });
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    return await this.prisma.pedido.update({
      where: { id },
      data: {
        qtInteira: updatePedidoDto.qtInteira,
        qtMeia: updatePedidoDto.qtMeia,
        valorTotal: updatePedidoDto.valorTotal,
      },
    });
  }

  async remove(id: number): Promise<Pedido> {
    await this.prisma.ingresso.deleteMany({ where: { pedidoId: id } });
    await this.prisma.lancheCombo.deleteMany({ where: { pedidoId: id } });

    return await this.prisma.pedido.delete({
      where: { id },
    });
  }

  // --- MÉTODOS SOLICITADOS NO PRD ---

  async adicionaLanche(pedidoId: number, lancheData: any) {
    return this.prisma.lancheCombo.create({
      data: {
        ...lancheData,
        pedidoId,
      },
    });
  }

  async removerLanche(pedidoId: number, lancheId: number) {
    const lanche = await this.prisma.lancheCombo.findFirst({
      where: { id: lancheId, pedidoId },
    });
    if (!lanche) throw new Error('Lanche não pertence a este pedido');
    return this.prisma.lancheCombo.delete({ where: { id: lancheId } });
  }

  async adicionarIngresso(pedidoId: number, ingressoData: any) {
    return this.prisma.ingresso.create({
      data: {
        ...ingressoData,
        pedidoId,
      },
    });
  }

  async removerIngresso(pedidoId: number, ingressoId: number) {
    const ingresso = await this.prisma.ingresso.findFirst({
      where: { id: ingressoId, pedidoId },
    });
    if (!ingresso) throw new Error('Ingresso não pertence a este pedido');
    return this.prisma.ingresso.delete({ where: { id: ingressoId } });
  }
}
