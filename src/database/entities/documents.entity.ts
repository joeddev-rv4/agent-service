import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Documentos {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    id_sale: string

    @Column()
    tipo_doc: number

    @Column()
    content: string
}