import { Module } from '@nestjs/common';
import { DenunciasService } from './denuncias.service';
import { DenunciasController } from './denuncias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Denuncia } from './entities/denuncia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Denuncia])],
  controllers: [DenunciasController],
  providers: [DenunciasService],
})
export class DenunciasModule {}
