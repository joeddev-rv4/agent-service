import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import mongoose, { Schema as MongooseSchema } from 'mongoose'

export type LogDocument = HydratedDocument<Admin_log>

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Admin_log {

    @Prop({ required: true })
    action: 'login' | 'logout' | 'agent_interaction' | 'appointment' | string

    @Prop({ required: true })
    entity: 'lared_agent' | 'admin_panel' | string

    @Prop({ required: 'true' })
    user: string

    @Prop()
    createdAt: string

    @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
    metadata: Record<string, any>;
}

export const LogSchema = SchemaFactory.createForClass(Admin_log)