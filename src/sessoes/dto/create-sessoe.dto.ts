export class CreateSessoeDto {
  dataHora: string | Date; // O Frontend geralmente envia como string ISO
  filmeId: number;
  salaId: number;
}
