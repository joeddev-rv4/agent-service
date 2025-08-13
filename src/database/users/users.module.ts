import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Users } from '../entities/users.entity';
import { PropertyViewing } from '../entities/property_viewing.entity';
import { UsersController } from './users.controller';
import { PropertiesService } from 'app/src/properties/properties.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, PropertyViewing])],
  providers: [UsersService, PropertiesService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
