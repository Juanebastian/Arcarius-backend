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
import { GastosService } from './gastos.service';
import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import type { AuthenticatedRequest } from '../auth/guard/authenticated-request.interface';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Roles } from '../auth/guard/roles.decorator';

@ApiTags('Gastos')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('gastos')
export class GastosController {
  constructor(private readonly gastosService: GastosService) {}

  @Roles('administrador', 'funcionario')
  @Post()
  create(@Body() dto: CreateGastoDto, @Req() req: AuthenticatedRequest) {
    if (!req.user) throw new Error('Usuario no autenticado');
    const userId = Number(req.user.sub);
    return this.gastosService.create(dto, userId);
  }

  @Get()
  findAll() {
    return this.gastosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.gastosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() dto: UpdateGastoDto) {
    return this.gastosService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.gastosService.remove(id);
  }

  @Get('proyecto/:proyectoId')
  findByProyecto(@Param('proyectoId') proyectoId: number) {
    return this.gastosService.findByProyecto(Number(proyectoId));
  }

  @Get('usuario/:usuarioId')
  findByUsuario(@Param('usuarioId') usuarioId: number) {
    return this.gastosService.findByUsuario(Number(usuarioId));
  }
}
