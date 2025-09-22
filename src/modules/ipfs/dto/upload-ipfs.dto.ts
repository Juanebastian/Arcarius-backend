import { ApiProperty } from '@nestjs/swagger';

export class UploadIpfsDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Archivo PDF a guardar en IPFS',
  })
  file!: any;
}
