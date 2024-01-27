import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, UploadedFiles } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Public, ResponseMessage } from 'src/auth/decorator/customsize';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }
  @Post('upload')
  @Public()
  @ResponseMessage("upload success")

  @UseInterceptors(FilesInterceptor('img')) //tên field sử dụng trong form-data
  uploadFile(@UploadedFiles(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: /^(jpg|image\/jpeg|png|image\/png|gif|text\/plain|application\/pdf|docx)$/i
      })
      .addMaxSizeValidator({
        maxSize: 1000 * 1024
      })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,


      }),
  ) files: Express.Multer.File[]) {
    console.log(files)
    const uploadedFileNames = files.map((file) => file.filename);
    if (uploadedFileNames.length !== 1) {
      return {
        filesName: uploadedFileNames[0]
      }
    }
    else {
      return {
        filesName: uploadedFileNames
      }
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
