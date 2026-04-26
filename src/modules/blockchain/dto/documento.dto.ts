import { ApiProperty } from '@nestjs/swagger';
import { EstadoDocumento, TipoDocumento } from '../blockchain.service';

export class DocumentoDto {
  @ApiProperty({
    description: 'CID en IPFS',
    example: 'QmXnnyufdzAWL5CqbrA6VbD4a2Dx9wW8tLupq5Yk7YLpL5',
  })
  cid!: string;

  @ApiProperty({
    description: 'Hash SHA-256 del archivo (0x... 32 bytes)',
    example: '0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
  })
  hashArchivo!: string;

  @ApiProperty({ description: 'ID del proyecto', example: 1 })
  proyectoId!: number;

  @ApiProperty({ enum: TipoDocumento, description: 'Tipo de documento' })
  tipoDocumento!: TipoDocumento;

  @ApiProperty({ description: 'Versión del documento', example: 1 })
  version!: number;

  @ApiProperty({ enum: EstadoDocumento, description: 'Estado del documento' })
  estado!: EstadoDocumento;

  @ApiProperty({
    description: 'Wallet del autor',
    example: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  })
  autor!: string;

  @ApiProperty({
    description: 'Fecha de registro (timestamp UNIX)',
    example: 1726951234,
  })
  timestamp!: number;
}
