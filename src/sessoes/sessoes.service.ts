import { Injectable } from '@nestjs/common';
import { CreateSessoeDto } from './dto/create-sessoe.dto';
import { UpdateSessoeDto } from './dto/update-sessoe.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Sessao } from '@prisma/client';

@Injectable()
export class SessoesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSessoeDto: CreateSessoeDto): Promise<Sessao> {
    return await this.prisma.sessao.create({
      data: {
        horarioExibicao: new Date(createSessoeDto.horarioExibicao),
        filmeId: createSessoeDto.filmeId,
        salaId: createSessoeDto.salaId,
        cinemaId: createSessoeDto.cinemaId,
      },
    });
  }

  async findAll(): Promise<Sessao[]> {
    return await this.prisma.sessao.findMany({
      include: {
        filme: true,
        sala: true,
      },
    });
  }

  async findOne(id: number): Promise<Sessao | null> {
    return await this.prisma.sessao.findUnique({
      where: { id },
      include: {
        filme: true,
        sala: true,
      },
    });
  }

  async update(id: number, updateSessoeDto: UpdateSessoeDto): Promise<Sessao> {
    const { horarioExibicao, ...restoDosDados } = updateSessoeDto;

    return await this.prisma.sessao.update({
      where: { id },
      data: {
        ...restoDosDados,
        ...(horarioExibicao && { horarioExibicao: new Date(horarioExibicao) }),
      },
    });
  }

  async remove(id: number): Promise<Sessao> {
    return await this.prisma.sessao.delete({
      where: { id },
    });
  }
}
