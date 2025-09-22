import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGastoDto } from './dto/create-gasto.dto';
import { UpdateGastoDto } from './dto/update-gasto.dto';
import { Gasto } from './entities/gasto.entity';

@Injectable()
export class GastosService {
  constructor(
    @InjectRepository(Gasto)
    private readonly gastosRepository: Repository<Gasto>,
  ) {}

  async create(dto: CreateGastoDto, userId: number): Promise<Gasto> {
    const gasto = this.gastosRepository.create({
      ...dto,
      proyecto: { id: dto.proyectoId },
      registradoPor: { id: userId },
    });
    return this.gastosRepository.save(gasto);
  }

  async findAll(): Promise<Gasto[]> {
    return this.gastosRepository.find({
      relations: ['proyecto', 'registradoPor'],
    });
  }

  async findOne(id: number): Promise<Gasto> {
    const gasto = await this.gastosRepository.findOne({
      where: { id },
      relations: ['proyecto', 'registradoPor'],
    });
    if (!gasto) throw new NotFoundException(`Gasto ${id} no encontrado`);
    return gasto;
  }

  async update(id: number, dto: UpdateGastoDto): Promise<Gasto> {
    const gasto = await this.findOne(id);
    Object.assign(gasto, dto, { proyecto: { id: dto.proyectoId } });
    return this.gastosRepository.save(gasto);
  }

  async remove(id: number): Promise<void> {
    const gasto = await this.findOne(id);
    await this.gastosRepository.remove(gasto);
  }

  async findByProyecto(proyectoId: number): Promise<Gasto[]> {
    return this.gastosRepository.find({
      where: { proyecto: { id: proyectoId } },
      relations: ['proyecto', 'registradoPor'],
    });
  }
  async findByUsuario(usuarioId: number): Promise<Gasto[]> {
    return this.gastosRepository.find({
      where: { registradoPor: { id: usuarioId } },
      relations: ['proyecto', 'registradoPor'],
      order: { fechaRegistro: 'DESC' }, // opcional: ordena los más recientes primero
    });
  }
}
