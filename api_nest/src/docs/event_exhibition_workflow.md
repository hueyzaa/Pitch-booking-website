# Event Exhibition System - Complete Workflow

## 📋 System Overview

Hoàn chỉnh hệ thống quản lý trưng bày sản phẩm cho sự kiện với **6 bước** từ setup đến hiển thị.

---

## 🏗️ Implementation Summary

### Modules Created

| Module                      | Purpose                 | Auto-Created | API Endpoints          |
| --------------------------- | ----------------------- | ------------ | ---------------------- |
| `SuKienModule`              | Quản lý sự kiện         | ❌ Manual    | Full CRUD              |
| `PhongTrungBayModule`       | Quản lý phòng (master)  | ❌ Manual    | Full CRUD              |
| `ViTriTrungBayModule`       | Quản lý vị trí template | ❌ Manual    | Full CRUD              |
| `PhongTrungBaySuKienModule` | Gán phòng vào sự kiện   | ❌ Manual    | Full CRUD + auto-clone |
| `ViTriTrungBaySuKienModule` | Vị trí instances        | ✅ Auto      | UPDATE only            |
| `SanPhamViTriSuKienModule`  | Gán sản phẩm            | ❌ Manual    | Full CRUD              |

---

## 🔄 Complete Workflow (6 Steps)

### BƯỚC 1: Setup Phòng Trưng Bày (Master Data)

**Admin tạo phòng template - dùng chung cho mọi sự kiện**

```bash
POST /phong-trung-bay
{
  "ten": "Phòng A",
  "loai_phong": "Phòng chính",
  "vi_tri": "Tầng 1",
  "mo_ta": "Phòng trưng bày chính"
}
→ Response: { id: 1, ... }
```

---

### BƯỚC 2: Định nghĩa Vị Trí Template (Master Data)

**Admin tạo các gian trưng bày cố định trong phòng**

```bash
POST /vi-tri-trung-bay
{
  "phong_trung_bay_id": 1,
  "ma_vi_tri": "A1",
  "ten": "Gian A1 - Khu vực IoT",
  "thu_tu_hien_thi": 1
}

POST /vi-tri-trung-bay
{
  "phong_trung_bay_id": 1,
  "ma_vi_tri": "A2",
  "ten": "Gian A2 - Khu vực AIten": "Gian A3 - Khu vực Blockchain",
  "thu_tu_hien_thi": 3
}
```

**Kết quả**: Phòng A có 3 vị trí template (A1, A2, A3)

---

### BƯỚC 3: Tạo Sự Kiện

```bash
POST /su-kien
{
  "ten": "Triển lãm Công nghệ 2025",
  "loai_su_kien": "Triển lãm",
  "thoi_gian_bat_dau": "2025-06-01T08:00:00",
  "thoi_gian_ket_thuc": "2025-06-03T18:00:00",
  "dia_diem": "Trung tâm Hội nghị Quốc gia"
}
→ Response: { id: 1, ... }
```

---

### BƯỚC 4: Gán Phòng vào Sự kiện ✨ (AUTO-CLONE)

**Khi gán phòng → hệ thống TỰ ĐỘNG sinh vị trí instances**

```bash
POST /phong-trung-bay-su-kien
{
  "su_kien_id": 1,
  "phong_trung_bay_id": 1,
  "ten_hien_thi": "Khu A - Công nghệ 4.0",
  "mo_ta": "Khu vực trưng bày công nghệ mới nhất",
  "thu_tu_hien_thi": 1
}
```

**Backend Auto-Processing:**

```typescript
// Service tự động thực hiện:
1. Tạo PhongTrungBaySuKien (id: 50)
2. Lấy tất cả ViTriTrungBay của phòng (A1, A2, A3)
3. Clone thành ViTriTrungBaySuKien:
   - Instance A1 (id: 100, vi_tri_trung_bay_id: 1)
   - Instance A2 (id: 101, vi_tri_trung_bay_id: 2)
   - Instance A3 (id: 102, vi_tri_trung_bay_id: 3)
```

