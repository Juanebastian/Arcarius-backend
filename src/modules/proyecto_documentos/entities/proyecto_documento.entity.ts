import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';

@Entity('proyecto_documentos')
export class ProyectoDocumento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Proyecto)
  @JoinColumn({ name: 'proyecto_id' })
  proyecto: Proyecto;

  @Column()
  proyecto_id: number;

  @Column({ type: 'varchar', length: 50 })
  tipo: string;

  @Column({ type: 'text' })
  ruta_archivo: string; // CID de IPFS

  @Column({ type: 'varchar', length: 255 })
  hash_archivo: string; // Opcional: hash original o verificación

  @Column()
  subido_por: number;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_subida: Date;
}
