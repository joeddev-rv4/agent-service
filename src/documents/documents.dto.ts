// upload.dto.ts
import { IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class UploadDto {
  @IsString() id: string;
  @IsString() sale_id: string;
}
