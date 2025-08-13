import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios'
import { IProperty, IResult } from './interfaces/IProperties';
import { ConfigService } from '@nestjs/config'

@Injectable()
export class PropertiesService {

    private readonly logger = new Logger(PropertiesService.name, { timestamp: true })

    constructor(
        private readonly configService: ConfigService
    ){}

    async getPropertiesInventory(): Promise<IResult>{
        try {
            const inventory_url = this.configService.get('INVENTORY_URL')
            const inventory_path = this.configService.get('INVENTORY_PATH')
            this.logger.log(`Inventory URL -> ${inventory_url+inventory_path}`)
            const response: IResult = await axios.get(inventory_url + inventory_path, {
                headers: {
                    'x-api-key': this.configService.get('INVENTORY_API_KEY')
                }
            })
            return response
        } catch (error) {
            throw error
        }
    }

    async selectProperties(selectedProperties: Array<number>): Promise<IProperty[]>{
        try {
            const properties: IResult = await this.getPropertiesInventory()
            let user_properties: IProperty[] = properties.data["data"]
                .filter(obj => selectedProperties.includes(obj.id))
                .map(obj => ({
                    id: obj.id,
                    titulo: obj.titulo
                }))
            
            return user_properties
        } catch (error) {
            throw error
        }
    }
}
