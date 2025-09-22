import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Rol } from './rol.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  documento: string;

  @Column({ type: 'varchar', length: 150 })
  nombre_completo: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'text' })
  password_hash: string;

  @ManyToOne(() => Rol, (rol) => rol.usuarios, { nullable: false })
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telefono?: string;

  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @CreateDateColumn({ name: 'fecha_registro' })
  fecha_registro: Date;
}
