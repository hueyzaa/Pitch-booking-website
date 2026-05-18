import { IsNotEmpty } from 'class-validator'; // eslint-disable-line

export class CreateQuanLyUploadDto {
  original_name?: string;
  file_path?: string;
  mime_type?: string;
  destination?: string;
  file_name?: string;
  path?: string;
  size?: number;
  file_type?: string;
  //[dtoString]
  nguoi_tao?: number;
  nguoi_cap_nhat?: number;
}

export class UpdateQuanLyUploadDto {
  original_name?: string;
  file_path?: string;
  mime_type?: string;
  destination?: string;
  file_name?: string;
  path?: string;
  size?: number;
  file_type?: string;
  //[dtoString]
  nguoi_tao?: number;

  nguoi_cap_nhat?: number;
}
