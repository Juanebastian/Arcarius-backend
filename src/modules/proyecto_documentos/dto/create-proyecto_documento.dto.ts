import { ApiProperty } from '@nestjs/swagger';

export class CreateProyectoDocumentoDto {
  @ApiProperty()
  proyecto_id: number;

  @ApiProperty({ description: 'Tipo de documento (PDF, Word, Imagen, etc.)' })
  tipo: string;

  @ApiProperty({ description: 'CID o ruta del archivo en IPFS' })
  ruta_archivo: string;

  @ApiProperty({ description: 'Hash del archivo' })
  hash_archivo: string;

  @ApiProperty()
  subido_por: number;
}
