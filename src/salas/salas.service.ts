import { Injectable } from '@nestjs/common';
import { CreateSalaDto } from './dto/create-sala.dto';
import { UpdateSalaDto } from './dto/update-sala.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Sala } from '@prisma/client';

@Injectable()
export class SalasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSalaDto: CreateSalaDto): Promise<Sala> {
    return await this.prisma.sala.create({
      data: createSalaDto,
    });
  }

  async findAll(): Promise<Sala[]> {
    return await this.prisma.sala.findMany();
  }

  async findOne(id: number): Promise<Sala | null> {
    return await this.prisma.sala.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateSalaDto: UpdateSalaDto): Promise<Sala> {
    return await this.prisma.sala.update({
      where: { id },
      data: updateSalaDto,
    });
  }

  async remove(id: number): Promise<Sala> {
    return await this.prisma.sala.delete({
      where: { id },
    });
  }
}
