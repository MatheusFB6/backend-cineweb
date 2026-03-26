import { IsInt, IsNotEmpty, IsISO8601 } from 'class-validator';

export class CreateSessoeDto {
  @IsISO8601()
  @IsNotEmpty()
  horarioExibicao: string;

  @IsInt()
  @IsNotEmpty()
  filmeId: number;

  @IsInt()
  @IsNotEmpty()
  salaId: number;

  @IsInt()
  @IsNotEmpty()
  cinemaId: number;
}
