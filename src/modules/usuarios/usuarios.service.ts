import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';

import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import * as bcrypt from 'bcrypt';
import { Rol } from './entities/rol.entity';
import { UsuarioResponseDto } from './dto/usuario-response.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // validar que el rol existe
    const rol = await this.rolRepository.findOneBy({
      id: createUsuarioDto.rol_id,
    });
    if (!rol) {
      throw new NotFoundException(
        `Rol con id ${createUsuarioDto.rol_id} no existe`,
      );
    }

    // hash de contraseña
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(
      createUsuarioDto.password_hash,
      salt,
    );

    const nuevoUsuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      password_hash: passwordHash, // 👈 guardamos el hash
      rol,
    });

    return this.usuarioRepository.save(nuevoUsuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find({ relations: ['rol'] });
  }

  async findAlls(): Promise<UsuarioResponseDto[]> {
    const usuarios: Usuario[] = await this.usuarioRepository.find({
      relations: ['rol'],
    });

    return usuarios.map((u: Usuario) => ({
      id: u.id,
      documento: u.documento,
      nombre_completo: u.nombre_completo,
      email: u.email,
      password_hash: u.password_hash,
      rol_id: String(u.rol?.id),
      telefono: u.telefono ?? '', // Ensure telefono is always a string
      activo: u.activo,
      fecha_registro: u.fecha_registro,
    }));
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['rol'],
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return usuario;
  }

  async update(
    id: number,
    updateUsuarioDto: UpdateUsuarioDto,
  ): Promise<Usuario> {
    const usuario = await this.findOne(id);

    if (updateUsuarioDto.rol_id) {
      const rol = await this.rolRepository.findOneBy({
        id: updateUsuarioDto.rol_id,
      });
      if (!rol) {
        throw new NotFoundException(
          `Rol con id ${updateUsuarioDto.rol_id} no existe`,
        );
      }
      usuario.rol = rol;
    }

    if (updateUsuarioDto.password_hash) {
      // si viene un nuevo password, lo hasheamos
      const salt = await bcrypt.genSalt();
      usuario.password_hash = await bcrypt.hash(
        updateUsuarioDto.password_hash,
        salt,
      );
    }

    // asignamos el resto de campos excepto el password
    Object.assign(usuario, {
      ...updateUsuarioDto,
      password_hash: usuario.password_hash, // conservamos el hash ya generado
    });

    return this.usuarioRepository.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }

  async findByRolId(rolId: number): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: { rol: { id: rolId } },
      relations: ['rol'],
    });
  }
}
