import { Genero } from '@prisma/client';

export class CreateFilmeDto {
  titulo: string;
  sinopse?: string;
  classificacao?: string;
  duracao: Date;
  elenco?: string;
  genero?: Genero;
  dataInicioExibicao?: Date;
  dataFinalExibicao?: Date;
  cinemaId: number;
}
