/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auditoria } from './entities/auditoria.entity';
import { CreateAuditoriaDto } from './dto/create-auditoria.dto';
import { UpdateAuditoriaDto } from './dto/update-auditoria.dto';

@Injectable()
export class AuditoriasService {
  constructor(
    @InjectRepository(Auditoria)
    private readonly auditoriasRepository: Repository<Auditoria>,
  ) {}

  async create(dto: CreateAuditoriaDto): Promise<Auditoria> {
    const auditoria = this.auditoriasRepository.create({
      descripcion: dto.descripcion,
      estado: dto.estado,
      entidad_control: dto.entidad_control,
      proyecto: dto.proyectoId ? ({ id: dto.proyectoId } as any) : undefined,
      generadoPor: dto.generadoPorId
        ? ({ id: dto.generadoPorId } as any)
        : undefined,
      aprobadoPor: dto.aprobadoPorId
        ? ({ id: dto.aprobadoPorId } as any)
        : undefined,
    });

    return this.auditoriasRepository.save(auditoria);
  }

  async findAll(): Promise<Auditoria[]> {
    return this.auditoriasRepository.find({
      relations: ['proyecto', 'generadoPor', 'aprobadoPor'],
    });
  }

  async findOne(id: number): Promise<Auditoria> {
    const auditoria = await this.auditoriasRepository.findOne({
      where: { id },
      relations: ['proyecto', 'generadoPor', 'aprobadoPor'],
    });

    if (!auditoria) {
      throw new NotFoundException(`Auditoría con ID ${id} no encontrada`);
    }
    return auditoria;
  }

  /**
   * PATCH → actualización parcial
   */
  async update(id: number, dto: UpdateAuditoriaDto): Promise<Auditoria> {
    const auditoria = await this.findOne(id);

    Object.assign(auditoria, {
      descripcion: dto.descripcion ?? auditoria.descripcion,
      estado: dto.estado ?? auditoria.estado,
      entidad_control: dto.entidad_control ?? auditoria.entidad_control,
      proyecto: dto.proyectoId
        ? ({ id: dto.proyectoId } as any)
        : auditoria.proyecto,
      generadoPor: dto.generadoPorId
        ? ({ id: dto.generadoPorId } as any)
        : auditoria.generadoPor,
      aprobadoPor: dto.aprobadoPorId
        ? ({ id: dto.aprobadoPorId } as any)
        : auditoria.aprobadoPor,
    });

    return this.auditoriasRepository.save(auditoria);
  }

  /**
   * PUT → reemplazo total
   */
  async replace(id: number, dto: CreateAuditoriaDto): Promise<Auditoria> {
    const auditoria = await this.findOne(id);

    Object.assign(auditoria, {
      descripcion: dto.descripcion,
      estado: dto.estado,
      entidad_control: dto.entidad_control ?? null,
      proyecto: dto.proyectoId ? ({ id: dto.proyectoId } as any) : null,
      generadoPor: dto.generadoPorId
        ? ({ id: dto.generadoPorId } as any)
        : null,
      aprobadoPor: dto.aprobadoPorId
        ? ({ id: dto.aprobadoPorId } as any)
        : null,
    });

    return this.auditoriasRepository.save(auditoria);
  }

  async remove(id: number): Promise<void> {
    const auditoria = await this.findOne(id);
    await this.auditoriasRepository.remove(auditoria);
  }

  async findByProyectoId(proyectoId: number): Promise<Auditoria[]> {
    return this.auditoriasRepository.find({
      where: { proyecto: { id: proyectoId } },
      relations: ['proyecto', 'generadoPor', 'aprobadoPor'],
    });
  }
}
