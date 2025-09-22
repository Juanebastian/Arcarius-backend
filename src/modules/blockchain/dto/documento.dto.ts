import { ApiProperty } from '@nestjs/swagger';

export class DocumentoDto {
  @ApiProperty({
    description: 'CID en IPFS',
    example: 'QmXnnyufdzAWL5CqbrA6VbD4a2Dx9wW8tLupq5Yk7YLpL5',
  })
  cid: string;

  @ApiProperty({
    description: 'Fecha de registro (timestamp UNIX)',
    example: 1726951234,
  })
  timestamp: number;
}
