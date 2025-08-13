import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FirebaseModule } from './database/firebase/firebase.module';
import { MongooseModule } from '@nestjs/mongoose'
import { LogModule } from './log/log.module';
import { Postgresql } from './database/postgresql/postgresql.module';
import { UsersModule } from './database/users/users.module';
import { Users } from './database/entities/users.entity';
import { PropertiesModule } from './properties/properties.module';
import { DocumentsModule } from './documents/documents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    })
    ,UserModule, 
    FirebaseModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb://${configService.get<string>('MONGO_USER')}:${configService.get<string>('MONGO_PASSWORD')}@${configService.get<string>('MONGO_URL')}:${configService.get<string>('MONGO_PORT')}`,
      }),
      inject: [ConfigService]
    }),
    LogModule,
    Postgresql,
    UsersModule,
    PropertiesModule,
    DocumentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
