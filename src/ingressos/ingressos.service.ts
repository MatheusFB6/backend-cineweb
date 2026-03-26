import { Injectable } from '@nestjs/common';
import { CreateIngressoDto } from './dto/create-ingresso.dto';
import { UpdateIngressoDto } from './dto/update-ingresso.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Ingresso } from '@prisma/client';

@Injectable()
export class IngressosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createIngressoDto: CreateIngressoDto): Promise<Ingresso> {
    return await this.prisma.ingresso.create({
      data: createIngressoDto,
    });
  }

  async findAll(sessaoId?: number): Promise<Ingresso[]> {
    if (sessaoId) {
      return await this.prisma.ingresso.findMany({
        where: { sessaoId },
        include: { sessao: true },
      });
    }

    return await this.prisma.ingresso.findMany({
      include: { sessao: true },
    });
  }

  async findOne(id: number): Promise<Ingresso | null> {
    return await this.prisma.ingresso.findUnique({
      where: { id },
      include: { sessao: true },
    });
  }

  async update(
    id: number,
    updateIngressoDto: UpdateIngressoDto,
  ): Promise<Ingresso> {
    return await this.prisma.ingresso.update({
      where: { id },
      data: updateIngressoDto,
    });
  }

  async remove(id: number): Promise<Ingresso> {
    return await this.prisma.ingresso.delete({
      where: { id },
    });
  }
}
