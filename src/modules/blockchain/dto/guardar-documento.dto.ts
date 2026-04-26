import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Length, Min } from 'class-validator';
import { TipoDocumento } from '../blockchain.service';

export class GuardarDocumentoDto {
  @ApiProperty({
    description: 'CID de IPFS del documento',
    example: 'QmXnnyufdzAWL5CqbrA6VbD4a2Dx9wW8tLupq5Yk7YLpL5',
  })
  @IsString()
  @Length(10, 100)
  hashIpfs!: string;

  @ApiProperty({
    description: 'Hash SHA-256 del archivo en formato 0x... (32 bytes hex)',
    example: '0x9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
  })
  @IsString()
  @Length(66, 66)
  hashArchivo!: string;

  @ApiProperty({ description: 'ID del proyecto al que pertenece', example: 1 })
  @IsInt()
  @Min(1)
  proyectoId!: number;

  @ApiProperty({
    description: 'Tipo de documento (0=Otro, 1=Acta, 2=Contrato, 3=Factura, 4=Informe, 5=Soporte)',
    enum: TipoDocumento,
    example: TipoDocumento.Contrato,
  })
  @IsEnum(TipoDocumento)
  tipoDocumento!: TipoDocumento;

  @ApiProperty({ description: 'Versión del documento', example: 1, required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  version?: number;
}
