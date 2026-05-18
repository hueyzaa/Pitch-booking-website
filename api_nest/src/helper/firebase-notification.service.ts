import { GlobalConfigService } from '@core/globalconfig/globalConfig.service';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { App, cert } from 'firebase-admin/app';
import { MulticastMessage, getMessaging } from 'firebase-admin/messaging';
import { SendFirebaseNotificationDto } from './dto/messaging.dto';
import { SendMessagingResult } from './interfaces/firestore.interface';
@Injectable()
export class FirebaseNotificationService {
  private readonly logger = new Logger(FirebaseNotificationService.name);

  public app: App;
  public readonly firestore: FirebaseFirestore.Firestore;

  constructor(
    private configService: ConfigService, // @InjectRepository(ThongBao) // private thongBaoRepo: Repository<ThongBao>,
    private readonly globalConfigService: GlobalConfigService,
  ) {
    this.initFirebaseConnection();
  }

  async initFirebaseConnection() {
    try {
      const projectId: string =
        await this.globalConfigService.getConfigByKeyCache(
          'FIREBASE_PROJECT_ID',
        );
      const clientEmail: string =
        await this.globalConfigService.getConfigByKeyCache(
          'FIREBASE_CLIENT_EMAIL',
        );
      const privateKey: string =
        await this.globalConfigService.getConfigByKeyCache(
          'FIREBASE_PRIVATE_KEY',
        );
      const firebaseConfig = {
        projectId: projectId,
        clientEmail: clientEmail,
        privateKey: privateKey,
      };
      firebaseConfig.privateKey = firebaseConfig.privateKey.replace(
        /\\n/g,
        '\n',
      );

      this.app = admin.initializeApp({
        credential: cert(firebaseConfig),
      });
      this.logger.debug(
        `Initial connection to Firebase: PROJECT_ID: ${projectId} >> CLIENT_EMAIL: ${clientEmail}`,
      );
    } catch (error) {
      this.logger.error('@initFirebaseConnection > ' + error);
    }
  }

  sendFirebaseNotification(
    data: SendFirebaseNotificationDto,
  ): Promise<SendMessagingResult> {
    const message: MulticastMessage = {
      //TODO Under 500 Token per time
      tokens: data.tokens,
      notification: {
        title: data.title,
        body: data.body,
      },
      android: { notification: { sound: 'default' } },
      apns: { payload: { aps: { sound: 'default' } } },
      data: data.data,
      webpush: {
        fcmOptions: {
          link: data.link,
        },
      },
    };

    return new Promise((resolve, reject) => {
      getMessaging()
        .sendEachForMulticast(message)
        .then((response) => {
          this.logger.log(
            '@sendFirebaseNotification > ' + JSON.stringify(response),
          );
          const successTokens = [];
          const failedTokens = [];
          response.responses.forEach((resp, idx) => {
            if (!resp.success) {
              failedTokens.push(data.tokens[idx]);
            } else {
              successTokens.push(data.tokens[idx]);
            }
          });
          resolve({ successTokens, failedTokens });
        })
        .catch((error) => {
          this.logger.error(
            '@sendFirebaseNotification > ' +
              JSON.stringify(data) +
              ' > ' +
              error,
          );
          reject(error);
        });
    });
  }
}
