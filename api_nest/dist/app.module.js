"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const schedule_1 = require("@nestjs/schedule");
const serve_static_1 = require("@nestjs/serve-static");
const typeorm_1 = require("@nestjs/typeorm");
const throttler_1 = require("@nestjs/throttler");
const cache_manager_1 = require("@nestjs/cache-manager");
const path_1 = require("path");
const env_config_1 = require("./configs/env.config");
const core_module_1 = require("./core/core.module");
const database_module_1 = require("./database/database.module");
const helper_module_1 = require("./helper/helper.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const password_check_cron_service_1 = require("./cron-job/password-check-cron.service");
const all_exception_filter_1 = require("./core/filters/all-exception.filter");
const throttler_exception_filter_1 = require("./core/filters/throttler-exception.filter");
const permission_guard_1 = require("./core/guards/permission.guard");
const transform_response_interceptor_1 = require("./core/iterceptors/transform-response.interceptor");
const user_log_middleware_1 = require("./core/middleware/user-log.middleware");
const auth_middleware_1 = require("./core/middleware/auth.middleware");
const header_checker_middleware_1 = require("./core/middleware/header-checker.middleware");
const logging_middleware_1 = require("./core/middleware/logging.middleware");
const secure_resource_access_middleware_1 = require("./core/middleware/secure-resource-access.middleware");
const users_module_1 = require("./core/users/users.module");
const example_module_module_1 = require("./example-module/example-module.module");
const log_module_1 = require("./log/log.module");
const thong_bao_module_1 = require("./thong-bao/thong-bao.module");
const tinh_module_1 = require("./tinh/tinh.module");
const xa_module_1 = require("./xa/xa.module");
const log_thao_tac_module_1 = require("./log-thao-tac/log-thao-tac.module");
const cau_hinh_chung_module_1 = require("./cau-hinh-chung/cau-hinh-chung.module");
const he_thong_module_1 = require("./he-thong/he-thong.module");
const upload_module_1 = require("./upload/upload.module");
const quan_ly_upload_module_1 = require("./quan-ly-upload/quan-ly-upload.module");
const cau_hinh_trang_module_1 = require("./cau-hinh-trang/cau-hinh-trang.module");
const loai_san_module_1 = require("./loai-san/loai-san.module");
const san_module_1 = require("./san/san.module");
const doi_tuong_module_1 = require("./doi-tuong/doi-tuong.module");
const quan_ly_gia_module_1 = require("./quan-ly-gia/quan-ly-gia.module");
const thu_chi_module_1 = require("./thu-chi/thu-chi.module");
const trang_thai_san_module_1 = require("./trang-thai-san/trang-thai-san.module");
const dat_san_module_1 = require("./dat-san/dat-san.module");
const danh_gia_module_1 = require("./danh-gia/danh-gia.module");
let AppModule = AppModule_1 = class AppModule {
    configure(consumer) {
        consumer
            .apply(header_checker_middleware_1.HeaderCheckerMiddleware)
            .exclude('secret/uploads/(.*)', 'public/uploads/(.*)', 'public/uploads_old/(.*)', 'filemau/(.*)', 'images/(.*)', 'he-thong/get-logo-va-ten', '(.*)/export/(.*)', 'uploads/(.*)', 'uploads_old/(.*)', 'cau-hinh-trang/public', { path: 'san', method: common_1.RequestMethod.GET }, { path: 'san/:id', method: common_1.RequestMethod.GET }, { path: 'loai-san', method: common_1.RequestMethod.GET }, { path: 'loai-san/options', method: common_1.RequestMethod.GET }, { path: 'tinh/options', method: common_1.RequestMethod.GET }, { path: 'xa/options', method: common_1.RequestMethod.GET })
            .forRoutes('*');
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .exclude('secret/uploads/(.*)', 'public/uploads/(.*)', 'public/uploads_old/(.*)', 'auth/login', 'auth/register', 'auth/forgot-password', 'auth/reset-password', 'auth/verify-otp', 'he-thong/get-logo-va-ten', 'auth/generate-otp', '/mobile-api/login', 'filemau/(.*)', 'images/(.*)', 'example-module/*', 'cau-hinh-trang/public', { path: 'san', method: common_1.RequestMethod.GET }, { path: 'san/:id', method: common_1.RequestMethod.GET }, { path: 'loai-san', method: common_1.RequestMethod.GET }, { path: 'loai-san/options', method: common_1.RequestMethod.GET }, { path: 'tinh/options', method: common_1.RequestMethod.GET }, { path: 'xa/options', method: common_1.RequestMethod.GET })
            .forRoutes('*');
        consumer
            .apply(logging_middleware_1.LoggerMiddleware)
            .exclude('secret/uploads/(.*)', 'public/uploads/(.*)', 'public/uploads_old/(.*)', 'example-module/(.*)', 'he-thong/get-logo-va-ten', 'cau-hinh-trang/public')
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
        consumer
            .apply(user_log_middleware_1.UserLogMiddleware)
            .exclude('secret/uploads/(.*)', 'public/uploads/(.*)', 'public/uploads_old/(.*)', 'auth/(.*)', '(.*)/options(.*)', 'example-module/(.*)', '/log-thao-tac(.*)', 'he-thong/get-logo-va-ten')
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
        consumer
            .apply(secure_resource_access_middleware_1.SecureResourceAccessMiddleware)
            .forRoutes('secret/uploads/(*)');
    }
};
AppModule.logger = new common_1.Logger(AppModule_1.name);
AppModule = AppModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: process.env.NODE_ENV || '.env',
                cache: true,
                load: [env_config_1.envConfig],
                isGlobal: true,
            }),
            cache_manager_1.CacheModule.register({ isGlobal: true }),
            schedule_1.ScheduleModule.forRoot(),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 1000,
                },
            ]),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
                serveRoot: '/public',
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'secret'),
                serveRoot: '/secret',
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => configService.get('env.database'),
                inject: [config_1.ConfigService],
            }),
            database_module_1.DatabaseModule,
            core_module_1.CoreModule,
            helper_module_1.HelperModule,
            users_module_1.UsersModule,
            thong_bao_module_1.ThongBaoModule,
            tinh_module_1.TinhModule,
            xa_module_1.XaModule,
            example_module_module_1.ExampleModuleModule,
            log_module_1.LogModule,
            log_thao_tac_module_1.LogThaoTacModule,
            cau_hinh_chung_module_1.CauHinhChungModule,
            he_thong_module_1.HeThongModule,
            upload_module_1.UploadModule,
            quan_ly_upload_module_1.QuanLyUploadModule,
            cau_hinh_trang_module_1.CauHinhTrangModule,
            loai_san_module_1.LoaiSanModule,
            san_module_1.SanModule,
            doi_tuong_module_1.DoiTuongModule,
            quan_ly_gia_module_1.QuanLyGiaModule,
            thu_chi_module_1.ThuChiModule,
            trang_thai_san_module_1.TrangThaiSanModule,
            dat_san_module_1.DatSanModule,
            danh_gia_module_1.DanhGiaModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            password_check_cron_service_1.PasswordCheckCronService,
            {
                provide: core_1.APP_FILTER,
                useClass: all_exception_filter_1.AllExceptionsFilter,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: throttler_exception_filter_1.ThrottlerExceptionFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: transform_response_interceptor_1.TransformResponseInterceptor,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: permission_guard_1.PermissionGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map