import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Int32, Repository } from 'typeorm';
import { Documentos } from 'app/src/database/entities/documents.entity';

@Injectable()
export class DocumentsService {
    private readonly logger = new Logger(DocumentsService.name, { timestamp: true })

    constructor(
        @InjectRepository(Documentos)
        private readonly documentsRepository: Repository<Documentos>
    ){}

    async getDocumentsListByUser(sale_id: string){
        try {
            const documentsData = await this.documentsRepository.find({
                where: { id_sale: sale_id }
            })

            for (let index = 0; index < documentsData.length; index++) {
                this.logger.log(documentsData[index])
            }
            return documentsData
        } catch (error) {
            this.logger.log(`Error al obtener listado de documentos: ${error}`)
        }
    }
}
