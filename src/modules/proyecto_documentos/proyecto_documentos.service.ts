/* eslint-disable prettier/prettier */
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { create } from 'ipfs-http-client';
import { UploadProyectoDocumentoDto } from './dto/update-proyecto_documento.dto';
import { ProyectoDocumento } from './entities/proyecto_documento.entity';
import {
  BlockchainService,
  TipoDocumento,
} from '../blockchain/blockchain.service';

const TIPO_MAP: Record<string, TipoDocumento> = {
  acta: TipoDocumento.Acta,
  contrato: TipoDocumento.Contrato,
  factura: TipoDocumento.Factura,
  informe: TipoDocumento.Informe,
  soporte: TipoDocumento.Soporte,
};

@Injectable()
export class ProyectoDocumentosService {
  private readonly logger = new Logger(ProyectoDocumentosService.name);
  private ipfs = create({ url: 'http://127.0.0.1:5001/api/v0' });

  constructor(
    @InjectRepository(ProyectoDocumento)
    private readonly documentoRepo: Repository<ProyectoDocumento>,
    private readonly blockchainService: BlockchainService,
  ) {}

  async upload(
    dto: UploadProyectoDocumentoDto,
    fileBuffer: Buffer,
  ): Promise<ProyectoDocumento> {
    const { cid } = await this.ipfs.add(fileBuffer);
    const cidStr = cid.toString();
    const hashArchivo = BlockchainService.calcularHashArchivo(fileBuffer);

    const versionAnterior = await this.documentoRepo.count({
      where: { proyecto_id: dto.proyecto_id, tipo: dto.tipo },
    });
    const version = versionAnterior + 1;

    const tipoDocumento =
      TIPO_MAP[dto.tipo.toLowerCase()] ?? TipoDocumento.Otro;

    try {
      await this.blockchainService.guardarDocumento({
        cid: cidStr,
        hashArchivo,
        proyectoId: dto.proyecto_id,
        tipoDocumento,
        version,
      });
    } catch (error) {
      this.logger.error('Error guardando en blockchain', error);
      throw new InternalServerErrorException(
        'No se pudo registrar el documento en la blockchain',
      );
    }

    const documento = this.documentoRepo.create({
      proyecto_id: dto.proyecto_id,
      tipo: dto.tipo,
      ruta_archivo: cidStr,
      hash_archivo: hashArchivo,
      subido_por: dto.subido_por,
    });
    return this.documentoRepo.save(documento);
  }

  async findByProyecto(proyecto_id: number): Promise<ProyectoDocumento[]> {
    return this.documentoRepo.find({ where: { proyecto_id } });
  }

  async remove(id: number): Promise<void> {
    await this.documentoRepo.delete(id);
  }
}
