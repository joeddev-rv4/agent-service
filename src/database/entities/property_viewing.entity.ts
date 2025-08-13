import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PropertyViewing {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    status: number

    @Column()
    id_property: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    scheduled_at: Date

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @Column()
    user_id: string

    @Column()
    codigo_cita: string
}