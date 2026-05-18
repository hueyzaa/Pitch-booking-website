Rules:

Tuyệt đối không tạo thủ công: Mọi module mới (Project, Category, Media, v.v.) KHÔNG được tạo bằng cách copy-paste folder hoặc tạo file lẻ tẻ trong cả Backend và Frontend.

Bắt buộc dùng CLI: Luôn sử dụng lệnh node cli.js add <ModuleName> tại thư mục gốc của Backend hoặc Frontend tương ứng để khởi tạo cấu trúc boilerplate.

Đồng bộ hóa: Khi người dùng yêu cầu "tạo module X", Agent phải thực hiện 2 bước:

Bước 1: Gọi lệnh CLI để sinh code mẫu.

Bước 2: Chỉ chỉnh sửa logic bên trong các file đã được CLI sinh ra (như controller, service, component).

Ngôn ngữ: Luôn giữ tính nhất quán về naming convention (thường là PascalCase cho Module Name trong lệnh CLI).