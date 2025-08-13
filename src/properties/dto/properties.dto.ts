import { IsNotEmpty, IsArray } from 'class-validator'

export class ObtainPropertiesDto {
    @IsNotEmpty()
    @IsArray()
    properties: Array<number>
}