"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const slugify_1 = require("slugify");
async function addSlugColumns() {
    const dataSource = new typeorm_1.DataSource({
        type: 'mysql',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_DATABASE || 'san_giao_dich_so_khcn',
    });
    try {
        await dataSource.initialize();
        console.log('✓ Đã kết nối database');
        const queryRunner = dataSource.createQueryRunner();
        await queryRunner.connect();
        console.log('\n--- Xử lý bảng nhom_san_pham ---');
        const nhomSlugExists = await queryRunner.query(`
      SELECT COUNT(*) as count 
      FROM information_schema.COLUMNS 
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'nhom_san_pham' 
        AND COLUMN_NAME = 'slug'
    `);
        if (nhomSlugExists[0].count === 0) {
            console.log('→ Thêm cột slug vào nhom_san_pham...');
            await queryRunner.query(`
        ALTER TABLE nhom_san_pham 
        ADD COLUMN slug VARCHAR(255) NULL AFTER mo_ta
      `);
            console.log('✓ Đã thêm cột slug');
            console.log('→ Sinh slug cho records hiện có...');
            const nhomRecords = await queryRunner.query(`
        SELECT id, ten FROM nhom_san_pham
      `);
            const slugMap = new Map();
            for (const record of nhomRecords) {
                let slug = (0, slugify_1.default)(record.ten, {
                    lower: true,
                    strict: true,
                    locale: 'vi',
                    trim: true,
                });
                let finalSlug = slug;
                let counter = 1;
                while (slugMap.has(finalSlug)) {
                    counter++;
                    finalSlug = `${slug}-${counter}`;
                }
                slugMap.set(finalSlug, record.id);
                await queryRunner.query(`UPDATE nhom_san_pham SET slug = ? WHERE id = ?`, [finalSlug, record.id]);
            }
            console.log(`✓ Đã sinh slug cho ${nhomRecords.length} records`);
            console.log('→ Thêm unique constraint...');
            await queryRunner.query(`
        ALTER TABLE nhom_san_pham 
        MODIFY COLUMN slug VARCHAR(255) NOT NULL,
        ADD UNIQUE KEY uk_nhom_san_pham_slug (slug)
      `);
            console.log('✓ Đã thêm unique constraint');
        }
        else {
            console.log('⊗ Cột slug đã tồn tại, bỏ qua');
        }
        console.log('\n--- Xử lý bảng tags ---');
        const tagsSlugExists = await queryRunner.query(`
      SELECT COUNT(*) as count 
      FROM information_schema.COLUMNS 
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'tags' 
        AND COLUMN_NAME = 'slug'
    `);
        if (tagsSlugExists[0].count === 0) {
            console.log('→ Thêm cột slug vào tags...');
            await queryRunner.query(`
        ALTER TABLE tags 
        ADD COLUMN slug VARCHAR(255) NULL AFTER mo_ta
      `);
            console.log('✓ Đã thêm cột slug');
            console.log('→ Sinh slug cho records hiện có...');
            const tagsRecords = await queryRunner.query(`
        SELECT id, ten FROM tags
      `);
            const slugMap = new Map();
            for (const record of tagsRecords) {
                let slug = (0, slugify_1.default)(record.ten, {
                    lower: true,
                    strict: true,
                    locale: 'vi',
                    trim: true,
                });
                let finalSlug = slug;
                let counter = 1;
                while (slugMap.has(finalSlug)) {
                    counter++;
                    finalSlug = `${slug}-${counter}`;
                }
                slugMap.set(finalSlug, record.id);
                await queryRunner.query(`UPDATE tags SET slug = ? WHERE id = ?`, [
                    finalSlug,
                    record.id,
                ]);
            }
            console.log(`✓ Đã sinh slug cho ${tagsRecords.length} records`);
            console.log('→ Thêm unique constraint...');
            await queryRunner.query(`
        ALTER TABLE tags 
        MODIFY COLUMN slug VARCHAR(255) NOT NULL,
        ADD UNIQUE KEY uk_tags_slug (slug)
      `);
            console.log('✓ Đã thêm unique constraint');
        }
        else {
            console.log('⊗ Cột slug đã tồn tại, bỏ qua');
        }
        await queryRunner.release();
        console.log('\n✓✓✓ Migration hoàn tất! ✓✓✓\n');
    }
    catch (error) {
        console.error('✗ Lỗi migration:', error);
        throw error;
    }
    finally {
        await dataSource.destroy();
    }
}
addSlugColumns()
    .then(() => {
    console.log('Done!');
    process.exit(0);
})
    .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
});
//# sourceMappingURL=add-slug-to-categories-and-tags.js.map