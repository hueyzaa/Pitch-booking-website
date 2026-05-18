import { IsIn, IsNotEmpty } from 'class-validator';

export class CreateLogThaoTacDto {
  @IsNotEmpty()
  url: string;
  @IsNotEmpty()
  @IsIn(['GET', 'POST', 'PATCH', 'DELETE'])
  method: string;

  user_id?: number;
  user_name?: string;
  url_description?: string;
  description?: string;

  @IsIn([null, 0, 1, 2, 3, 4, 5])
  log_type?: number | null;

  @IsIn([null, 0, 1, 2, 3])
  severity?: string;

  body?: string;
  statusCode?: string;
  device_id?: string;
}

export class UpdateLogThaoTacDto {
  nguoi_cap_nhat?: number;
}
