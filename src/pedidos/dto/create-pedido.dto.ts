import { IsInt, IsNumber, IsString, IsOptional, IsArray } from 'class-validator';

export class CreatePedidoDto {
  @IsInt()
  qtInteira: number;

  @IsInt()
  qtMeia: number;

  @IsNumber()
  valorTotal: number;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsOptional()
  @IsArray()
  lanchesInfo?: any[];

  @IsOptional()
  @IsArray()
  ingressosInfo?: any[];
}
