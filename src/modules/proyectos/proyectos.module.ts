import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';
import { Proyecto } from './entities/proyecto.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/guard/auth.guard';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proyecto]),
    JwtModule.register({
      secret: 'mi_secreto', // ⚠️ en producción usar process.env.JWT_SECRET
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ProyectosController],
  providers: [ProyectosService, AuthGuard, JwtStrategy],
})
export class ProyectosModule {}
