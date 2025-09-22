import { PartialType } from '@nestjs/mapped-types';
import { CreateMesaAyudaDto } from './create-mesa-ayuda.dto';
import { IsOptional, IsString, IsInt } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMesaAyudaDto extends PartialType(CreateMesaAyudaDto) {
  @ApiPropertyOptional({
    description: 'ID del estado inicial del ticket',
    example: 1, // pendiente
  })
  @IsOptional()
  @IsInt()
  estadoId?: number;

  @ApiPropertyOptional({
    description: 'ID del usuario al que se le asigna el ticket',
    example: 5,
  })
  @IsOptional()
  @IsInt()
  asignadoAId?: number;

  @ApiPropertyOptional({
    description: 'Observaciones adicionales sobre el ticket',
    example: 'El usuario indicó que ya intentó restablecer la contraseña',
  })
  @IsOptional()
  @IsString()
  observaciones?: string;
}
