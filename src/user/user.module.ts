import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FirebaseService } from 'src/database/firebase/firebase.service';
import { UsersModule } from 'src/database/users/users.module';
import { PropertiesService } from 'src/properties/properties.service';
import { DocumentsModule } from 'src/documents/documents.module';
import { DocumentsService } from 'src/documents/documents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Documentos } from 'src/database/entities/documents.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, FirebaseService, PropertiesService, DocumentsService],
  exports: [UserService],
  imports: [UsersModule, DocumentsModule,  TypeOrmModule.forFeature([Documentos])]
})
export class UserModule {

}
