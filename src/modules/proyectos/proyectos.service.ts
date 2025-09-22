import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Proyecto } from './entities/proyecto.entity';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectosRepository: Repository<Proyecto>,
  ) {}

  async create(dto: CreateProyectoDto, userId: number): Promise<Proyecto> {
    const proyecto = this.proyectosRepository.create({
      ...dto,
      registradoPor: { id: userId },
    });
    return this.proyectosRepository.save(proyecto);
  }

  async findAll(): Promise<Proyecto[]> {
    return this.proyectosRepository.find({ relations: ['registradoPor'] });
  }

  async findOne(id: number): Promise<Proyecto> {
    const proyecto = await this.proyectosRepository.findOne({
      where: { id },
      relations: ['registradoPor'],
    });
    if (!proyecto) throw new NotFoundException(`Proyecto ${id} no encontrado`);
    return proyecto;
  }

  async update(id: number, dto: UpdateProyectoDto): Promise<Proyecto> {
    const proyecto = await this.findOne(id);
    Object.assign(proyecto, dto);
    return this.proyectosRepository.save(proyecto);
  }

  async remove(id: number): Promise<void> {
    const proyecto = await this.findOne(id);
    await this.proyectosRepository.remove(proyecto);
  }

  /** Obtener proyectos por el ID del usuario que los registró */
  async findByRegistradoPor(usuarioId: number): Promise<Proyecto[]> {
    return this.proyectosRepository.find({
      where: { registradoPor: { id: usuarioId } },
      relations: ['registradoPor'],
    });
  }
}
