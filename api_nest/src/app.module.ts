import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { join } from 'path';

// --- Configuration ---
import { envConfig } from './configs/env.config';

// --- Core Modules & Database ---
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './database/database.module';
import { HelperModule } from './helper/helper.module';

// --- Controllers & Services ---
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PasswordCheckCronService } from './cron-job/password-check-cron.service';

// --- Global Filters, Guards, Interceptors ---
import { AllExceptionsFilter } from './core/filters/all-exception.filter';
import { ThrottlerExceptionFilter } from './core/filters/throttler-exception.filter';
import { PermissionGuard } from './core/guards/permission.guard';
import { TransformResponseInterceptor } from './core/iterceptors/transform-response.interceptor';

// --- Middleware ---
import { UserLogMiddleware } from './core/middleware/user-log.middleware';
import { AuthMiddleware } from '@core/middleware/auth.middleware';
import { HeaderCheckerMiddleware } from '@core/middleware/header-checker.middleware';
import { LoggerMiddleware } from '@core/middleware/logging.middleware';
import { SecureResourceAccessMiddleware } from '@core/middleware/secure-resource-access.middleware';

// --- Feature Modules ---
import { UsersModule } from './core/users/users.module';
import { ExampleModuleModule } from './example-module/example-module.module';
import { LogModule } from './log/log.module';
import { ThongBaoModule } from './thong-bao/thong-bao.module';
import { TinhModule } from './tinh/tinh.module';
import { XaModule } from './xa/xa.module';
import { LogThaoTacModule } from './log-thao-tac/log-thao-tac.module';
import { CauHinhChungModule } from './cau-hinh-chung/cau-hinh-chung.module';
import { HeThongModule } from './he-thong/he-thong.module';
import { UploadModule } from './upload/upload.module';
import { QuanLyUploadModule } from './quan-ly-upload/quan-ly-upload.module';
import { CauHinhTrangModule } from './cau-hinh-trang/cau-hinh-trang.module';
import { LoaiSanModule } from './loai-san/loai-san.module';
import { SanModule } from './san/san.module';
import { DoiTuongModule } from './doi-tuong/doi-tuong.module';
import { KhachHangModule } from './khach-hang/khach-hang.module';
import { BangGiaModule } from './bang-gia/bang-gia.module';
import { QuanLyGiaModule } from './quan-ly-gia/quan-ly-gia.module';
import { ThuChiModule } from './thu-chi/thu-chi.module';
import { TrangThaiSanModule } from './trang-thai-san/trang-thai-san.module';
import { DatSanModule } from './dat-san/dat-san.module';
/*IMPORT_OTHER_MODULE_HERE*/

/**
 * @module AppModule
 * @description
 * Module gốc (Root Module) của ứng dụng NestJS.
 */
@Module({
  imports: [
    // --- 1. Global Configuration ---
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV || '.env',
      cache: true,
      load: [envConfig],
      isGlobal: true,
    }),
    CacheModule.register({ isGlobal: true }),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 1000, // Tăng giới hạn để debug
      },
    ]),

    // --- 2. Static File Serving ---
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'secret'),
      serveRoot: '/secret',
    }),

    // --- 3. Database Connection ---
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('env.database'),
      inject: [ConfigService],
    }),
    DatabaseModule,

    // --- 4. Core & Helpers ---
    CoreModule,
    HelperModule,

    // --- 5. Feature Modules ---
    UsersModule,
    ThongBaoModule,
    TinhModule,
    XaModule,
    ExampleModuleModule,
    LogModule,
    LogThaoTacModule,
    CauHinhChungModule,
    HeThongModule,
    UploadModule,
    QuanLyUploadModule,
    CauHinhTrangModule,
    LoaiSanModule,
    SanModule,
    DoiTuongModule,
    KhachHangModule,
    BangGiaModule,
    QuanLyGiaModule,
    ThuChiModule,
    TrangThaiSanModule,
    DatSanModule,
    /*ADD_OTHER_MODULE_HERE*/
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PasswordCheckCronService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ThrottlerExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  public static logger = new Logger(AppModule.name);

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HeaderCheckerMiddleware)
      .exclude(
        'secret/uploads/(.*)',
        'public/uploads/(.*)',
        'public/uploads_old/(.*)',
        'filemau/(.*)',
        'images/(.*)',
        'he-thong/get-logo-va-ten',
        '(.*)/export/(.*)',
        'uploads/(.*)',
        'uploads_old/(.*)',
        'cau-hinh-trang/public',
        { path: 'san', method: RequestMethod.GET },
        { path: 'san/:id', method: RequestMethod.GET },
        { path: 'loai-san', method: RequestMethod.GET },
        { path: 'loai-san/options', method: RequestMethod.GET },
        { path: 'tinh/options', method: RequestMethod.GET },
        { path: 'xa/options', method: RequestMethod.GET },
      )
      .forRoutes('*');

    consumer
      .apply(AuthMiddleware)
      .exclude(
        'secret/uploads/(.*)',
        'public/uploads/(.*)',
        'public/uploads_old/(.*)',
        'auth/login',
        'auth/register',
        'auth/forgot-password',
        'auth/reset-password',
        'auth/verify-otp',
        'he-thong/get-logo-va-ten',
        'auth/generate-otp',
        '/mobile-api/login',
        'filemau/(.*)',
        'images/(.*)',
        'example-module/*',
        'cau-hinh-trang/public',
        { path: 'san', method: RequestMethod.GET },
        { path: 'san/:id', method: RequestMethod.GET },
        { path: 'loai-san', method: RequestMethod.GET },
        { path: 'loai-san/options', method: RequestMethod.GET },
        { path: 'tinh/options', method: RequestMethod.GET },
        { path: 'xa/options', method: RequestMethod.GET },
      )
      .forRoutes('*');

    consumer
      .apply(LoggerMiddleware)
      .exclude(
        'secret/uploads/(.*)',
        'public/uploads/(.*)',
        'public/uploads_old/(.*)',
        'example-module/(.*)',
        'he-thong/get-logo-va-ten',
        'cau-hinh-trang/public',
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    consumer
      .apply(UserLogMiddleware)
      .exclude(
        'secret/uploads/(.*)',
        'public/uploads/(.*)',
        'public/uploads_old/(.*)',
        'auth/(.*)',
        '(.*)/options(.*)',
        'example-module/(.*)',
        '/log-thao-tac(.*)',
        'he-thong/get-logo-va-ten',
      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });

    consumer
      .apply(SecureResourceAccessMiddleware)
      .forRoutes('secret/uploads/(*)');
  }
}
