import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDenunciaDto } from './dto/create-denuncia.dto';
import { UpdateDenunciaDto } from './dto/update-denuncia.dto';
import { randomUUID } from 'crypto';
import { Denuncia } from './entities/denuncia.entity';

@Injectable()
export class DenunciasService {
  constructor(
    @InjectRepository(Denuncia)
    private readonly denunciasRepository: Repository<Denuncia>,
  ) {}

  async create(dto: CreateDenunciaDto): Promise<Denuncia> {
    const denuncia = this.denunciasRepository.create({
      asunto: dto.asunto,
      descripcion: dto.descripcion,
      anonima: dto.anonima ?? false,
      numeroSeguimiento: randomUUID(),
    });

    if (dto.ciudadanoId) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      denuncia.ciudadano = { id: dto.ciudadanoId } as any;
    }

    return this.denunciasRepository.save(denuncia);
  }

  async findAll(): Promise<Denuncia[]> {
    return this.denunciasRepository.find({
      relations: ['ciudadano', 'atendidaPor'],
    });
  }

  async findOne(id: number): Promise<Denuncia> {
    const denuncia = await this.denunciasRepository.findOne({
      where: { id },
      relations: ['ciudadano', 'atendidaPor'],
    });
    if (!denuncia) throw new NotFoundException(`Denuncia ${id} no encontrada`);
    return denuncia;
  }

  async update(id: number, dto: UpdateDenunciaDto): Promise<Denuncia> {
    const denuncia = await this.findOne(id);
    Object.assign(denuncia, dto, {
      ciudadano: dto.ciudadanoId ? { id: dto.ciudadanoId } : denuncia.ciudadano,
    });
    return this.denunciasRepository.save(denuncia);
  }

  async remove(id: number): Promise<void> {
    const denuncia = await this.findOne(id);
    await this.denunciasRepository.remove(denuncia);
  }
}
