export class CreateSessionDto {
  nguoi_dung_id: number | null;
  access_token: string | null;
  refresh_token: string | null;
  firebase_token: string | null;
  device_id: string;
  nguoi_tao: number;
  nguoi_cap_nhat: number;
}
