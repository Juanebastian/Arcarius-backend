import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import type { AuthenticatedRequest } from '../auth/guard/authenticated-request.interface';
import { Proyecto } from './entities/proyecto.entity';
import { Roles } from '../auth/guard/roles.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
// tu interfaz

@ApiTags('Proyectos')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard, RolesGuard)
@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @Roles('administrador', 'funcionario') // ✅ roles permitidos
  @Post()
  create(@Body() dto: CreateProyectoDto, @Req() req: AuthenticatedRequest) {
    if (!req.user) {
      throw new Error('Usuario no autenticado'); // ⚡ Esto ya lo tienes
    }

    const userId = Number(req.user.sub);
    return this.proyectosService.create(dto, userId);
  }

  @Roles('administrador', 'funcionario') // ✅ roles permitidos
  @Get()
  findAll() {
    return this.proyectosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectosService.findOne(Number(id)); // ⚡ convertimos a number
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProyectoDto) {
    return this.proyectosService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectosService.remove(Number(id));
  }

  @Roles('administrador', 'funcionario')
  @Get('usuario/:usuarioId')
  async getProyectosPorUsuario(
    @Param('usuarioId') usuarioId: string, // viene como string
  ): Promise<Proyecto[]> {
    return this.proyectosService.findByRegistradoPor(Number(usuarioId));
  }
}
