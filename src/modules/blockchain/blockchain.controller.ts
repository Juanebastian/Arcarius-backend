/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BlockchainService, EstadoDocumento } from './blockchain.service';
import { GuardarDocumentoDto } from './dto/guardar-documento.dto';
import { DocumentoDto } from './dto/documento.dto';

@Controller('blockchain')
@ApiTags('blockchain')
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Post('documentos')
  @ApiOperation({ summary: 'Guardar un documento en blockchain' })
  @ApiResponse({ status: 201, description: 'Documento guardado' })
  async guardarDocumento(@Body() body: GuardarDocumentoDto) {
    const tx = await this.blockchainService.guardarDocumento({
      cid: body.hashIpfs,
      hashArchivo: body.hashArchivo,
      proyectoId: body.proyectoId,
      tipoDocumento: body.tipoDocumento,
      version: body.version,
    });
    return {
      message: 'Documento guardado en blockchain',
      transactionHash: tx.receipt.hash,
      hashArchivo: tx.hashArchivo,
      version: tx.version,
    };
  }

  @Get('documentos')
  @ApiOperation({ summary: 'Obtener mis documentos desde blockchain' })
  @ApiResponse({
    status: 200,
    description: 'Lista de documentos',
    type: [DocumentoDto],
  })
  async obtenerMisDocumentos(): Promise<DocumentoDto[]> {
    return this.blockchainService.obtenerMisDocumentos();
  }

  @Get('documentos/proyecto/:proyectoId')
  @ApiOperation({ summary: 'Obtener documentos de un proyecto desde blockchain' })
  @ApiResponse({ status: 200, type: [DocumentoDto] })
  async obtenerPorProyecto(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
  ): Promise<DocumentoDto[]> {
    return this.blockchainService.obtenerDocumentosPorProyecto(proyectoId);
  }

  @Patch('documentos/:proyectoId/:indice/estado')
  @ApiOperation({ summary: 'Actualizar el estado de un documento on-chain' })
  async actualizarEstado(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Param('indice', ParseIntPipe) indice: number,
    @Body('estado') estado: EstadoDocumento,
  ) {
    const receipt = await this.blockchainService.actualizarEstado(
      proyectoId,
      indice,
      estado,
    );
    return { message: 'Estado actualizado', transactionHash: receipt.hash };
  }
}
