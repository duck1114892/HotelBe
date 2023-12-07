import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public, ResponseMessage } from 'src/auth/decorator/customsize';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }


  @Post('upload')
  @Public()
  @ResponseMessage("upload success")
  @UseInterceptors(FileInterceptor('img')) //tên field sử dụng trong form-data
  uploadFile(@UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: /^(jpg|image\/jpeg|png|image\/png|gif|text\/plain|application\/pdf|docx)$/i
      })
      .addMaxSizeValidator({
        maxSize: 1000 * 1024
      })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      }),
  ) file: Express.Multer.File) {
    return {
      filesName: file.filename
    }
  }

  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(+id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.filesService.remove(+id);
  }
}
