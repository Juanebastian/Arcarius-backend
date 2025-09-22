import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class GuardarDocumentoDto {
  @ApiProperty({
    description: 'CID de IPFS del documento',
    example: 'QmXnnyufdzAWL5CqbrA6VbD4a2Dx9wW8tLupq5Yk7YLpL5',
  })
  @IsString()
  @Length(10, 100) // opcional, depende de tu caso
  hashIpfs: string;
}
