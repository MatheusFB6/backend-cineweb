import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // O @Global faz com que o PrismaService fique disponível em todo o projeto sem precisar importá-lo toda vez.
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
