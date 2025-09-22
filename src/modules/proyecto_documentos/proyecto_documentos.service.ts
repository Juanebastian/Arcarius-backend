/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { create } from 'ipfs-http-client';
import { UploadProyectoDocumentoDto } from './dto/update-proyecto_documento.dto';
import { ProyectoDocumento } from './entities/proyecto_documento.entity';
import { BlockchainService } from '../blockchain/blockchain.service'; // 👈 Importa el servicio


@Injectable()
export class ProyectoDocumentosService {
  private ipfs = create({ url: 'http://127.0.0.1:5001/api/v0' });

  constructor(
    @InjectRepository(ProyectoDocumento)
    private readonly documentoRepo: Repository<ProyectoDocumento>,
    private readonly blockchainService: BlockchainService, // 👈 Inyecta BlockchainService
  ) {}

  async upload(
    dto: UploadProyectoDocumentoDto,
    fileBuffer: Buffer,
  ): Promise<ProyectoDocumento> {
    // 1. Subir a IPFS
    const { cid } = await this.ipfs.add(fileBuffer);

    // 2. Guardar en BD
    const documento = this.documentoRepo.create({
      proyecto_id: dto.proyecto_id,
      tipo: dto.tipo,
      ruta_archivo: cid.toString(),
      hash_archivo: cid.toString(),
      subido_por: dto.subido_por,
    });
    const savedDoc = await this.documentoRepo.save(documento);

    // 3. Guardar en blockchain
   try {
  await this.blockchainService.guardarDocumento(cid.toString()); // 👈 solo el CID
} catch (error) {
  console.error('❌ Error guardando en blockchain:', error);
}

    return savedDoc;
  }

  async findByProyecto(proyecto_id: number): Promise<ProyectoDocumento[]> {
    return this.documentoRepo.find({ where: { proyecto_id } });
  }

  async remove(id: number): Promise<void> {
    await this.documentoRepo.delete(id);
  }
}
