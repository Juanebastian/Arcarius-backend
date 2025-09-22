import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProyectoDocumento } from './entities/proyecto_documento.entity';
import { ProyectoDocumentosController } from './proyecto_documentos.controller';
import { ProyectoDocumentosService } from './proyecto_documentos.service';
import { BlockchainModule } from '../blockchain/blockchain.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProyectoDocumento]), BlockchainModule],
  providers: [ProyectoDocumentosService],
  controllers: [ProyectoDocumentosController],
})
export class ProyectoDocumentosModule {}
