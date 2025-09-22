import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MesaAyudaService } from './mesa-ayuda.service';
import { CreateMesaAyudaDto } from './dto/create-mesa-ayuda.dto';
import { UpdateMesaAyudaDto } from './dto/update-mesa-ayuda.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import type { AuthenticatedRequest } from '../auth/guard/authenticated-request.interface';
import { AuthGuard } from '../auth/guard/auth.guard';
import { MesaAyuda } from './entities/mesa-ayuda.entity';

@ApiTags('Mesa de Ayuda')
@ApiBearerAuth('access-token')
@Controller('tickets')
export class MesaAyudaController {
  constructor(private readonly mesaAyudaService: MesaAyudaService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateMesaAyudaDto, @Req() req: AuthenticatedRequest) {
    if (!req.user) throw new Error('Usuario no autenticado');
    const userId = Number(req.user.sub); // 🔑 id del creador
    return this.mesaAyudaService.create(dto, userId);
  }

  @Get()
  findAll() {
    return this.mesaAyudaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.mesaAyudaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateMesaAyudaDto) {
    return this.mesaAyudaService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.mesaAyudaService.remove(id);
  }

  @Get('asignado/:usuarioId')
  async findByAsignado(
    @Param('usuarioId') usuarioId: number,
  ): Promise<MesaAyuda[]> {
    return this.mesaAyudaService.findByAsignadoAId(usuarioId);
  }
}
