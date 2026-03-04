import { Injectable } from '@nestjs/common';
import { CreateLanchDto } from './dto/create-lanch.dto';
import { UpdateLanchDto } from './dto/update-lanch.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Lanche } from '@prisma/client';

@Injectable()
export class LanchesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLanchDto: CreateLanchDto): Promise<Lanche> {
    return await this.prisma.lanche.create({
      data: createLanchDto,
    });
  }

  async findAll(): Promise<Lanche[]> {
    return await this.prisma.lanche.findMany();
  }

  async findOne(id: number): Promise<Lanche | null> {
    return await this.prisma.lanche.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateLanchDto: UpdateLanchDto): Promise<Lanche> {
    return await this.prisma.lanche.update({
      where: { id },
      data: updateLanchDto,
    });
  }

  async remove(id: number): Promise<Lanche> {
    return await this.prisma.lanche.delete({
      where: { id },
    });
  }
}
