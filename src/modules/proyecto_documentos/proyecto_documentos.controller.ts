import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { UploadProyectoDocumentoDto } from './dto/update-proyecto_documento.dto';
import { ProyectoDocumentosService } from './proyecto_documentos.service';

@ApiTags('Proyecto Documentos')
@Controller('proyecto-documentos')
export class ProyectoDocumentosController {
  constructor(private readonly documentosService: ProyectoDocumentosService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadProyectoDocumentoDto })
  async upload(
    @Body() dto: UploadProyectoDocumentoDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.documentosService.upload(dto, file.buffer);
  }

  @Get('proyecto/:id')
  async findByProyecto(@Param('id') proyecto_id: string) {
    return this.documentosService.findByProyecto(+proyecto_id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.documentosService.remove(+id);
    return { message: 'Documento eliminado' };
  }
}
