"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const cookieParser = require("cookie-parser");
const express_1 = require("express");
const path_1 = require("path");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const logger = new common_1.Logger('Bootstrap');
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('env.port') || 3000;
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
    app.use(cookieParser());
    app.enableCors({
        origin: [
            'http://manfolio.id.vn',
            'https://manfolio.id.vn',
            'http://admin.manfolio.id.vn',
            'https://admin.manfolio.id.vn',
            'http://api.manfolio.id.vn',
            'https://api.manfolio.id.vn',
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:9999',
            'http://192.168.1.2:3000',
            'http://192.168.1.2:3001',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'), {
        prefix: '/public/',
    });
    await app.listen(port, '0.0.0.0');
    logger.log(`Application is running on: http://localhost:${port}`);
    logger.log(`Network access: http://192.168.1.2:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map