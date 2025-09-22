import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMesaAyudaDto {
  @ApiProperty({
    description: 'Asunto principal de la solicitud de mesa de ayuda',
    example: 'Problema con el inicio de sesión',
  })
  @IsString()
  @IsNotEmpty()
  asunto: string;

  @ApiProperty({
    description: 'Descripción detallada del problema o solicitud',
    example:
      'El usuario no puede iniciar sesión en el sistema desde esta mañana',
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiPropertyOptional({
    description: 'ID del usuario asignado para atender la solicitud',
    example: 12,
  })
  @IsOptional()
  @IsInt()
  asignadoAId?: number;

  @ApiPropertyOptional({
    description: 'ID del estado inicial del ticket',
    example: 1, // pendiente
  })
  @IsOptional()
  @IsInt()
  estadoId?: number;

  @ApiPropertyOptional({
    description: 'ID de la prioridad del ticket',
    example: 2, // media
  })
  @IsOptional()
  @IsInt()
  prioridadId?: number;

  @ApiPropertyOptional({
    description: 'Observaciones adicionales sobre el ticket',
    example: 'El usuario indicó que ya intentó restablecer la contraseña',
  })
  @IsOptional()
  @IsString()
  observaciones?: string;
}
