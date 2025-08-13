import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

// ✅ usa API modular en vez del namespace "admin"
import { initializeApp, cert, getApp, getApps, App } from 'firebase-admin/app';
import { FirebaseStorageService } from './firebase-storage.service';

export const FIREBASE_STORAGE = 'FIREBASE_STORAGE';
const STORAGE_APP_NAME = 'storage-app'; // <- nombre ÚNICO para esta app

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: FIREBASE_STORAGE,
      inject: [ConfigService],
      useFactory: (config: ConfigService): App => {
        const credPath = config.get<string>('FIREBASE_PROD_CREDENTIAL_PATH');
        if (!credPath) throw new Error('FIREBASE_PROD_CREDENTIAL_PATH is not defined');

        const serviceAccount = JSON.parse(
          fs.readFileSync(path.resolve(process.cwd(), credPath), 'utf-8'),
        );

        // 👇 si ya existe una app con ese nombre, la reutilizamos
        const exists = getApps().some(a => a.name === STORAGE_APP_NAME);
        return exists
          ? getApp(STORAGE_APP_NAME)
          : initializeApp(
              {
                credential: cert(serviceAccount),
                projectId: config.get<string>('FIREBASE_PROD_PROJECT_ID'),
                storageBucket: config.get<string>('FIREBASE_STORAGE_BUCKET'), // recomendado
              },
              STORAGE_APP_NAME, // <- nombre aquí
            );
      },
    },
    FirebaseStorageService
  ],
  exports: [
    FirebaseStorageService,
    FIREBASE_STORAGE
  ],
})
export class FirebaseStorageModule {}
