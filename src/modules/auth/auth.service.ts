import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepo: Repository<Usuario>,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const usuario = await this.usuariosRepo.findOne({
      where: { email: data.email },
      relations: ['rol'],
    });

    if (!usuario) {
      throw new UnauthorizedException({
        success: false,
        message: 'Credenciales inválidas',
        errors: { email: 'Usuario no encontrado' },
        timestamp: new Date().toISOString(),
        path: '/auth/login',
      });
    }

    const valid = await bcrypt.compare(data.password, usuario.password_hash);
    if (!valid) {
      throw new UnauthorizedException({
        success: false,
        message: 'Credenciales inválidas',
        errors: { password: 'Contraseña incorrecta' },
        timestamp: new Date().toISOString(),
        path: '/auth/login',
      });
    }

    // payload JWT
    const payload = {
      sub: usuario.id,
      nombre: usuario.nombre_completo,
      email: usuario.email,
      rol: usuario.rol.nombre,
    };

    const token = this.jwtService.sign(payload);

    // 🔹 Respuesta estándar
    return {
      success: true,
      message: 'Inicio de sesión exitoso',
      data: {
        access_token: token,
        token_type: 'Bearer',
        usuario: {
          id: usuario.id,
          email: usuario.email,
          rol: {
            id: usuario.rol.id,
            nombre: usuario.rol.nombre,
          },
        },
      },
      timestamp: new Date().toISOString(),
      path: '/auth/login',
    };
  }
}
