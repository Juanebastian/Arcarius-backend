import { IsEmail, IsInt, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegistroDto {
  @ApiProperty({
    example: '1234567890',
    description: 'Documento de identidad del usuario',
  })
  @IsNotEmpty()
  documento: string;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
  })
  @IsNotEmpty()
  nombre_completo: string;

  @ApiProperty({
    example: 'juan@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
  })
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 1,
    description: 'ID del rol asignado al usuario (FK con roles)',
  })
  @IsNotEmpty()
  @IsInt()
  rol_id: number;

  @ApiProperty({
    example: '+57 3001234567',
    description: 'Teléfono del usuario',
  })
  @IsNotEmpty()
  telefono: string;
}
