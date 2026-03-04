import { Injectable } from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Filme } from '@prisma/client';

@Injectable()
export class FilmesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFilmeDto: CreateFilmeDto): Promise<Filme> {
    return await this.prisma.filme.create({
      data: createFilmeDto,
    });
  }

  async findAll(): Promise<Filme[]> {
    return await this.prisma.filme.findMany();
  }

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
