export class SendFirebaseNotificationDto {
  title: string;
  body: string;
  tokens: string[];
  data?: any;
  link?: string;
}
