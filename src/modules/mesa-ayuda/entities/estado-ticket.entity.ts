import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('estados_tickets')
export class EstadoTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string; // ejemplo: pendiente, en_progreso, resuelto

  @Column({ nullable: true })
  descripcion?: string;
}
