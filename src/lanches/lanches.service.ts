import { Injectable } from '@nestjs/common';
import { CreateLanchDto } from './dto/create-lanch.dto';
import { UpdateLanchDto } from './dto/update-lanch.dto';
import { PrismaService } from '../prisma/prisma.service';
import { LancheCombo } from '@prisma/client';

@Injectable()
export class LanchesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLanchDto: CreateLanchDto): Promise<LancheCombo> {
    return await this.prisma.lancheCombo.create({
      data: {
        nome: createLanchDto.nome,
        descricao: createLanchDto.descricao,
        valorUnitario: createLanchDto.valorUnitario,
        quantidade: createLanchDto.quantidade,
        subtotal: createLanchDto.subtotal ?? 0,
        pedidoId: createLanchDto.pedidoId,
      },
    });
  }

  async findAll(): Promise<LancheCombo[]> {
    return await this.prisma.lancheCombo.findMany();
  }

  async findOne(id: number): Promise<LancheCombo | null> {
    return await this.prisma.lancheCombo.findUnique({
      where: { id },
    });
  }

  async update(
    id: number,
    updateLanchDto: UpdateLanchDto,
  ): Promise<LancheCombo> {
    return await this.prisma.lancheCombo.update({
      where: { id },
      data: { ...updateLanchDto },
    });
  }

  async remove(id: number): Promise<LancheCombo> {
    return await this.prisma.lancheCombo.delete({
      where: { id },
    });
  }
}
