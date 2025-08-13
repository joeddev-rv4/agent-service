import { IsString, IsNotEmpty, IsEnum, IsDateString, IsObject, IsArray } from 'class-validator'

export class CreateLogDto {
  @IsEnum(['login', 'logout', 'agent_interaction', 'other'], {
    message: 'Action must be one of: login, logout, agent_interaction, other',
  })
  @IsNotEmpty({ message: 'Action is required' })
  action: 'login' | 'logout' | 'agent_interaction' | string;

  @IsEnum(['lared_agent', 'admin_panel', 'other'], {
    message: 'Entity must be one of: lared_agent, admin_panel, other',
  })

  @IsNotEmpty({ message: 'Entity is required' })
  entity: 'lared_agent' | 'admin_panel' | string;

  @IsString({ message: 'User must be a string' })
  @IsNotEmpty({ message: 'User is required' })
  user: string;

  @IsDateString({}, { message: 'CreatedAt must be a valid ISO 8601 date string' })
  createdAt?: string;

  @IsObject({ message: 'Metadata must be an object' })
  @IsNotEmpty({ message: 'Metadata is required' })
  metadata: Record<string, any>;
}

export class UserLogDto {
  
  @IsString({ message: 'User is required' })
  user: string;

  @IsArray({ message: 'Action is required' })
  action: string[];
}