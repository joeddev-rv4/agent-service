import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin'
import { IPropertyUser, IUser, IUserSales, IUserRequest } from 'app/src/user/interfaces/user.interface';
import { PropertiesService } from 'app/src/properties/properties.service';
import { FieldPath } from "firebase-admin/firestore"; // o firebase/firestore en cliente
import { DocumentsService } from 'app/src/documents/documents.service';

@Injectable()
export class FirebaseService {

    private readonly logger = new Logger(FirebaseService.name, { timestamp: true })

    constructor(
        private readonly propertiesService: PropertiesService,
        private readonly documentsService: DocumentsService
    ){}

    getAuth(){
        return admin.auth()
    }

    getFirestore(){
        return admin.firestore()
    }

    async getCollection(collectionName: string){
        const snapshot = await this.getFirestore().collection(collectionName).get()
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    }

    async getUserByJid(jid: string): Promise<IUser | null>{
        try {
            const db = this.getFirestore()
            const usersRef = db.collection('users')
            const snapshot = await usersRef.where('phone', '==', jid).get()
            if(snapshot.empty){
                return null
            }

            const doc = snapshot.docs[0]
            const userData: IUser = { id: doc.id, ...doc.data() } as IUser

            let optional_prop: any = []
            let properties: any = await this.getPropertiesByBrokerId(userData.id)
            for(let p = 0; p <= properties.length-1; p++){
                if(properties[p].type == 'direct'){
                    optional_prop.push(properties[p].propertyId)
                }
            }
            
            userData.properties = optional_prop
            
            return userData
        } catch (error) {
            throw new InternalServerErrorException('Error consulting firebase ' + error.message)
        }
    }

    async getSalesByBrokerId(brokerId: string){
        try {
            const db = this.getFirestore()
            const saleRef = db.collection('sales')
            const snapshot = await saleRef.where('brokerId', '==', brokerId).get()
            if(snapshot.empty){
                return null
            }
            const sales: any = []
            for(let u = 0; u <= snapshot.docs.length-1; u++){
                const docProp = snapshot.docs[u]
                const userSales: IUserSales = { 
                    id: docProp.id , 
                    ...docProp.data() as Omit<IUserSales, "id">
                }
                sales.push(userSales)
            }

            const saleOrderData: any = []
            for (let index = 0; index < sales.length; index++) {
                const propertyData: any = await this.propertiesService.selectProperties([parseInt(sales[index].propertyId)])
                
                const requestRef = await db.collection('requests').doc(sales[index].buyerRequestId).get()
                const documentsData = await this.documentsService.getDocumentsListByUser(sales[index].id)

                const indexData: any = {}
                indexData.saleId = sales[index].id
                indexData.propertyId = sales[index].propertyId
                indexData.propertyName = propertyData[0].titulo
                indexData.client = requestRef.data()
                indexData.documents = documentsData
                saleOrderData.push(indexData)
            }

            const response = {
                "brokerId": brokerId,
                "totalSales": sales.length,
                "sales": saleOrderData
            }

            return response
        } catch (error) {
            this.logger.log(`Error -> ${error}`)
            throw new InternalServerErrorException(error)
            
        }
    }

    async getPropertiesByBrokerId(brokerId: string){
        try {
            const db = this.getFirestore()
            const saleRef = db.collection('sales')
            const snapshot = await saleRef.where('brokerId', '==', brokerId).get()
            if(snapshot.empty){
                return null
            }
            const properties: any = []
            for(let u = 0; u <= snapshot.docs.length-1; u++){
                const docProp = snapshot.docs[u]
                const userProperty: IUserSales = { brokerId: docProp.data["brokerId"], ...docProp.data() } as IUserSales
                properties.push(userProperty)
            }
            return properties
        } catch (error) {
            this.logger.log(`Error -> ${error}`)
            throw new InternalServerErrorException(error)
            
        }
    }
}
