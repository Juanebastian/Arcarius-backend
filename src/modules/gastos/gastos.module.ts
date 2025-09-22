import { Module } from '@nestjs/common';
import { GastosService } from './gastos.service';
import { GastosController } from './gastos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gasto } from './entities/gasto.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '../auth/guard/auth.guard';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gasto]),
    JwtModule.register({
      secret: 'mi_secreto',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [GastosController],
  providers: [GastosService, AuthGuard, JwtStrategy],
})
export class GastosModule {}
