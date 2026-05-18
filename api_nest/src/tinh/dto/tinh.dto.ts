import { IsNotEmpty } from 'class-validator'; // eslint-disable-line

export class CreateTinhDto {
  //[dtoString]
  nguoi_tao?: number;
  nguoi_cap_nhat?: number;
}

export class UpdateTinhDto {
  //[dtoString]
  nguoi_cap_nhat?: number;
}
