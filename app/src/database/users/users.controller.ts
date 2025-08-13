import { Controller, Body, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto, FindUserDto, CreatePropertyViewDto } from './users.dto';

@Controller('usersControl')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) {}

    @Post('/createUser')
    async createUser(@Body() usersDto: UsersDto): Promise<any>{
        return this.usersService.createUser(usersDto.email, usersDto.name, usersDto.phone)
    }

    @Post('/findUser')
    async findUser(@Body() findUserDto: FindUserDto): Promise<any>{
        return this.usersService.getUser(findUserDto.phone)
    }

    @Post('/createPropertyView')
    async createPropertyView(@Body() createPropertyViewDto: CreatePropertyViewDto): Promise<any>{
        return this.usersService.createPropertyViewing(createPropertyViewDto.id_property, createPropertyViewDto.scheduled_at, createPropertyViewDto.user_id)
    }

    @Get('/getAllViews')
    async getAllPropertiesViews(): Promise<any>{
        return this.usersService.getAllPropertiesViews()
    }
}