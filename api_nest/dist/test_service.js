"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const loai_san_service_1 = require("./loai-san/loai-san.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const service = app.get(loai_san_service_1.LoaiSanService);
    try {
        const res = await service.findAllWithPagination({
            page: 1,
            limit: 10,
            sort: [{
                    field: 'createdAt',
                    direction: 'desc'
                }],
            filters: [
                {
                    field: 'trangThai',
                    operator: 'equal',
                    value: '1'
                }
            ],
            startDate: null,
            endDate: null
        });
        console.log('RESULT COLLECTION:');
        console.log(JSON.stringify(res.collection, null, 2));
    }
    catch (error) {
        console.error('Error executing service:', error);
    }
    finally {
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=test_service.js.map