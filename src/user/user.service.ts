import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { NotFoundError } from 'rxjs';
import { FirebaseService } from '../database/firebase/firebase.service';
import { IUser } from '../user/interfaces/user.interface'
import { UsersService } from '../database/users/users.service';


@Injectable()
export class UserService {
    
    private readonly logger = new Logger(UserService.name, { timestamp: true });

    constructor(
        private readonly firebaseService: FirebaseService,
        private readonly usersService: UsersService
    ){
        this.logger.log("UserService inicializado")
    }

    async findUserFirebase(user: string): Promise<IUser | null>{
        
        const response: any = {}
        const dataUser = await this.firebaseService.getUserByJid(user)
        if(!dataUser || dataUser == null){
            this.logger.log(`No data found for ${user}`)
            return null
        }
        const createdUser = await this.usersService.createUserIfNotExist(dataUser.email, dataUser.name, dataUser.phone)
        this.logger.log('Búsqueda en findUserFirebase exitosa')
        response.data_user = dataUser
        response.created_user = createdUser
        return response
    }
}
