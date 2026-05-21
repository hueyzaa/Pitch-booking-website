
# Quy Chuẩn Phát Triển Dự Án

## Quy định chung

### 1. Quy định đặt tên biến
* **Cú pháp lạc đà (`camelCase`)**
  * Sử dụng cho đặt tên biến và tên hàm trong code.
  * *Cú pháp:* Ký tự đầu tiên của từ đầu tiên viết thường, những ký tự đầu tiên của những từ tiếp theo viết hoa.
  * *Ví dụ:* `productName`, `productPrice`, `thisIsTheNameFollowTheCamelCase`.
* **Cú pháp con rắn (`snake_case`)**
  * Sử dụng cho đặt tên bảng, view, cột, thủ tục, … trong database.
  * *Cú pháp:* Tất cả các chữ cái đều viết thường, và các từ cách nhau bởi dấu gạch dưới.
  * *Ví dụ:* `product_name`, `product_price`, …

### 2. Quy định sử dụng Git
* **Quy định quản lý mã nguồn**
  * Đối với các ứng dụng có từ 2 mã nguồn trở lên (Ví dụ: App/Api hoặc Web/Api) => **Phải tạo một subgroup** để chứa cả 2 source này.
* **Quy định cách đặt tên dự án (Repo)**
  * *Quy cách đặt tên:* `[app/web/api]_[công_nghệ]_[tên_app]`
  * Trong đó `[app/web/api]` là loại dự án, bao gồm:
    * `app`: Ứng dụng di động.
    * `web`: Website.
    * `api`: API.
  * `[công_nghệ]`: Công nghệ sử dụng cho dự án, quy ước ký hiệu:
    * HTML, JS, CSS,...: `html`
    * React JS: `react`
    * Nest JS: `nest`
    * React Native: `rn`
    * Flutter: `flutter`
    * C#: `csharp`
    * NodeJs: `node`
    * Java: `java`
    * .Net: `dotnet`
    * Android: `android`
    * Swift: `swift`
    * JSP: `jsp`
    * Wordpress: `wp`
  * `[tên_app]`: Tên dự án.

* **Quy định message khi Commit**
  * *Cấu trúc chung:*
    
```bash
    <type>[optional scope]: <description>

    [optional body]

    [optional footer]
    ```
  * Trong đó các thành phần `type`, `description` là bắt buộc cần có trong commit message, `optional` là tùy chọn, có hoặc không có cũng được.
  * `type`: Từ khóa để phân loại commit là feature, fix bug, refactor... Một số type phổ biến:
    * `feat`: Thêm một feature.
    * `fix`: Fix bug cho hệ thống.
    * `refactor`: Sửa code nhưng không fix bug cũng không thêm feature hoặc đôi khi bug cũng được fix từ việc refactor.
    * `docs`: Thêm/thay đổi document.
    * `chore`: Những sửa đổi nhỏ nhặt không liên quan tới code.
    * `style`: Những thay đổi không làm thay đổi ý nghĩa của code như thay đổi css/ui chẳng hạn.
    * `perf`: Code cải tiến về mặt hiệu năng xử lý.
    * `vendor`: Cập nhật version cho các dependencies, packages.
  * `scope`: Được dùng để phân loại commit, nhưng trả lời câu hỏi: commit này refactor hay fix cái gì? Được đặt trong cặp ngoặc đơn ngay sau type. *Ví dụ:* `feat(authentication):`, `fix(parser):`.
  * `description`: Là mô tả ngắn về những gì sẽ bị sửa đổi trong commit đấy.
  * `body`: Là mô tả dài và chi tiết hơn, cần thiết khi description chưa thể nói rõ hết được.
  * `footer`: Một số thông tin mở rộng như số ID của pull request, issue...
  * *Ví dụ:*
    
```bash
    # VD1:
    feat: bổ sung chức năng xác thực 

    # VD2:
    fix: chỉnh sửa phần fillter bị sai 

    # VD3:
    fix(authencation): không thể xác thực bằng token
    ```

* **Quy định sử dụng branch**
  * Hạn chế sử dụng branch `master` để code chính. Branch `master` chỉ dùng để chứa code **CHẮC CHẮN chạy được** và phải là nhánh ít lỗi nhất.
  * *Quy định đặt tên nhánh:*
    * Tên branch nên được viết thường và không có khoảng trắng.
    * Tên branch nên mô tả một cách rõ ràng và ngắn gọn nội dung của branch đó.
    * Tên branch nên bắt đầu bằng từ `feature/` hoặc `bugfix/` tương ứng với tính năng hoặc sửa lỗi.
    * Tên branch nên được đặt dựa trên ticket hoặc issue liên quan để dễ dàng theo dõi và tìm kiếm.
    * *Ví dụ:* `feature/authencation`, `fixbug/bai-viet`.
  * *Quy trình phát triển 1 chức năng / chỉnh sửa 1 lỗi:*
    1. Tạo nhánh mới từ `master` và đặt tên theo quy định.
    2. Tiến hành code và commit theo như bình thường.
    3. Sau khi test hoàn thành một chức năng hoặc sửa lỗi thì tiến hành tạo pull request hoặc merge vào lại `master`.

### 3. Quy định về việc Code Formatting
* Bắt buộc 100% phải cài và sử dụng **eslint**, **prettier** để cảnh báo lỗi và format code cho dễ nhìn.
* Định dạng mã nguồn một cách đồng nhất trong toàn bộ dự án.

### 4. Các quy định chung về TypeScript
* Bắt buộc phải tạo **Interface** cho các biến trả về nếu có để giúp tiện lợi hơn trong quá trình debug.
* Hạn chế sử dụng `type: any` vì điều này khiến việc debug và người làm sau rất khó khăn.
* Đối với các hằng số sử dụng chung, chúng ta nên đưa vào 1 file quy định chung tránh phải gõ đi gõ lại nhiều lần, đồng thời tránh sai lệch trong quá trình cập nhật nếu có.
```
### 3. Backend (NestJS)
Sử dụng JWT Authentication
Dùng bcrypt để hash password
Bắt buộc dùng Transaction khi thao tác nhiều bảng
API theo chuẩn RESTful
### 4. Frontend
Chia component nhỏ
Dùng Redux/Zustand
Dùng ESLint + Prettier
Tối ưu bằng React.memo, useMemo, useCallback
### 5. Database
Đánh index cho truy vấn lớn
Thiết kế đúng relationship
Không bật synchronize trên production
### 6. Security
Không commit .env
Không lưu password plain text
Không lưu dữ liệu nhạy cảm trong JWT
### 7. Contributors
Project Development Team
