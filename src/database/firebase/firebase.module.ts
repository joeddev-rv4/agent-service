import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { FirebaseService } from './firebase.service';
import { join } from 'path'
import * as path from 'path'
import * as fs from 'fs'
import { PropertiesService } from 'src/properties/properties.service';
import { DocumentsService } from 'src/documents/documents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documentos } from '../entities/documents.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Documentos])],
  providers: [{
    provide: 'FIREBASE_ADMIN',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
        const serviceAccountPath = configService.get<string>('FIREBASE_CREDENTIAL_PATH');
        const fullPath = path.resolve(process.cwd(), serviceAccountPath!)
        if (!serviceAccountPath) throw new Error('FIREBASE_CREDENTIAL_PATH is not defined')
        const serviceAccount = JSON.parse(fs.readFileSync(fullPath, 'utf-8'))

        return admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
        });
      },
  },FirebaseService, PropertiesService, DocumentsService],
  exports: [FirebaseService]
})
export class FirebaseModule {}
