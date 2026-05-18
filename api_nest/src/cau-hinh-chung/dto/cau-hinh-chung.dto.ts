export class CreateCauHinhChungDto {
  //[dtoString]
  nguoi_tao?: number;
  nguoi_cap_nhat?: number;
}

export class UpdateCauHinhChungDto {
  //[dtoString]
  key: string;
  value: string;
  nguoi_cap_nhat?: number;
}
