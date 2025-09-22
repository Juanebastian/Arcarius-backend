import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MesaAyuda } from './entities/mesa-ayuda.entity';
import { CreateMesaAyudaDto } from './dto/create-mesa-ayuda.dto';
import { UpdateMesaAyudaDto } from './dto/update-mesa-ayuda.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { EstadoTicket } from './entities/estado-ticket.entity';
import { PrioridadTicket } from './entities/prioridad-ticket.entity';

@Injectable()
export class MesaAyudaService {
  constructor(
    @InjectRepository(MesaAyuda)
    private readonly mesaAyudaRepository: Repository<MesaAyuda>,

    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(EstadoTicket)
    private readonly estadoTicketRepository: Repository<EstadoTicket>,

    @InjectRepository(PrioridadTicket)
    private readonly prioridadTicketRepository: Repository<PrioridadTicket>,
  ) {}

  // Crear un nuevo ticket
  async create(dto: CreateMesaAyudaDto, userId: number): Promise<MesaAyuda> {
    // Verificar usuario creador
    const creadoPor = await this.usuarioRepository.findOne({
      where: { id: userId },
    });
    if (!creadoPor) {
      throw new NotFoundException(`Usuario con id ${userId} no encontrado`);
    }

    // Usuario asignado (opcional)
    let asignadoA: Usuario | null = null;
    if (dto.asignadoAId) {
      asignadoA = await this.usuarioRepository.findOne({
        where: { id: dto.asignadoAId },
      });
      if (!asignadoA) {
        throw new NotFoundException(
          `Usuario asignado con id ${dto.asignadoAId} no encontrado`,
        );
      }
    }

    // Estado del ticket
    let estado: EstadoTicket | null = null;
    if (dto.estadoId) {
      estado = await this.estadoTicketRepository.findOne({
        where: { id: dto.estadoId },
      });
      if (!estado) {
        throw new NotFoundException(
          `Estado con id ${dto.estadoId} no encontrado`,
        );
      }
    } else {
      estado = await this.estadoTicketRepository.findOne({
        where: { nombre: 'pendiente' },
      });
      if (!estado) {
        throw new NotFoundException(`No existe un estado inicial "pendiente"`);
      }
    }

    // Prioridad del ticket
    let prioridad: PrioridadTicket | null = null;
    if (dto.prioridadId) {
      prioridad = await this.prioridadTicketRepository.findOne({
        where: { id: dto.prioridadId },
      });
      if (!prioridad) {
        throw new NotFoundException(
          `Prioridad con id ${dto.prioridadId} no encontrada`,
        );
      }
    } else {
      prioridad = await this.prioridadTicketRepository.findOne({
        where: { nombre: 'media' },
      });
      if (!prioridad) {
        throw new NotFoundException(
          `No existe una prioridad por defecto "media"`,
        );
      }
    }

    // Crear ticket
    const ticket = this.mesaAyudaRepository.create({
      asunto: dto.asunto,
      descripcion: dto.descripcion,
      creadoPor,
      asignadoA: asignadoA ?? undefined,
      estado,
      prioridad,
      observaciones: dto.observaciones,
    });

    return this.mesaAyudaRepository.save(ticket);
  }

  // Obtener todos los tickets
  findAll(): Promise<MesaAyuda[]> {
    return this.mesaAyudaRepository.find({
      relations: ['creadoPor', 'asignadoA', 'estado', 'prioridad'],
      order: { fecha_actualizacion: 'DESC' },
    });
  }

  // Obtener un ticket por id
  async findOne(id: number): Promise<MesaAyuda> {
    const ticket = await this.mesaAyudaRepository.findOne({
      where: { id },
      relations: ['creadoPor', 'asignadoA', 'estado', 'prioridad'],
    });

    if (!ticket) {
      throw new NotFoundException(`Ticket con id ${id} no encontrado`);
    }

    return ticket;
  }

  // Actualizar un ticket
  async update(id: number, dto: UpdateMesaAyudaDto): Promise<MesaAyuda> {
    const ticket = await this.findOne(id);

    if (dto.asignadoAId) {
      const asignadoA = await this.usuarioRepository.findOne({
        where: { id: dto.asignadoAId },
      });
      if (!asignadoA) {
        throw new NotFoundException(
          `Usuario asignado con id ${dto.asignadoAId} no encontrado`,
        );
      }
      ticket.asignadoA = asignadoA;
    }

    if (dto.estadoId) {
      const estado = await this.estadoTicketRepository.findOne({
        where: { id: dto.estadoId },
      });
      if (!estado) {
        throw new NotFoundException(
          `Estado con id ${dto.estadoId} no encontrado`,
        );
      }
      ticket.estado = estado;
    }

    if (dto.prioridadId) {
      const prioridad = await this.prioridadTicketRepository.findOne({
        where: { id: dto.prioridadId },
      });
      if (!prioridad) {
        throw new NotFoundException(
          `Prioridad con id ${dto.prioridadId} no encontrada`,
        );
      }
      ticket.prioridad = prioridad;
    }

    if (dto.asunto) ticket.asunto = dto.asunto;
    if (dto.descripcion) ticket.descripcion = dto.descripcion;
    if (dto.observaciones) ticket.observaciones = dto.observaciones;

    return this.mesaAyudaRepository.save(ticket);
  }

  // Eliminar un ticket
  async remove(id: number): Promise<void> {
    const result = await this.mesaAyudaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Ticket con id ${id} no encontrado`);
    }
  }

  // Obtener todos los tickets asignados a un usuario por su id
  async findByAsignadoAId(usuarioId: number): Promise<MesaAyuda[]> {
    // Verificar si el usuario existe
    const usuario = await this.usuarioRepository.findOne({
      where: { id: usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${usuarioId} no encontrado`);
    }

    // Buscar tickets asignados a ese usuario
    return this.mesaAyudaRepository.find({
      where: { asignadoA: { id: usuarioId } },
      relations: ['creadoPor', 'asignadoA', 'estado', 'prioridad'],
    });
  }
}
