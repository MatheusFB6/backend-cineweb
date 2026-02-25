import { Module } from '@nestjs/common';
import { LanchesService } from './lanches.service';
import { LanchesController } from './lanches.controller';

@Module({
  controllers: [LanchesController],
  providers: [LanchesService],
})
export class LanchesModule {}
