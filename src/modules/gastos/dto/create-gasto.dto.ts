import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGastoDto {
  @ApiProperty({
    example: 1,
    description: 'ID del proyecto al que pertenece el gasto',
  })
  @IsNotEmpty()
  @IsNumber()
  proyectoId: number;

  @ApiProperty({
    example: '2025-08-18',
    description: 'Fecha en la que se registró el gasto (formato ISO)',
  })
  @IsNotEmpty()
  @IsDateString()
  fecha: Date;

  @ApiProperty({
    example: 150000,
    description: 'Monto del gasto en pesos',
  })
  @IsNotEmpty()
  @IsNumber()
  monto: number;

  @ApiProperty({
    example: 'Compra de equipos de cómputo',
    description: 'Descripción opcional del gasto',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
