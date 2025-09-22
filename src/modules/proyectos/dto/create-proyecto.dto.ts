// create-proyecto.dto.ts
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProyectoDto {
  @ApiProperty({
    example: 'Sistema de Gestión Académica',
    description: 'Nombre del proyecto',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    example: 'Proyecto para digitalizar los procesos académicos',
    description: 'Descripción breve del proyecto',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({
    example: 'Ministerio de Educación',
    description: 'Entidad responsable del proyecto',
    required: false,
  })
  @IsOptional()
  @IsString()
  entidadResponsable?: string;

  @ApiProperty({
    example: '2025-01-15',
    description: 'Fecha de inicio del proyecto en formato ISO',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  fechaInicio?: Date;

  @ApiProperty({
    example: '2025-12-31',
    description: 'Fecha de finalización del proyecto en formato ISO',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  fechaFin?: Date;

  @ApiProperty({
    example: 50000000,
    description: 'Presupuesto asignado al proyecto en pesos',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  presupuesto?: number;

  @ApiProperty({
    example: 'En ejecución',
    description:
      'Estado actual del proyecto (Planeado, En ejecución, Finalizado)',
    required: false,
  })
  @IsOptional()
  @IsString()
  estado?: string;
}
