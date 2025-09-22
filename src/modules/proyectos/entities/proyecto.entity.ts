import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  nombre: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ name: 'entidad_responsable', length: 150, nullable: true })
  entidadResponsable: string;

  @Column({ type: 'date', name: 'fecha_inicio', nullable: true })
  fechaInicio: Date;

  @Column({ type: 'date', name: 'fecha_fin', nullable: true })
  fechaFin: Date;

  @Column({ type: 'numeric', precision: 18, scale: 2, nullable: true })
  presupuesto: number;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'Planeado',
  })
  estado: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'registrado_por' })
  registradoPor: Usuario;

  @Column({
    name: 'fecha_registro',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaRegistro: Date;
  auditorias: any;
}
