import { IsNotEmpty } from 'class-validator';

export class CreateLoaiSanDto {

  //[dtoString]
  nguoi_tao?: number;
  nguoi_cap_nhat?: number;
}

export class UpdateLoaiSanDto {

  //[dtoString]
  nguoi_cap_nhat?: number;
}
