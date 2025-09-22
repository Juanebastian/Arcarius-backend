import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody, ApiTags, ApiParam } from '@nestjs/swagger';
import type { Response } from 'express';
import { IpfsService } from './ipfs.service';
import { UploadIpfsDto } from './dto/upload-ipfs.dto';

@ApiTags('IPFS')
@Controller('ipfs')
export class IpfsController {
  constructor(private readonly ipfsService: IpfsService) {}

  // Subir PDF a IPFS
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadIpfsDto })
  async uploadPdf(@UploadedFile() file: Express.Multer.File) {
    const cid = await this.ipfsService.addFile(file.buffer);
    return { cid, filename: file.originalname };
  }

  // Descargar PDF desde IPFS por su CID
  @Get('file/:cid')
  @ApiParam({ name: 'cid', description: 'CID del archivo en IPFS' })
  async getFile(@Param('cid') cid: string, @Res() res: Response) {
    const fileBuffer = await this.ipfsService.getFile(cid);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${cid}.pdf"`,
    });
    res.send(fileBuffer);
  }
}
