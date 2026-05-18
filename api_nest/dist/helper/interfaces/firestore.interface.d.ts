export interface ClientToken {
    id: string;
    channel: string;
    userid: number;
    token: string;
    created_at: Date;
}
export interface SendMessagingResult {
    successTokens: string[];
    failedTokens: string[];
}
