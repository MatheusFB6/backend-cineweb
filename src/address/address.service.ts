import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AddressService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAddressDto: CreateAddressDto) {
    const { userId, ...addressData } = createAddressDto;
    return this.prisma.address.create({
      data: {
        ...addressData,
        userId: userId,
      },
    });
  }

  findAll() {
    return this.prisma.address.findMany();
  }

  findOne(id: string) {
    return this.prisma.address.findUnique({ where: { id } });
  }

  update(id: string, updateAddressDto: UpdateAddressDto) {
    const { userId, ...addressData } = updateAddressDto;
    return this.prisma.address.update({
      where: { id },
      data: {
        ...addressData,
        ...(userId !== undefined && { userId: userId }),
      },
    });
  }

  remove(id: string) {
    return this.prisma.address.delete({ where: { id } });
  }
}
