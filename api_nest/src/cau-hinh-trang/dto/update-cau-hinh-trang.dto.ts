import {
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class UpdateCauHinhTrangDto {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsOptional()
  value: string;
}