**Xem kết quả:**

```bash
GET /vi-tri-trung-bay-su-kien/by-event-room/50
→ Response: [
  {
    "id": 100,
    "phong_trung_bay_su_kien_id": 50,
    "vi_tri_trung_bay_id": 1,
    "ten_hien_thi": null, // null = dùng tên từ template
    "vi_tri_trung_bay": {
      "ma_vi_tri": "A1",
      "ten": "Gian A1 - Khu vực IoT"
    }
  },
  ...
]
```

**Customize Instance (Optional):**

```bash
PATCH /vi-tri-trung-bay-su-kien/100
{
  "ten_hien_thi": "Gian IoT Plus - Triển lãm 2025",
  "mo_ta": "Phiên bản đặc biệt cho triển lãm năm nay"
}
```

---

### BƯỚC 5: Gán Sản phẩm vào Gian 🎯

**Thao tác thực tế - Trưng bày sản phẩm**

```bash
# Gán sản phẩm vào Gian A1 instance
POST /san-pham-vi-tri-su-kien
{
  "vi_tri_trung_bay_su_kien_id": 100, // Gian A1 instance
  "san_pham_id": 456,
  "thu_tu_hien_thi": 1,
  "ghi_chu": "Sản phẩm nổi bật của triển lãm"
}

POST /san-pham-vi-tri-su-kien
{
  "vi_tri_trung_bay_su_kien_id": 100,
  "san_pham_id": 789,
  "thu_tu_hien_thi": 2
}
```

**Xem sản phẩm trong gian:**

```bash
GET /san-pham-vi-tri-su-kien/by-booth/100
→ Response: [
  {
    "id": 1000,
    "san_pham_id": 456,
    "thu_tu_hien_thi": 1,
    "san_pham": {
      "ten": "Nền tảng IoT thông minh",
      "loai_san_pham": { "ten": "IoT" }
    }
  },
  {
    "id": 1001,
    "san_pham_id": 789,
    "thu_tu_hien_thi": 2,
    "san_pham": {
      "ten": "Smart Sensor v2.0"
    }
  }
]
```

**Xem tất cả sản phẩm trong sự kiện:**

```bash
GET /san-pham-vi-tri-su-kien/by-event/1
→ Response: [
  // Tất cả sản phẩm trong mọi gian của sự kiện
  // Đã sắp xếp theo: Phòng → Gian → Thứ tự
]
```

---

### BƯỚC 6: Hiển thị & Trải nghiệm 👀

**UI Flow cho User:**

```
📱 Trang Sự kiện → "Triển lãm Công nghệ 2025"
  ↓
🏢 Chọn Phòng → "Khu A - Công nghệ 4.0"
  ↓  (GET /phong-trung-bay-su-kien/by-event/1)
📦 Danh sách Gian:
  ├─ Gian IoT Plus - Triển lãm 2025
  ├─ Gian A2 - Khu vực AI
  └─ Gian A3 - Khu vực Blockchain
  ↓
👆 Click Gian A1
  ↓  (GET /san-pham-vi-tri-su-kien/by-booth/100)
🎁 Xem Sản phẩm:
  ├─ 1. Nền tảng IoT thông minh
  └─ 2. Smart Sensor v2.0
```

---

## 🎨 API Reference

### Core APIs

```typescript
// ==== Setup (BƯỚC 1-3) ====
POST   /phong-trung-bay           // Tạo phòng master
POST   /vi-tri-trung-bay          // Tạo vị trí template
POST   /su-kien                   // Tạo sự kiện

// ==== Assignment (BƯỚC 4) ====
POST   /phong-trung-bay-su-kien   // Gán phòng + AUTO clone vị trí
GET    /phong-trung-bay-su-kien/by-event/:id  // Xem phòng của sự kiện

// ==== View Booths (BƯỚC 4) ====
GET    /vi-tri-trung-bay-su-kien/by-event-room/:id  // Xem gian của phòng
PATCH  /vi-tri-trung-bay-su-kien/:id  // Customize tên gian

// ==== Product Assignment (BƯỚC 5) ====
POST   /san-pham-vi-tri-su-kien  // Gán sản phẩm vào gian
DELETE /san-pham-vi-tri-su-kien/:id  // Xóa sản phẩm khỏi gian

// ==== Display (BƯỚC 6) ====
GET    /san-pham-vi-tri-su-kien/by-booth/:booth_id  // SP theo gian
GET    /san-pham-vi-tri-su-kien/by-event/:event_id  // SP toàn sự kiện
```

