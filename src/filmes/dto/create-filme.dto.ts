import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsInt,
  IsISO8601,
} from 'class-validator';
import { Genero } from '@prisma/client';

export class CreateFilmeDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsOptional()
  sinopse?: string;

  @IsString()
  @IsOptional()
  classificacao?: string;

  @IsISO8601()
  duracao: string;

  @IsString()
  @IsOptional()
  elenco?: string;

  @IsEnum(Genero)
  @IsOptional()
  genero?: Genero;

  @IsISO8601()
  @IsOptional()
  dataInicioExibicao?: string;

  @IsISO8601()
  @IsOptional()
  dataFinalExibicao?: string;

  @IsInt()
  cinemaId: number;
}
