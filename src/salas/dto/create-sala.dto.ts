export class CreateSalaDto {
  numero: number;
  capacidade: number;
  poltronas?: any; // Represents int[][] JSON array
  cinemaId: number;
}
