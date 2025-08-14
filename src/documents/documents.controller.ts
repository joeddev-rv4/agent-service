// files.controller.ts
import { Controller, Post, UseInterceptors, UploadedFile, Body, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadDto } from './documents.dto';
import { FirebaseStorageService } from '../database/firebase-storage/firebase-storage.service'; 
import type { Express } from 'express';

const ALLOWED = ['application/pdf','image/png','image/jpeg','image/webp'];
const MAX_SIZE = 10 * 1024 * 1024;

@Controller('files')
export class DocumentsController {
  constructor(private readonly storage: FirebaseStorageService) {} // <-- inyección

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: MAX_SIZE } }))
  async upload(@UploadedFile() file: Express.Multer.File, @Body() body: UploadDto) {
    if (!file) throw new BadRequestException('Archivo requerido');
    if (!ALLOWED.includes(file.mimetype)) throw new BadRequestException('Tipo no permitido');

    // delega la subida al servicio
    const { key, url } = await this.storage.uploadBuffer({
      buffer: file.buffer,
      mime: file.mimetype,
      originalName: file.originalname,
      metadata: { sale_id: body.sale_id},
    });

    return { id: body.id, sale_id: body.sale_id, key, url };
  }
}
