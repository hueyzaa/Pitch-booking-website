README - Quy Chuẩn Phát Triển Dự Án
Giới thiệu
Tài liệu này quy định các tiêu chuẩn phát triển phần mềm dành cho đội ngũ phát triển nhằm:
Đồng bộ coding style
Dễ bảo trì và mở rộng hệ thống
Tăng hiệu suất làm việc nhóm
Giảm lỗi trong quá trình phát triển
Nội dung chính
Quy định đặt tên
Quy định Git
Code Formatting
Quy chuẩn TypeScript
Quy chuẩn Backend (NestJS)
Quy chuẩn Frontend (ReactJS / React Native)
Database Design
Transaction
Cache
Pagination
Authentication & Authorization
RESTful API
Best Practices
Quy định Git
Commit Message
Cấu trúc:
<type>(scope): <description>
Ví dụ:
feat(auth): add jwt authentication
fix(user): cannot update profile
Branch
feature/<feature-name>
bugfix/<bug-name>
Quy chuẩn TypeScript
Hạn chế sử dụng any
Sử dụng interface
Dùng enum cho constant
Dùng readonly khi cần
Backend (NestJS)
Sử dụng JWT Authentication
Dùng bcrypt để hash password
Bắt buộc dùng Transaction khi thao tác nhiều bảng
API theo chuẩn RESTful
Frontend
Chia component nhỏ
Dùng Redux/Zustand
Dùng ESLint + Prettier
Tối ưu bằng React.memo, useMemo, useCallback
Database
Đánh index cho truy vấn lớn
Thiết kế đúng relationship
Không bật synchronize trên production
Security
Không commit .env
Không lưu password plain text
Không lưu dữ liệu nhạy cảm trong JWT
Contributors
Project Development Team
