/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsInt,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'exemplo@cinema.pt' })
  @IsEmail({}, { message: 'Forneça um endereço de email válido' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'SenhaForte123!', minLength: 6 })
  @IsString()
  @MinLength(6, { message: 'A palavra-passe deve ter pelo menos 6 caracteres' })
  password: string;

  @ApiProperty({ example: 'Nome do Utilizador' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'ID do Perfil (UUID)' })
  @IsString()
  @IsNotEmpty()
  profileId: string;
}
