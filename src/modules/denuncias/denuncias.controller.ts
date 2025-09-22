import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { DenunciasService } from './denuncias.service';
import { CreateDenunciaDto } from './dto/create-denuncia.dto';
import { UpdateDenunciaDto } from './dto/update-denuncia.dto';

@Controller('denuncias')
export class DenunciasController {
  constructor(private readonly denunciasService: DenunciasService) {}

  @Post()
  create(@Body() dto: CreateDenunciaDto) {
    return this.denunciasService.create(dto);
  }

  @Get()
  findAll() {
    return this.denunciasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.denunciasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateDenunciaDto) {
    return this.denunciasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.denunciasService.remove(id);
  }
}
