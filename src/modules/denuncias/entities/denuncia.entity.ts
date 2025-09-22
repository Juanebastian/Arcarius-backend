import { Usuario } from 'src/modules/usuarios/entities/usuario.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('denuncias')
export class Denuncia {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'ciudadano_id' })
  ciudadano: Usuario;

  @Column()
  asunto: string;

  @Column({ type: 'text' })
  descripcion: string;

  @Column({ type: 'boolean', default: false })
  anonima: boolean;

  @Column({
    type: 'varchar',
    length: 50,
    default: 'Recibida',
  })
  estado: string;

  @Column({ name: 'numero_seguimiento', unique: true })
  numeroSeguimiento: string;

  @Column({
    name: 'fecha_creacion',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaCreacion: Date;

  @ManyToOne(() => Usuario, { nullable: true })
  @JoinColumn({ name: 'atendida_por' })
  atendidaPor: Usuario;
}
