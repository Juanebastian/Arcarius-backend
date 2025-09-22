import { Module } from '@nestjs/common';
import { AuditoriasService } from './auditorias.service';
import { AuditoriasController } from './auditorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auditoria } from './entities/auditoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auditoria])],
  controllers: [AuditoriasController],
  providers: [AuditoriasService],
})
export class AuditoriasModule {}
