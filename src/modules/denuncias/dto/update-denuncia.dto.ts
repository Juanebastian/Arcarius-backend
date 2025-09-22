import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateDenunciaDto } from './create-denuncia.dto';

export class UpdateDenunciaDto extends PartialType(CreateDenunciaDto) {
  @ApiPropertyOptional({
    example: 10,
    description: 'ID actualizado del ciudadano que realiza la denuncia',
  })
  ciudadanoId?: number;

  @ApiPropertyOptional({
    example: 'Descripción actualizada de la denuncia',
    description: 'Texto modificado de la denuncia',
  })
  descripcion?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Indica si la denuncia pasa a ser anónima o no',
  })
  anonima?: boolean;
}
