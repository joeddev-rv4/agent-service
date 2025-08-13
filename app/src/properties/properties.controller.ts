import { Controller, Post, Body } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { ObtainPropertiesDto } from './dto/properties.dto';
import { IProperty } from './interfaces/IProperties';

@Controller('properties')
export class PropertiesController {
    constructor(
        private readonly propertiesService: PropertiesService
    ){}

    @Post("/obtainUserProperties")
    async obtainUserProperties(@Body() obtainPropertiesDto: ObtainPropertiesDto): Promise<IProperty[]>{
        return await this.propertiesService.selectProperties(obtainPropertiesDto.properties)
    }
}
