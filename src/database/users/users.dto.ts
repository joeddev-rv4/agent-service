import { IsString, IsNotEmpty, IsEnum, IsDateString, IsObject, IsArray } from 'class-validator'

export class UsersDto {
    @IsNotEmpty({ message: 'Email is required' })
    @IsString({ message: 'Email must be a string' })
    email: string

    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string

    @IsNotEmpty({ message: 'Phone is required' })
    @IsEnum({ message: 'Phone must be a number' })
    phone: number
}

export class FindUserDto {
    @IsNotEmpty({ message: 'Phone is required' })
    @IsString()
    phone: string
}

export class CreatePropertyViewDto {
    @IsNotEmpty({ message: 'id_property is required' })
    @IsString()
    id_property: string

    @IsNotEmpty({ message: 'scheduled_at is required' })
    @IsString()
    scheduled_at: string

    @IsNotEmpty({ message: 'user_id is required' })
    @IsString()
    user_id: string
}