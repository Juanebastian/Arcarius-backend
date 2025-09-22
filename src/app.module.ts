import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AuthModule } from './modules/auth/auth.module';
import ormconfig from 'ormconfig';
import { ProyectosModule } from './modules/proyectos/proyectos.module';
import { GastosModule } from './modules/gastos/gastos.module';
import { MesaAyudaModule } from './modules/mesa-ayuda/mesa-ayuda.module';
import { AuditoriasModule } from './modules/auditorias/auditorias.module';
import { DenunciasModule } from './modules/denuncias/denuncias.module';
import { IpfsModule } from './modules/ipfs/ipfs.module';
import { ProyectoDocumentosModule } from './modules/proyecto_documentos/proyecto_documentos.module';
import { BlockchainModule } from './modules/blockchain/blockchain.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig.options),
    UsuariosModule,
    AuthModule,
    ProyectosModule,
    GastosModule,
    MesaAyudaModule,
    AuditoriasModule,
    DenunciasModule,
    IpfsModule,
    ProyectoDocumentosModule,
    BlockchainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