---

## 🔒 Data Integrity

### Cascade Delete Rules

```
Xóa SuKien
  └─→ CASCADE xóa PhongTrungBaySuKien
        └─→ CASCADE xóa ViTriTrungBaySuKien
              └─→ CASCADE xóa SanPhamViTriSuKien

Xóa PhongTrungBay (master)
  ├─→ CASCADE xóa ViTriTrungBay (templates)
  │     └─→ CASCADE xóa ViTriTrungBaySuKien (instances)
  │           └─→ CASCADE xóa SanPhamViTriSuKien
  └─→ CASCADE xóa PhongTrungBaySuKien
        └─→ CASCADE xóa ViTriTrungBaySuKien
              └─→ CASCADE xóa SanPhamViTriSuKien

Xóa SanPham (master)
  └─→ CASCADE xóa SanPhamViTriSuKien (assignments)
```

### Unique Constraints

- `PhongTrungBaySuKien`: Unique(`su_kien_id`, `phong_trung_bay_id`) - Phòng chỉ gán 1 lần cho mỗi sự kiện
- `ViTriTrungBaySuKien`: Unique(`phong_trung_bay_su_kien_id`, `vi_tri_trung_bay_id`) - Template không clone trùng
- `SanPhamViTriSuKien`: Unique(`vi_tri_trung_bay_su_kien_id`, `san_pham_id`) - SP chỉ gán 1 lần cho mỗi gian

### Auto-Clone Logic

Khi gán phòng vào sự kiện (POST `/phong-trung-bay-su-kien`):

1. Tạo record PhongTrungBaySuKien
2. Tự động query tất cả ViTriTrungBay (templates) của phòng đó có `trang_thai = 1`
3. Clone thành ViTriTrungBaySuKien (instances) với `ten_hien_thi = null` (dùng tên từ template)
4. Instances có thể customize riêng (PATCH `/vi-tri-trung-bay-su-kien/:id`) mà không ảnh hưởng template

---

## 📊 Database Schema

```
MASTER DATA (Reusable Resources)
├─ PhongTrungBay (Rooms) ────────────┐
│  └─ ViTriTrungBay (Booth Templates) │
│                                     │
TRANSACTIONAL DATA (Event-Specific)
├─ SuKien (Events)                   │
│  └─ PhongTrungBaySuKien ────────────┘ (M:M Junction)
│     └─ ViTriTrungBaySuKien (Instances from templates)
│        └─ SanPhamViTriSuKien ────────┐
│                                      │
MASTER DATA (Products)                 │
└─ SanPham ─────────────────────────────┘
```

---

## ✅ Benefits

1. **Tái sử dụng** - Phòng & vị trí template dùng cho nhiều sự kiện
2. **Tự động hóa** - Clone vị trí auto, không cần setup thủ công
3. **Linh hoạt** - Customize tên/mô tả riêng cho từng sự kiện
4. **Data Integrity** - Cascade delete đảm bảo không orphan
5. **History** - Biết phòng nào, sản phẩm gì đã trưng bày trong sự kiện nào
6. **Scalable** - Dễ mở rộng thêm metadata

---

## 🎯 Implementation Complete!

Toàn bộ 6 bước workflow đã được implement đầy đủ với:

- ✅ 6 modules với full API endpoints
- ✅ Auto-clone logic cho booth positions
- ✅ Cascade delete rules
- ✅ Unique constraints
- ✅ Permissions configuration
