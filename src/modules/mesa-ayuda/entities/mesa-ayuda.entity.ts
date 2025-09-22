import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import { PrioridadTicket } from './prioridad-ticket.entity';
import { EstadoTicket } from './estado-ticket.entity';

@Entity('tickets')
export class MesaAyuda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  asunto: string;

  @Column({ type: 'text' })
  descripcion: string;

  @ManyToOne(() => EstadoTicket, { eager: true, nullable: false })
  @JoinColumn({ name: 'estado_id' })
  estado: EstadoTicket;

  @ManyToOne(() => PrioridadTicket, { eager: true, nullable: false })
  @JoinColumn({ name: 'prioridad_id' })
  prioridad: PrioridadTicket;

  @ManyToOne(() => Usuario, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'creado_por_id' })
  creadoPor?: Usuario;

  @ManyToOne(() => Usuario, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'asignado_a_id' })
  asignadoA?: Usuario;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;

  @Column({ type: 'text', nullable: true })
  observaciones?: string;
}
