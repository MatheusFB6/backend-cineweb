import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Post()
  create(@Body() createCinemaDto: CreateCinemaDto) {
    return this.cinemaService.create(createCinemaDto);
  }

  @Get()
  findAll() {
    return this.cinemaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cinemaService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCinemaDto: UpdateCinemaDto) {
    return this.cinemaService.update(+id, updateCinemaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cinemaService.remove(+id);
  }

  // Métodos Extras
  @Post(':id/salas')
  cadastrarSala(@Param('id') id: string, @Body() salaData: any) {
    return this.cinemaService.cadastrarSala(+id, salaData);
  }

  @Delete(':id/salas/:salaId')
  removerSala(@Param('id') id: string, @Param('salaId') salaId: string) {
    return this.cinemaService.removerSala(+id, +salaId);
  }

  @Post(':id/filmes')
  cadastrarFilme(@Param('id') id: string, @Body() filmeData: any) {
    return this.cinemaService.cadastrarFilme(+id, filmeData);
  }

  @Delete(':id/filmes/:filmeId')
  removerFilme(@Param('id') id: string, @Param('filmeId') filmeId: string) {
    return this.cinemaService.removerFilme(+id, +filmeId);
  }

  @Post(':id/sessoes')
  cadastrarSessao(@Param('id') id: string, @Body() sessaoData: any) {
    return this.cinemaService.cadastrarSessao(+id, sessaoData);
  }

  @Delete(':id/sessoes/:sessaoId')
  removerSessao(@Param('id') id: string, @Param('sessaoId') sessaoId: string) {
    return this.cinemaService.removerSessao(+id, +sessaoId);
  }
}
