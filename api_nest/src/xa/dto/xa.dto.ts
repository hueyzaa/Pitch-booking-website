import { IsNotEmpty } from 'class-validator'; // eslint-disable-line

export class CreateXaDto {
  //[dtoString]
  nguoi_tao?: number;
  nguoi_cap_nhat?: number;
}

export class UpdateXaDto {
  //[dtoString]
  nguoi_cap_nhat?: number;
}
