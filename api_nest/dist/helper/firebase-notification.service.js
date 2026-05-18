"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var FirebaseNotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseNotificationService = void 0;
const globalConfig_service_1 = require("../core/globalconfig/globalConfig.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const admin = require("firebase-admin");
const app_1 = require("firebase-admin/app");
const messaging_1 = require("firebase-admin/messaging");
let FirebaseNotificationService = FirebaseNotificationService_1 = class FirebaseNotificationService {
    constructor(configService, globalConfigService) {
        this.configService = configService;
        this.globalConfigService = globalConfigService;
        this.logger = new common_1.Logger(FirebaseNotificationService_1.name);
        this.initFirebaseConnection();
    }
    async initFirebaseConnection() {
        try {
            const projectId = await this.globalConfigService.getConfigByKeyCache('FIREBASE_PROJECT_ID');
            const clientEmail = await this.globalConfigService.getConfigByKeyCache('FIREBASE_CLIENT_EMAIL');
            const privateKey = await this.globalConfigService.getConfigByKeyCache('FIREBASE_PRIVATE_KEY');
            const firebaseConfig = {
                projectId: projectId,
                clientEmail: clientEmail,
                privateKey: privateKey,
            };
            firebaseConfig.privateKey = firebaseConfig.privateKey.replace(/\\n/g, '\n');
            this.app = admin.initializeApp({
                credential: (0, app_1.cert)(firebaseConfig),
            });
            this.logger.debug(`Initial connection to Firebase: PROJECT_ID: ${projectId} >> CLIENT_EMAIL: ${clientEmail}`);
        }
        catch (error) {
            this.logger.error('@initFirebaseConnection > ' + error);
        }
    }
    sendFirebaseNotification(data) {
        const message = {
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
            (0, messaging_1.getMessaging)()
                .sendEachForMulticast(message)
                .then((response) => {
                this.logger.log('@sendFirebaseNotification > ' + JSON.stringify(response));
                const successTokens = [];
                const failedTokens = [];
                response.responses.forEach((resp, idx) => {
                    if (!resp.success) {
                        failedTokens.push(data.tokens[idx]);
                    }
                    else {
                        successTokens.push(data.tokens[idx]);
                    }
                });
                resolve({ successTokens, failedTokens });
            })
                .catch((error) => {
                this.logger.error('@sendFirebaseNotification > ' +
                    JSON.stringify(data) +
                    ' > ' +
                    error);
                reject(error);
            });
        });
    }
};
FirebaseNotificationService = FirebaseNotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        globalConfig_service_1.GlobalConfigService])
], FirebaseNotificationService);
exports.FirebaseNotificationService = FirebaseNotificationService;
//# sourceMappingURL=firebase-notification.service.js.map