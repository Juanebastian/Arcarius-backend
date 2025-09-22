import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateGastoDto } from './create-gasto.dto';

export class UpdateGastoDto extends PartialType(CreateGastoDto) {
  @ApiPropertyOptional({
    example: 1,
    description: 'ID del proyecto al que pertenece el gasto',
  })
  proyectoId?: number;

  @ApiPropertyOptional({
    example: '2025-08-20',
    description: 'Nueva fecha del gasto en formato ISO',
  })
  fecha?: Date;

  @ApiPropertyOptional({
    example: 200000,
    description: 'Monto actualizado del gasto en pesos',
  })
  monto?: number;

  @ApiPropertyOptional({
    example: 'Actualización de compra de equipos',
    description: 'Descripción actualizada del gasto',
  })
  descripcion?: string;
}
