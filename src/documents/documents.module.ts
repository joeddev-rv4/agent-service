import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { FirebaseStorageModule } from 'src/database/firebase-storage/firebase-storage.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documentos } from 'src/database/entities/documents.entity';

@Module({
  imports: [FirebaseStorageModule, TypeOrmModule.forFeature([Documentos])],
  controllers: [DocumentsController],
  providers: [DocumentsService]
})
export class DocumentsModule {}
