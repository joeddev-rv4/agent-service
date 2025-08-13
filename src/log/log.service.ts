import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Admin_log } from '../schemas/log.schema'
import { Model } from 'mongoose'
import { CreateLogDto } from './log.dto';


@Injectable()
export class LogService {

    private readonly logger = new Logger(LogService.name, { timestamp: true });

    constructor(@InjectModel(Admin_log.name) private logModel: Model<Admin_log>) {}

    async create(createLogDto: CreateLogDto): Promise<Admin_log> {
        const createdLog = new this.logModel(createLogDto)
        return createdLog.save()
    }

    async findAllLogs(): Promise<Admin_log[]> {
        return this.logModel.find().exec()
    }

    async findLastLogs(user: string, action: string[]): Promise<Admin_log[] | null>{
        this.logger.log(`Data: ${user}, ${action}`)
        const filter = {
            'user': user,
            'action': {
                '$in': action
            }
        }

        /*const data: any = await this.logModel
        .find({ user: user, action: {$in: action} })
        .sort({ createdAt: -1 })
        .limit(10)
        .exec()*/

        const data: any = await this.logModel
        .find(filter)
        .sort({ createdAt: -1 })
        .limit(3)
        .exec()

        this.logger.log(data)

        let interactions: any = []
        for (let index = 0; index <= data.length - 1; index++) {
            this.logger.log(index)
            let interaction = data[index].metadata
            let inter_obj = {
                "type": interaction.type,
                "content":interaction.content
            }
            if(index != 0){
                interactions.push(inter_obj)
            }
        }

        this.logger.log(interactions)

        return interactions
    }
}
