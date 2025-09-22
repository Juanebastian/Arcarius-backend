import { Module } from '@nestjs/common';
import { MesaAyudaService } from './mesa-ayuda.service';
import { MesaAyudaController } from './mesa-ayuda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MesaAyuda } from './entities/mesa-ayuda.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/guard/auth.guard';
import { JwtStrategy } from '../auth/jwt.strategy';
import { EstadoTicket } from './entities/estado-ticket.entity';
import { PrioridadTicket } from './entities/prioridad-ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MesaAyuda,
      Usuario,
      EstadoTicket,
      PrioridadTicket,
    ]),
    JwtModule.register({
      secret: 'mi_secreto', // ⚠️ en producción usar process.env.JWT_SECRET
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [MesaAyudaController],
  providers: [MesaAyudaService, AuthGuard, JwtStrategy],
})
export class MesaAyudaModule {}
