/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProfileDto {
  @ApiProperty({ description: 'Nome do perfil', example: 'CLIENTE' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
