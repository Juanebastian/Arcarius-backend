import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('prioridades_tickets')
export class PrioridadTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string; // ejemplo: baja, media, alta, crítica

  @Column({ nullable: true })
  descripcion?: string;
}
