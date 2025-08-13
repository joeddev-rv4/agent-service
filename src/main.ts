import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
    {
      logger: ['log', 'error', 'warn', 'debug', 'verbose'], // Habilitar todos los niveles
    }
  );
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'https://90c918a84968.ngrok-free.app/'
      // agrega aquí el dominio real de tu frontend si no es localhost
    ],
    methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'ngrok-skip-browser-warning', // útil con ngrok
    ],
    exposedHeaders: ['Content-Disposition'],
    credentials: true, // si usas cookies/autenticación
    maxAge: 86400, // cache del preflight (opcional)
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
  await app.listen(process.env.PORT ?? 3000);

}
bootstrap();
