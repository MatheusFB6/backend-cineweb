import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { FilmesService } from './filmes.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';

@Controller('filmes')
export class FilmesController {
  constructor(private readonly filmesService: FilmesService) {}

  @Post()
  create(@Body() createFilmeDto: CreateFilmeDto) {
    return this.filmesService.create(createFilmeDto);
  }

  @Get()
  findAll() {
    return this.filmesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filmesService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFilmeDto: UpdateFilmeDto) {
    return this.filmesService.update(+id, updateFilmeDto); // o '+' converte para number
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filmesService.remove(+id);
  }
}
