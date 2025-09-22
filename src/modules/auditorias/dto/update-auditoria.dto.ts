import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateAuditoriaDto } from './create-auditoria.dto';

export class UpdateAuditoriaDto extends PartialType(CreateAuditoriaDto) {
  @ApiPropertyOptional({
    example: 'Auditoría modificada sobre contratación 2025',
    description: 'Descripción actualizada de la auditoría',
  })
  descripcion?: string;

  @ApiPropertyOptional({
    example: 'Finalizada',
    description: 'Estado actualizado de la auditoría',
  })
  estado?: string;

  @ApiPropertyOptional({
    example: 'Procuraduría General',
    description: 'Nueva entidad de control encargada',
  })
  entidad_control?: string;

  @ApiPropertyOptional({
    example: 5,
    description: 'Nuevo ID de proyecto asociado',
  })
  proyectoId?: number;

  @ApiPropertyOptional({
    example: 14,
    description: 'ID actualizado del usuario que generó la auditoría',
  })
  generadoPorId?: number;

  @ApiPropertyOptional({
    example: 9,
    description: 'ID actualizado del usuario que aprobó la auditoría',
  })
  aprobadoPorId?: number;
}
