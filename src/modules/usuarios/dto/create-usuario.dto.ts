import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsInt,
} from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({
    example: '10203040',
    description: 'Documento único del usuario',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  documento: string;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nombre_completo: string;

  @ApiProperty({
    example: 'juan@mail.com',
    description: 'Correo electrónico único',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'hashedPassword123',
    description: 'Hash de la contraseña',
  })
  @IsString()
  @MinLength(6)
  password_hash: string;

  @ApiProperty({ example: 1, description: 'ID del rol asignado' })
  @IsInt()
  rol_id: number;

  @ApiProperty({
    example: '+573001112233',
    description: 'Teléfono de contacto',
    required: false,
  })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty({
    example: true,
    description: 'Indica si el usuario está activo',
  })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
