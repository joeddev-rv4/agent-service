// firebase-storage.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { getStorage } from 'firebase-admin/storage';
import type { App } from 'firebase-admin/app';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FirebaseStorageService {
  constructor(@Inject('FIREBASE_STORAGE') private readonly app: App) {}

  async uploadBuffer(opts: { buffer: Buffer; mime: string; originalName?: string; metadata?: Record<string, string> }) {
    const ext = opts.mime === 'application/pdf' ? 'pdf'
            : opts.mime === 'image/png' ? 'png'
            : opts.mime === 'image/webp' ? 'webp' : 'jpg';

    const key = `uploads/${new Date().getFullYear()}/${String(new Date().getMonth()+1).padStart(2,'0')}/${uuid()}.${ext}`;

    const bucket = getStorage(this.app).bucket(); // véase nota de bucket abajo
    await bucket.file(key).save(opts.buffer, {
      contentType: opts.mime,
      resumable: false,
      metadata: { metadata: { originalName: opts.originalName ?? '', ...opts.metadata } },
    });

    const [url] = await bucket.file(key).getSignedUrl({ action: 'read', version: 'v4', expires: Date.now() + 10*60*1000 });
    return { key, url };
  }
}
