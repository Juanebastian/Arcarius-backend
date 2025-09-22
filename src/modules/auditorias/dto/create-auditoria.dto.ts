import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuditoriaDto {
  @ApiProperty({
    example: 'Auditoría sobre ejecución presupuestal 2025',
    description: 'Descripción detallada de la auditoría',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({
    example: 'En proceso',
    description:
      'Estado actual de la auditoría (Ej: Pendiente, En proceso, Finalizada)',
  })
  @IsString()
  @IsNotEmpty()
  estado: string;

  @ApiProperty({
    example: 'Contraloría General',
    description: 'Entidad de control encargada de la auditoría',
    required: false,
  })
  @IsString()
  @IsOptional()
  entidad_control?: string;

  @ApiProperty({
    example: 3,
    description: 'ID del proyecto asociado a la auditoría',
    required: false,
  })
  @IsInt()
  @IsOptional()
  proyectoId?: number;

  @ApiProperty({
    example: 12,
    description: 'ID del usuario que generó la auditoría',
  })
  @IsInt()
  @IsNotEmpty()
  generadoPorId: number;

  @ApiProperty({
    example: 8,
    description: 'ID del usuario que aprobó la auditoría (si aplica)',
    required: false,
  })
  @IsInt()
  @IsOptional()
  aprobadoPorId?: number;
}
