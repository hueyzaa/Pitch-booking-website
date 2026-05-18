import { GlobalConfigService } from '@core/globalconfig/globalConfig.service';
import { ConfigService } from '@nestjs/config';
import { App } from 'firebase-admin/app';
import { SendFirebaseNotificationDto } from './dto/messaging.dto';
import { SendMessagingResult } from './interfaces/firestore.interface';
export declare class FirebaseNotificationService {
    private configService;
    private readonly globalConfigService;
    private readonly logger;
    app: App;
    readonly firestore: FirebaseFirestore.Firestore;
    constructor(configService: ConfigService, globalConfigService: GlobalConfigService);
    initFirebaseConnection(): Promise<void>;
    sendFirebaseNotification(data: SendFirebaseNotificationDto): Promise<SendMessagingResult>;
}
