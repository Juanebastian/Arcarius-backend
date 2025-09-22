import { Proyecto } from 'src/modules/proyectos/entities/proyecto.entity';
import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('gastos')
export class Gasto {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Proyecto, (proyecto) => proyecto.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'proyecto_id' })
  proyecto: Proyecto;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'numeric', precision: 18, scale: 2 })
  monto: number;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'registrado_por' })
  registradoPor: Usuario;

  @Column({
    name: 'fecha_registro',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaRegistro: Date;
}
