import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateHeThongDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  logoUrl?: string;

  //[dtoString]
  nguoi_tao?: number;
  nguoi_cap_nhat?: number;
}
