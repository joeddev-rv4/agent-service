import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service'
import { FirebaseService } from '../database/firebase/firebase.service';

@Controller('/user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly firebaseService: FirebaseService
    ) {}

    @Get('getCollection/:collection')
    findUserFirebase(@Param('collection') collection: string){
        return this.firebaseService.getCollection(collection)
    }

    @Get('getUserByJid/:jid')
    getUserByJid(@Param('jid') jid: string){
        return this.userService.findUserFirebase(jid)
    }

    @Get('getUserSalesByBroker/:brokerId')
    getUserSalesByJid(@Param('brokerId') brokerId: string){
        return this.firebaseService.getSalesByBrokerId(brokerId)
    }

    

}
