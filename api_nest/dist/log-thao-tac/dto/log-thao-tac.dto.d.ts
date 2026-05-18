export declare class CreateLogThaoTacDto {
    url: string;
    method: string;
    user_id?: number;
    user_name?: string;
    url_description?: string;
    description?: string;
    log_type?: number | null;
    severity?: string;
    body?: string;
    statusCode?: string;
    device_id?: string;
}
export declare class UpdateLogThaoTacDto {
    nguoi_cap_nhat?: number;
}
