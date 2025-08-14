import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FirebaseService } from '../database/firebase/firebase.service';
import { UsersModule } from '../database/users/users.module';
import { PropertiesService } from '../properties/properties.service';
import { DocumentsModule } from '../documents/documents.module';
import { DocumentsService } from '../documents/documents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documentos } from '../database/entities/documents.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, FirebaseService, PropertiesService, DocumentsService],
  exports: [UserService],
  imports: [UsersModule, DocumentsModule,  TypeOrmModule.forFeature([Documentos])]
})
export class UserModule {

}
