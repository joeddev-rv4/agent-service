import { Injectable, InternalServerErrorException, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Int32, Repository } from 'typeorm';
import { Users } from '../entities/users.entity';
import { PropertyViewing } from '../entities/property_viewing.entity';
import { PropertiesService } from 'app/src/properties/properties.service';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name, { timestamp: true })

    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,

        @InjectRepository(PropertyViewing)
        private readonly propertyViewing: Repository<PropertyViewing>,

        private readonly propertiesService: PropertiesService
    ){
        this.logger.log('Users Repository Postgres init.')
    }

    async getUser(phone: string): Promise<Users | null>{
        this.logger.log(`Search user with phone ${phone} in postgres ...` )
        try{
            const user = await this.usersRepository.findOne({
                where: { phone: parseInt(phone) }
            })

            this.logger.log(`Usuario encontrado: ${user}`)

            return user
        } catch (error) {
            this.logger.log(`Error finding user with phone ${phone}, ERROR -> ${error}` )
            throw new InternalServerErrorException('Error in finding user.')
        }
    }

    async createUserIfNotExist(email: string, name: string, phone: string) {
        const number_phone = phone.replace(/\D/g, '').replace(/^502/, '')
        const validateUser: any = await this.getUser(number_phone) // Busca en postgres
        
        const data: any = {}
        if(!validateUser?.id){
            this.logger.log(`Validating in postgres ...`)
            const created_user = await this.createUser(email, name, parseInt(number_phone))
            data.id = created_user.id
        }
        data.id = validateUser.id
        return data
    }

    async createUser(
        email: string,
        name: string,
        phone: number,
    ): Promise<Users> {
        this.logger.log(`Creating user ${name} in postgres`)
        try {
            let created_at = new Date()
            const user = this.usersRepository.create({
                email,
                name,
                phone,
                created_at
            })
            const savedUser = await this.usersRepository.save(user)
            this.logger.log(`User created with ID: ${savedUser.id}`)
            return savedUser
        } catch (error) {
            this.logger.error(`Error in creating user: ${error.message}`, error.stack)
            throw new InternalServerErrorException('Error in creating user.')
        }
    }

    async createPropertyViewing(
        id_property: string,
        scheduled_at: string,
        user_id: string
    ){
        try {
            let created_at = new Date()
            let status = 1
            const propertyView = this.propertyViewing.create({
                status,
                id_property,
                scheduled_at,
                created_at,
                user_id
            })
            const savedPropertyView = await this.propertyViewing.save(propertyView)
            return savedPropertyView
        } catch (error) {
            this.logger.error(`Error in creating property view: ${error.message}`, error.stack)
            throw new InternalServerErrorException('Error in creating property view.')
        }
    }

    async getUserData(id: string){
        const user = await this.usersRepository.findOne({
            where: { id: id }
        })
        return user
    }

    async getAllPropertiesViews(){
        try {
            const responsePropertiesViews: any = []
            const propertiesViews = await this.propertyViewing.find()

            for (let index = 0; index < propertiesViews.length; index++) {
                const element = propertiesViews[index];
                const propertyData:any = await this.propertiesService.selectProperties([parseInt(element.id_property)])
                
                //this.logger.log(propertyData[0]?.titulo)
                const userData = await this.getUserData(element.user_id)
                responsePropertiesViews.push(
                    {
                        "view_id":element.id,
                        "view_number": element.codigo_cita,
                        "id_property": element.id_property,
                        "property_name": propertyData[0]?.titulo,
                        "id_user": element.user_id,
                        "user_name": userData?.name,
                        "scheduled_at": element.scheduled_at,
                        "created_at": element.created_at
                    }
                )
            }

            return responsePropertiesViews
        } catch (error) {
            this.logger.error(`Error obtaining properties views: ${error.message}`, error.stack)
            throw new InternalServerErrorException('Error obtaining properties views.')
        }
    }
}
