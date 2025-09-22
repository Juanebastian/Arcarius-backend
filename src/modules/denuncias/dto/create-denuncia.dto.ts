import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDenunciaDto {
  @ApiProperty({
    example: 5,
    description:
      'ID del ciudadano que realiza la denuncia. Si la denuncia es anónima, puede omitirse.',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  ciudadanoId?: number;

  @ApiProperty({
    description: 'Asunto principal de la solicitud de mesa de ayuda',
    example: 'Problema con el inicio de sesión',
  })
  @IsString()
  @IsNotEmpty()
  asunto: string;

  @ApiProperty({
    example: 'Se reporta un caso de corrupción en la entidad X.',
    description: 'Descripción detallada de la denuncia',
  })
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @ApiProperty({
    example: true,
    description: 'Indica si la denuncia es anónima',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  anonima?: boolean;
}
