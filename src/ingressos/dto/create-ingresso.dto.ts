import { IsNumber, IsInt, IsOptional } from 'class-validator';

export class CreateIngressoDto {
  @IsNumber()
  valorInteira: number;

  @IsNumber()
  valorMeia: number;

  @IsInt()
  sessaoId: number;
}
