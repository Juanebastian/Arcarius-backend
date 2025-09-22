import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Proyecto } from 'src/modules/proyectos/entities/proyecto.entity';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';

@Entity('auditorias')
export class Auditoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'varchar', length: 20 })
  estado: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  entidad_control: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  @ManyToOne(() => Proyecto, { nullable: true })
  @JoinColumn({ name: 'proyecto_id' })
  proyecto: Proyecto;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'generado_por' })
  generadoPor: Usuario;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'aprobado_por' })
  aprobadoPor: Usuario;
}
