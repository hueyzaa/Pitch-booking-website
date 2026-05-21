"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helper_service_1 = require("./helper/helper.service");
const typeorm_1 = require("typeorm");
const nguoi_dung_entity_1 = require("./database/entities/auth/nguoi-dung.entity");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const helperService = app.get(helper_service_1.HelperService);
    const dataSource = app.get(typeorm_1.DataSource);
    try {
        const user = await dataSource.getRepository(nguoi_dung_entity_1.NguoiDung).findOneBy({ id: 345 });
        if (!user) {
            console.error('User 345 not found in DB!');
            return;
        }
        const token = await helperService.signJWTToken(user, {
            expiresIn: '1d',
        });
        console.log('SIGNED JWT TOKEN:', token);
        const axios = (await Promise.resolve().then(() => require('d:/PitchBookingWebsite/api_nest/node_modules/axios'))).default;
        const response = await axios.get('http://localhost:9999/loai-san', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log('REAL RUNNING API RESPONSE:', JSON.stringify(response.data, null, 2));
    }
    catch (error) {
        console.error('Error calling running API:', error.response ? error.response.data : error.message);
    }
    finally {
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=test_call_api.js.map