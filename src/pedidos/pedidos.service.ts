import { Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Pedido, Prisma } from '@prisma/client';

const USER_SELECT = { id: true, name: true, email: true };
const PEDIDO_INCLUDE = {
  user: { select: USER_SELECT },
};

@Injectable()
export class PedidosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const data = {
      qtInteira: createPedidoDto.qtInteira,
      qtMeia: createPedidoDto.qtMeia,
      valorTotal: createPedidoDto.valorTotal,
      userId: createPedidoDto.userId ?? null,
      lanchesInfo: createPedidoDto.lanchesInfo
        ? (createPedidoDto.lanchesInfo as Prisma.InputJsonValue)
        : Prisma.JsonNull,
      ingressosInfo: createPedidoDto.ingressosInfo
        ? (createPedidoDto.ingressosInfo as Prisma.InputJsonValue)
        : Prisma.JsonNull,
    };
    return await this.prisma.pedido.create({ data, include: PEDIDO_INCLUDE });
  }

  async findAll() {
    return await this.prisma.pedido.findMany({
      include: PEDIDO_INCLUDE,
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    return await this.prisma.pedido.findUnique({
      where: { id },
      include: PEDIDO_INCLUDE,
    });
  }

  async findByUser(userId: string) {
    return await this.prisma.pedido.findMany({
      where: { userId },
      include: PEDIDO_INCLUDE,
      orderBy: { id: 'desc' },
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
    return await this.prisma.pedido.delete({ where: { id } });
  }
}
