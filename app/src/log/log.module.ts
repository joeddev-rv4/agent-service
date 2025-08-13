import { Module } from '@nestjs/common';
import { LogController } from './log.controller';
import { LogService } from './log.service';
import { MongooseModule } from '@nestjs/mongoose'
import { Admin_log, LogSchema } from '../schemas/log.schema'

@Module({
  imports: [MongooseModule.forFeature([{name: Admin_log.name, schema: LogSchema}])],
  controllers: [LogController],
  providers: [LogService]
})
export class LogModule {}
