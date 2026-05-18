import { IsNotEmpty } from 'class-validator'; // eslint-disable-line

export class CreateLogDto {
  //[dtoString]
  nguoi_tao?: number;
  nguoi_cap_nhat?: number;
}

export class UpdateLogDto {
  //[dtoString]
  nguoi_cap_nhat?: number;
}
