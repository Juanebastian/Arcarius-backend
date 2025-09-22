import { ApiProperty } from '@nestjs/swagger';

export class UploadProyectoDocumentoDto {
  @ApiProperty({ description: 'ID del proyecto' })
  proyecto_id: number;

  @ApiProperty({ description: 'Tipo de documento (PDF, Word, etc.)' })
  tipo: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Archivo a subir',
  })
  file: any;

  @ApiProperty({ description: 'ID del usuario que sube el archivo' })
  subido_por: number;
}
