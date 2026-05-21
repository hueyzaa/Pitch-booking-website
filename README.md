# Project Development Standards & Guidelines (Quy Chuẩn Phát Triển Dự Án)

![Development Status](https://img.shields.io/badge/status-active-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![NestJS](https://img.shields.io/badge/NestJS-10.x-red.svg)
![React](https://img.shields.io/badge/React-18.x-61dafb.svg)

Tài liệu này quy định các tiêu chuẩn bắt buộc áp dụng cho toàn bộ đội ngũ phát triển nhằm đồng bộ cấu trúc code, tối ưu hiệu suất làm việc nhóm, giảm thiểu technical debt (nợ kỹ thuật) và đảm bảo tính bảo mật cho hệ thống.

---

## 📌 Nội Dung Chính
* [1. Quy Định Đặt Tên & Code Formatting](#1-quy-định-đặt-tên--code-formatting)
* [2. Quy Chuẩn Git & Workflow](#2-quy-chuẩn-git--workflow)
* [3. Quy Chuẩn TypeScript](#3-quy-chuẩn-typescript)
* [4. Kiến Trúc Backend (NestJS) & RESTful API](#4-kiến-trúc-backend-nestjs--restful-api)
* [5. Kiến Trúc Frontend (ReactJS / React Native)](#5-kiến-trúc-frontend-reactjs--react-native)
* [6. Thiết Kế Database, Cache & Tối Ưu](#6-thiết- kế-database-cache--tối-ưu)
* [7. Bảo Mật Hệ Thống (Security)](#7-bảo-mật-hệ-thống-security)

---

## 1. Quy Định Đặt Tên & Code Formatting

### Quy tắc đặt tên (Naming Conventions)
* **Folder & File:** `kebab-case` (Ví dụ: `auth-control/`, `user-profile.controller.ts`).
* **Class, Interface, Type, Enum:** `PascalCase` (Ví dụ: `UserService`, `CreateUserDto`).
* **Variable, Function, Method:** `camelCase` (Ví dụ: `userId`, `getUserById()`).
* **Database (Table, Column):** `snake_case` (Ví dụ: `user_profiles`, `created_at`).
* **Constants:** `UPPER_CASE` (Ví dụ: `MAX_RETRY_ATTEMPTS`).

### Code Formatting
* Bắt buộc cấu hình **ESLint** + **Prettier** tích hợp trực tiếp vào IDE (Auto-format on Save).
* Độ dài dòng tối đa: `100 - 120 characters`.
* Sử dụng dấu nháy đơn (`'`) cho chuỗi trong TypeScript/JavaScript.

---

## 2. Quy Chuẩn Git & Workflow

### Cấu trúc Commit Message
Tuân thủ nghiêm ngặt chuẩn **Conventional Commits**:
```bash
<type>(<scope>): <description>
