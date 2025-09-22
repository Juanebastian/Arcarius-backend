/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Post, Get, Body } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
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
    const tx = await this.blockchainService.guardarDocumento(body.hashIpfs);
    return {
      message: 'Documento guardado en blockchain',
      transactionHash: tx.transactionHash,
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
    const docs = await this.blockchainService.obtenerMisDocumentos();
    return docs.map((d: any) => ({
      cid: d.cid,
      timestamp: Number(d.timestamp),
    }));
  }
}
