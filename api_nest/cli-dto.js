const mysql = require('mysql');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { paramCase } = require('change-case');

dotenv.config();

// Tạo kết nối đến cơ sở dữ liệu MySQL
const connection = mysql.createConnection({
  host: process.env.DATABASE_HOTS, // Thay đổi host theo cài đặt của bạn
  user: process.env.DATABASE_USER, // Thay đổi username theo cài đặt của bạn
  password: process.env.DATABASE_PASS, // Thay đổi mật khẩu theo cài đặt của bạn
  database: process.env.DATABASE_NAME, // Thay đổi tên cơ sở dữ liệu theo cơ sở dữ liệu của bạn
});

// Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
  if (err) {
    console.error('Lỗi kết nối đến cơ sở dữ liệu:', err);
    return;
  }

  console.log('Kết nối thành công đến cơ sở dữ liệu MySQL');

  // Truy vấn SQL để lấy danh sách các bảng trong cơ sở dữ liệu
  const query = 'SHOW TABLES';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Lỗi truy vấn:', error);
      return;
    }
    console.log('results >', results);
    // Lặp qua kết quả và hiển thị danh sách các bảng
    results.forEach((row) => {
      try {
        // Tên bảng bạn muốn lấy thông tin trường
        const tableName = row.Tables_in_nest_boilerplate;
        // Truy vấn SQL để lấy danh sách các trường trong bảng
        const query_table = `DESCRIBE ${tableName}`;

        let paramCaseName = paramCase(tableName);

        let fileContent = '';
        fileContent = fs
          .readFileSync(`src/${paramCaseName}/dto/${paramCaseName}.dto.ts`)
          .toString();

        connection.query(query_table, (error, results) => {
          console.log(`Tên bảng: ${row.Tables_in_nest_boilerplate}`);
          if (error) {
            console.error('Lỗi truy vấn:', error);
            return;
          }

          // Lặp qua kết quả và hiển thị thông tin về các trường
          let dtoString = '';
          results.forEach((row) => {
            let type = '';
            switch (row.Type) {
              case 'int':
                type = 'number';
                break;
              case 'varchar':
                type = 'string';
                break;
              case 'decimal':
                type = 'string';
                break;
              case 'tinyint':
                type = 'number';
                break;
              case 'text':
                type = 'string';
                break;
              case 'date':
                type = 'string';
                break;
              case 'datetime':
                type = 'string';
                break;
              case 'timestamp':
                type = 'string';
                break;
              case 'tinyint':
                type = 'number';
                break;

              default:
                type = 'string';
                break;
            }
            if (
              row.Field != 'id' &&
              row.Field != 'ngay_tao' &&
              row.Field != 'ngay_cap_nhat' &&
              row.Field != 'nguoi_tao' &&
              row.Field != 'nguoi_cap_nhat'
            ) {
              if (row.Null != 'YES') {
                dtoString += `@IsNotEmpty()\n`;
              }
              dtoString += `${row.Field}: ${type};\n`;
            }
          });

          fileContent = fileContent.replace(/\[dtoString\]/g, dtoString);
          fs.writeFileSync(
            `src/${paramCaseName}/dto/${paramCaseName}.dto.ts`,
            fileContent,
          );
        });
      } catch (error) {}
    });

    // Đóng kết nối sau khi hoàn thành
    connection.end();
  });
});
