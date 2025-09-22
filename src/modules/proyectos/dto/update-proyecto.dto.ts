import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateProyectoDto } from './create-proyecto.dto';

export class UpdateProyectoDto extends PartialType(CreateProyectoDto) {
  @ApiPropertyOptional({
    example: 'Nuevo nombre del proyecto',
    description: 'Nombre actualizado del proyecto',
  })
  nombre?: string;

  @ApiPropertyOptional({
    example: 'Descripción actualizada del proyecto',
    description: 'Descripción breve del proyecto',
  })
  descripcion?: string;

  @ApiPropertyOptional({
    example: 'Secretaría de Innovación',
    description: 'Entidad responsable actualizada',
  })
  entidadResponsable?: string;

  @ApiPropertyOptional({
    example: '2025-03-01',
    description: 'Nueva fecha de inicio en formato ISO',
  })
  fechaInicio?: Date;

  @ApiPropertyOptional({
    example: '2025-11-30',
    description: 'Nueva fecha de finalización en formato ISO',
  })
  fechaFin?: Date;

  @ApiPropertyOptional({
    example: 75000000,
    description: 'Nuevo presupuesto asignado',
  })
  presupuesto?: number;

  @ApiPropertyOptional({
    example: 'Finalizado',
    description: 'Estado actualizado del proyecto',
  })
  estado?: string;
}
