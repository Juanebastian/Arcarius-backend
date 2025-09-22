import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Rol } from './entities/rol.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthGuard } from '../auth/guard/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Rol]),
    JwtModule.register({
      secret: 'mi_secreto', // ⚠️ en producción usar process.env.JWT_SECRET
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService, AuthGuard, JwtStrategy],
})
export class UsuariosModule {}
