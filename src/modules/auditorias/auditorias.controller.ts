import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { AuditoriasService } from './auditorias.service';
import { CreateAuditoriaDto } from './dto/create-auditoria.dto';
import { UpdateAuditoriaDto } from './dto/update-auditoria.dto';
import { Auditoria } from './entities/auditoria.entity';

@Controller('auditorias')
export class AuditoriasController {
  constructor(private readonly auditoriasService: AuditoriasService) {}

  @Post()
  create(@Body() dto: CreateAuditoriaDto) {
    return this.auditoriasService.create(dto);
  }

  @Get()
  findAll() {
    return this.auditoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.auditoriasService.findOne(id);
  }

  // 👇 Aquí corregimos: usamos UpdateAuditoriaDto, no Partial<CreateAuditoriaDto>
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAuditoriaDto,
  ) {
    return this.auditoriasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.auditoriasService.remove(id);
  }

  @Get('proyecto/:proyectoId')
  async getByProyecto(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
  ): Promise<Auditoria[]> {
    return this.auditoriasService.findByProyectoId(proyectoId);
  }
}
