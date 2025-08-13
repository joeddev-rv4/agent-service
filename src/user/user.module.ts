import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FirebaseService } from 'app/src/database/firebase/firebase.service';
import { UsersModule } from 'app/src/database/users/users.module';
import { PropertiesService } from 'app/src/properties/properties.service';
import { DocumentsModule } from 'app/src/documents/documents.module';
import { DocumentsService } from 'app/src/documents/documents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documentos } from 'app/src/database/entities/documents.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, FirebaseService, PropertiesService, DocumentsService],
  exports: [UserService],
  imports: [UsersModule, DocumentsModule,  TypeOrmModule.forFeature([Documentos])]
})
export class UserModule {

}
