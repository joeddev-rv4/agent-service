import { Controller, Body, Post, Get } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto, UserLogDto } from './log.dto';
import { Admin_log } from '../schemas/log.schema'

@Controller('log')
export class LogController {
    constructor(
        private readonly logService: LogService,
    ) {}

    @Post('/createLog')
    async createLog(@Body() createLogDto: CreateLogDto): Promise<Admin_log>{
        return this.logService.create(createLogDto)
    }

    @Get('/sudoLogs')
    async obtainLogs(): Promise<Admin_log[]>{
        return this.logService.findAllLogs()
    }

    @Post('/userLastLog')
    async getUserLogs(@Body() userLogDto: UserLogDto): Promise<any>{
        const response = await this.logService.findLastLogs(userLogDto.user, userLogDto.action)
        return {"memmory": response}
    }
}
