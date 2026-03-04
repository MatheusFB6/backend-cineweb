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

        ingressos: {
          create:
            createPedidoDto.ingressos?.map((ingresso) => ({
              tipo: ingresso.tipo,
              valor: ingresso.valor,
              sessaoId: ingresso.sessaoId,
            })) || [],
        },

        lanches: {
          create:
            createPedidoDto.lanches?.map((lanche) => ({
              lancheId: lanche.id,
              quantidade: lanche.qtUnidade,
              subtotal: lanche.subtotal,
            })) || [],
        },
      },
      include: {
        ingressos: true,
        lanches: true,
      },
    });
  }

  async findAll(): Promise<Pedido[]> {
    return await this.prisma.pedido.findMany({
      include: {
        ingressos: true,
        lanches: {
          include: { lanche: true },
        },
      },
    });
  }

  async findOne(id: number): Promise<Pedido | null> {
    return await this.prisma.pedido.findUnique({
      where: { id },
      include: {
        ingressos: true,
        lanches: {
          include: { lanche: true },
        },
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
    await this.prisma.pedidoLanche.deleteMany({ where: { pedidoId: id } });

    return await this.prisma.pedido.delete({
      where: { id },
    });
  }
}
