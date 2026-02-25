import { Injectable } from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { PrismaService } from '../prisma/prisma.service';
// Importamos o tipo Filme diretamente do Prisma Client
import { Filme } from '@prisma/client'; 

@Injectable()
export class FilmesService {
  constructor(private readonly prisma: PrismaService) {}

  // Tipamos o retorno explicitamente como Promise<Filme>
  async create(createFilmeDto: CreateFilmeDto): Promise<Filme> {
    return await this.prisma.filme.create({
      data: createFilmeDto,
    });
  }

  // Tipamos o retorno como um array de Filmes: Promise<Filme[]>
  async findAll(): Promise<Filme[]> {
    return await this.prisma.filme.findMany();
  }

  // O findOne pode retornar um Filme ou nulo (se não encontrar)
  async findOne(id: number): Promise<Filme | null> {
    return await this.prisma.filme.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateFilmeDto: UpdateFilmeDto): Promise<Filme> {
    return await this.prisma.filme.update({
      where: { id },
      data: updateFilmeDto,
    });
  }

  async remove(id: number): Promise<Filme> {
    return await this.prisma.filme.delete({
      where: { id },
    });
  }
}
