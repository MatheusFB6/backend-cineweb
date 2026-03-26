import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSalaDto {
  @IsInt()
  @IsNotEmpty()
  numero: number;

  @IsInt()
  @IsNotEmpty()
  capacidade: number;

  @IsOptional()
  poltronas?: number[][];

  @IsInt()
  @IsNotEmpty()
  cinemaId: number;
}
