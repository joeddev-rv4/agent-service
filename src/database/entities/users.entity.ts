import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    email: string

    @Column()
    name: string

    @Column()
    phone: number

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date
}