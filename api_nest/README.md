# Web_Profile
# API_NEST_BOILERPLATE

mục này cần cài để sử dụng sync entity
"typeorm-model-generator-mf9": "https://typeorm-model-generator:glpat-ZcbJGhHK-uD5s98hysse@git.mobifone9.vn/cty9-node-lib/typeorm-model-generator.git",

### Phòng Sản Phẩm - Công ty dịch vụ MobiFone khu vực 9

Hướng dẫn sử dụng tại đây
[Tại đây](https://mit.mobifone9.vn/books/huong-dan-core-be-v2)

### Update Log

[2025-09-30] - Nguyễn Trần Đăng Khoa

- Hiệu chỉnh hàm thêm nhiều người dùng vào role (không cho xóa dữ liệu cũ)

[2025-09-22] - Nguyễn Trần Đăng Khoa

- Bổ sung phân quyền khi xem file
- Cập nhật file cũ qua thư mục uploads_old

[2025-09-17] - Nguyễn Trần Đăng Khoa

- Bổ sung API xóa nhiều người dùng trong 1 role cụ thể
- Bổ sung API thêm nhiều người dùng trong 1 role cụ thể

[2025-09-09] - tuan.ta

- Bổ sung search theo vai trò cho user
- Cho phép chọn nhiều vai trò cho 1 user
- User có thể tự chọn vai trò trong các vai trò đã được cấu hình

[2025-08-28] - nhan.ltrong10

- Bổ sung rate limiting với thư viện @nestjs/throttler cho các endpoint bảo mật
- Thiết lập giới hạn cho endpoint login: 5 requests/60 giây
- Thiết lập giới hạn cho endpoint forgot-password: 3 requests/60 giây
- Thiết lập giới hạn cho endpoint reset-password: 1 request/1 giây
- Tạo custom exception filter để hiển thị thông báo lỗi rate limit bằng tiếng Việt
- Cấu hình ThrottlerModule và ThrottlerGuard global để bảo vệ API khỏi spam và brute force attacks

[2025-08-11] - nghia.minh

- Cập nhật đăng nhập bằng email/số điện thoại/tài khoản

[2025-07-07] - nam

- Cập nhật danh mục tỉnh - xã theo mô hình 2 cấp mới 1.7.2025

[2024-07-30] - By thai.bui

- Cập nhật thêm logger vào CLI controller
- Cập nhật thêm hàm sync entity mới tự động thêm on update nhận Current timestamp
- Bổ sung hàm xuất excel có sẵn vào CLI
- Bổ sung hàm addFilter dùng để lọc dữ liệu vào helper

[2024-07-29] - By thai.bui

- Cập nhật tự transform các trường tai_khoan và ma_vai_tro thành UpperCase
- Cập nhật tính năng ẩn người dùng được tạo bởi hệ thống khỏi API trả về (nguoi_tao = 0)
- Cập nhật tính năng cho phép bật tắt có ghi log hay không và bổ sung tính năng cho phép FE lấy log để hiển thị giao diện | Trường CORE_LOGGING ở env
- Fix lỗi try catch sai dạng ở logging.middleware.ts
- Bổ sung thêm kiểm tra tên người dùng không được phép chứa dấu cách
- Bổ sung thêm hàm kiểm tra số điện thoại và email việt hoá
- Bổ sung tính năng cập nhật avatar

[2025-02-12] - By minh.ho

- Bổ sung tính năng kiểm tra giờ làm việc của người dùng
- Bổ sung tính năng cho phép thiết lập thời gian yêu cầu thay đổi mật khẩu
- Bổ sung tính năng cho phép hạn chế số lần đăng nhập sai trong khoảng thời gian nhất định với tài khoản nhất định.
- Bổ sung tính năng xác thực recaptcha vào API login
- Bổ sung tính năng sử dụng cơ chế xác thực OTP gửi về email để xác thực tài khoản người dùng
- Bổ sung tính năng cho phép khóa tạm thời tài khoản người dùng trong khoảng thời gian ngoài giờ làm việc.
- Bổ sung module cấu hình nâng cao cho phép thiết lập các thông số liên quan đến việc xác thực tài khoản người dùng.

[2025-02-06] tuan.ta - thai-nguyen

- Thêm chức năng quản lý file tập chung
- Thêm chức năng cập nhật logo và tên hệ thống
- Sửa phần lấy các hình ảnh hiện tại của profile để lấy file nội bộ
- Xóa bớt cái "!"
- Sửa lỗi phần logic chỉ lấy 1 lần config
- Thêm mục upload file nội bộ
