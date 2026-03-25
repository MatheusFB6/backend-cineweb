import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CinemaService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCinemaDto: CreateCinemaDto) {
    return this.prisma.cinema.create({ data: createCinemaDto });
  }

  findAll() {
    return this.prisma.cinema.findMany({
      include: {
        listaFilmes: true,
        listaSalas: true,
        listaSessao: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.cinema.findUnique({
      where: { id },
      include: {
        listaFilmes: true,
        listaSalas: true,
        listaSessao: true,
      },
    });
  }

  update(id: number, updateCinemaDto: UpdateCinemaDto) {
    return this.prisma.cinema.update({
      where: { id },
      data: updateCinemaDto,
    });
  }

  remove(id: number) {
    return this.prisma.cinema.delete({ where: { id } });
  }

  // --- MÉTODOS SOLICITADOS NO PRD ---

  async cadastrarSala(cinemaId: number, salaData: any) {
    return this.prisma.sala.create({
      data: {
        ...salaData,
        cinemaId,
      },
    });
  }

  async removerSala(cinemaId: number, salaId: number) {
    // Valida se a sala pertence ao cinema antes de apagar
    const sala = await this.prisma.sala.findFirst({
      where: { id: salaId, cinemaId },
    });
    if (!sala) throw new NotFoundException('Sala não encontrada neste cinema');
    return this.prisma.sala.delete({ where: { id: salaId } });
  }

  async cadastrarFilme(cinemaId: number, filmeData: any) {
    return this.prisma.filme.create({
      data: {
        ...filmeData,
        cinemaId,
      },
    });
  }

  async removerFilme(cinemaId: number, filmeId: number) {
    const filme = await this.prisma.filme.findFirst({
      where: { id: filmeId, cinemaId },
    });
    if (!filme)
      throw new NotFoundException('filme não encontrado neste cinema');
    return this.prisma.filme.delete({ where: { id: filmeId } });
  }

  async cadastrarSessao(cinemaId: number, sessaoData: any) {
    return this.prisma.sessao.create({
      data: {
        ...sessaoData,
        cinemaId,
      },
    });
  }

  async removerSessao(cinemaId: number, sessaoId: number) {
    const sessao = await this.prisma.sessao.findFirst({
      where: { id: sessaoId, cinemaId },
    });
    if (!sessao)
      throw new NotFoundException('sessao não encontrada neste cinema');
    return this.prisma.sessao.delete({ where: { id: sessaoId } });
  }
}
