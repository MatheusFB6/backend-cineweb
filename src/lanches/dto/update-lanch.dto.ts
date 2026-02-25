import { PartialType } from '@nestjs/mapped-types';
import { CreateLanchDto } from './create-lanch.dto';

export class UpdateLanchDto extends PartialType(CreateLanchDto) {}
