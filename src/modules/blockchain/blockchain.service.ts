/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import { createHash } from 'crypto';
import * as dotenv from 'dotenv';
import ProyectoDocumentosAbi from '../../abi/ProyectoDocumentos.json';

dotenv.config();

export enum TipoDocumento {
  Otro = 0,
  Acta = 1,
  Contrato = 2,
  Factura = 3,
  Informe = 4,
  Soporte = 5,
}

export enum EstadoDocumento {
  Vigente = 0,
  Anulado = 1,
  Reemplazado = 2,
}

export interface DocumentoOnChain {
  cid: string;
  hashArchivo: string;
  proyectoId: number;
  tipoDocumento: TipoDocumento;
  version: number;
  estado: EstadoDocumento;
  autor: string;
  timestamp: number;
}

export interface GuardarDocumentoParams {
  cid: string;
  hashArchivo: string;
  proyectoId: number;
  tipoDocumento: TipoDocumento;
  version?: number;
}

@Injectable()
export class BlockchainService implements OnModuleInit {
  private contract!: ethers.Contract;

  async onModuleInit() {
    const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC);
    const signer = await provider.getSigner(0);

    this.contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS!,
      ProyectoDocumentosAbi,
      signer,
    );
  }

  static calcularHashArchivo(buffer: Buffer): string {
    return '0x' + createHash('sha256').update(buffer).digest('hex');
  }

  async guardarDocumento(params: GuardarDocumentoParams) {
    const hashArchivo = BlockchainService.normalizarHash(params.hashArchivo);
    const version = params.version ?? 1;

    const tx = await this.contract.guardarDocumento(
      params.cid,
      hashArchivo,
      params.proyectoId,
      params.tipoDocumento,
      version,
    );
    const receipt = await tx.wait();
    return { receipt, hashArchivo, version };
  }

  private static normalizarHash(hash: string): string {
    const limpio = hash.startsWith('0x') ? hash.slice(2) : hash;
    if (!/^[0-9a-fA-F]{64}$/.test(limpio)) {
      throw new Error(
        'hashArchivo invalido: se esperan 32 bytes en hex (66 chars con 0x)',
      );
    }
    return '0x' + limpio.toLowerCase();
  }

  async obtenerMisDocumentos(): Promise<DocumentoOnChain[]> {
    const docs = await this.contract.obtenerMisDocumentos();
    return docs.map(this.mapDocumento);
  }

  async obtenerDocumentosPorProyecto(
    proyectoId: number,
  ): Promise<DocumentoOnChain[]> {
    const docs = await this.contract.obtenerDocumentosPorProyecto(proyectoId);
    return docs.map(this.mapDocumento);
  }

  async actualizarEstado(
    proyectoId: number,
    indice: number,
    nuevoEstado: EstadoDocumento,
  ) {
    const tx = await this.contract.actualizarEstado(
      proyectoId,
      indice,
      nuevoEstado,
    );
    return await tx.wait();
  }

  private mapDocumento = (d: any): DocumentoOnChain => ({
    cid: d.cid,
    hashArchivo: d.hashArchivo,
    proyectoId: Number(d.proyectoId),
    tipoDocumento: Number(d.tipoDocumento) as TipoDocumento,
    version: Number(d.version),
    estado: Number(d.estado) as EstadoDocumento,
    autor: d.autor,
    timestamp: Number(d.timestamp),
  });
}
