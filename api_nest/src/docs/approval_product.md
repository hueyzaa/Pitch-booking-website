# Product Approval System - Complete Workflow

## 📋 System Overview

Hệ thống phê duyệt sản phẩm cho phép **phân quyền linh hoạt** giữa ADMIN và Non-ADMIN users. ADMIN thực hiện CRUD trực tiếp, trong khi Non-ADMIN tạo **approval requests** để ADMIN xem xét và phê duyệt.

---

## 🏗️ Implementation Summary

### Modules & Components

| Component                | Purpose                    | Auto-Generated | Key Features           |
| ------------------------ | -------------------------- | -------------- | ---------------------- |
| `Approval` Entity        | Store approval requests    | ❌ Manual      | Full audit trail       |
| `ApprovalService`        | Manage approval CRUD       | ❌ Manual      | Status tracking, stats |
| `ApprovalController`     | API endpoints              | ❌ Manual      | Approve/Reject actions |
| `SanPhamApprovalHandler` | Product-specific logic     | ❌ Manual      | Apply approved changes |
| `SanPhamService`         | Product CRUD with approval | ❌ Manual      | Role-based routing     |

### Supported Operations

| Operation | ADMIN                    | Non-ADMIN                  | Result          |
| --------- | ------------------------ | -------------------------- | --------------- |
| CREATE    | Direct → Product created | Request → Pending approval | Approval record |
| UPDATE    | Direct → Product updated | Request → Pending approval | Approval record |
| DELETE    | Direct → Product deleted | Request → Pending approval | Approval record |

---

## 🔄 Complete Workflow (4 Steps)

### BƯỚC 1: User Creates Request

**Non-ADMIN user attempts CRUD operation**

```bash
# CREATE Example
POST /san-pham
{
  "ten": "Sản phẩm IoT thông minh",
  "code": "IOT-001",
  "san_pham_loai_id": 1,
  "tag_ids": [1, 2, 3],
  "nhom_san_pham_ids": [1],
  "nguoi_tao": 5
}

# Response (Non-ADMIN)
{
  "message": "Yêu cầu tạo sản phẩm đã được gửi, chờ ADMIN duyệt",
  "approval": {
    "id": 123,
    "entity_type": "PRODUCT",
    "entity_id": null,  // NULL for CREATE
    "action": "CREATE",
    "data": { ... },    // Full createDto
    "status": "PENDING",
    "requested_by": 5,
    "requested_at": "2025-12-24T08:00:00"
  }
}
```

**Backend Auto-Processing:**

```typescript
// san-pham.service.ts
async create(createDto: CreateSanPhamDto, userRole?: string) {
  // Validate foreign keys first
  await this.validator.validateForCreate(...);

  // ADMIN → Direct create
  if (isAdminRole.includes(userRole)) {
    const slug = await this.slugHelper.generateUniqueSlug(dto.ten);
    // Transaction: create product + relations
    return await this.dataSource.transaction(...);
  }

  // Non-ADMIN → Create approval request
  return this.approvalHandler.createApprovalRequest(createDto);
}
```

---

### BƯỚC 2: View Pending Requests

**ADMIN reviews pending approvals**

```bash
# Get all pending requests
GET /approval/pending
→ Response: [
  {
    "id": 123,
    "entity_type": "PRODUCT",
    "action": "CREATE",
    "status": "PENDING",
    "requested_by": 5,
    "nguoi_yeu_cau": {
      "id": 5,
      "ten": "Nguyen Van A",
      "email": "nguyenvana@example.com"
    },
    "data": {
      "ten": "Sản phẩm IoT thông minh",
      "code": "IOT-001",
      ...
    },
    "requested_at": "2025-12-24T08:00:00"
  },
  ...
]

# Get approval details
GET /approval/123
→ Response: { full approval details with relations }

# Get approval statistics
GET /approval/stats
→ Response: {
  "pending": 15,
  "approved": 234,
  "rejected": 12,
  "total": 261
}
```

---

### BƯỚC 3A: ADMIN Approves Request ✅

**ADMIN approves and system auto-applies changes**

```bash
POST /approval/123/approve
```

**Backend Auto-Processing:**

```typescript
// approval.controller.ts
async approve(id: string, user: UserReqData) {
  // 1. Update approval status
  const approval = await this.approvalService.approve(+id, user.id);

  // 2. Process the approved request
  if (approval.entity_type === 'PRODUCT') {
    if (approval.action === 'CREATE') {
      // Apply CREATE
      const product = await this.sanPhamService.applyApprovedCreate(approval.data);
      // Slug generated HERE (on approval)
      // Transaction: create product + relations + history
      return { ...approval, created_product: product };

    } else if (approval.action === 'UPDATE') {
      // Apply UPDATE
      const product = await this.sanPhamService.applyApprovedUpdate(
        approval.entity_id,
        approval.data
      );
      // Re-validate FKs, update product + relations + history
      return { ...approval, updated_product: product };

    } else if (approval.action === 'DELETE') {
      // Apply DELETE
      const result = await this.sanPhamService.applyApprovedDelete(
        approval.entity_id
      );
      // Log history BEFORE delete, then delete product
      return { ...approval, delete_result: result };
    }
  }
}
```

**Result:**

```json
{
  "id": 123,
  "status": "APPROVED",
  "approved_by": 1,
  "approved_at": "2025-12-24T09:00:00",
  "created_product": {
    "id": 456,
    "ten": "Sản phẩm IoT thông minh",
    "code": "IOT-001",
    "slug": "san-pham-iot-thong-minh",
    "loai_san_pham": { ... },
    "san_pham_tags": [ ... ]
  }
}
```

---

### BƯỚC 3B: ADMIN Rejects Request ❌

**ADMIN rejects with reason**

```bash
POST /approval/123/reject
{
  "rejected_reason": "Thông tin sản phẩm chưa đầy đủ, vui lòng bổ sung mô tả chi tiết"
}
```

**Result:**

```json
{
  "id": 123,
  "status": "REJECTED",
  "approved_by": 1,
  "approved_at": "2025-12-24T09:00:00",
  "rejected_reason": "Thông tin sản phẩm chưa đầy đủ, vui lòng bổ sung mô tả chi tiết"
}
```

---

### BƯỚC 4: Notification & History

**User checks approval status**

```bash
# Get user's approval requests
GET /approval?filters[requested_by]=5

# Get approval history for specific product
GET /approval/entity/PRODUCT/456
→ Response: [
  {
    "action": "CREATE",
    "status": "APPROVED",
    "requested_at": "2025-12-24T08:00:00",
    "approved_at": "2025-12-24T09:00:00"
  },
  {
    "action": "UPDATE",
    "status": "PENDING",
    "requested_at": "2025-12-24T10:00:00"
  }
]
```

---

## 🎨 API Reference

### Core Approval APIs

```typescript
// ==== Approval Management (ADMIN) ====
GET    /approval                    // List all with pagination
GET    /approval/pending            // Get pending requests only
GET    /approval/stats              // Get statistics
GET    /approval/:id                // Get details
POST   /approval/:id/approve        // Approve & auto-apply
POST   /approval/:id/reject         // Reject with reason

// ==== Approval History ====
GET    /approval/entity/:entityType/:entityId  // Get entity history

// ==== Product CRUD (Role-based) ====
POST   /san-pham       // ADMIN: direct create | Non-ADMIN: create approval
GET    /san-pham       // Both: list products
GET    /san-pham/:id   // Both: view details
PATCH  /san-pham/:id   // ADMIN: direct update | Non-ADMIN: update approval
DELETE /san-pham/:id   // ADMIN: direct delete | Non-ADMIN: delete approval
```

---

## 🔒 Data Integrity & Validation

### Re-Validation on Approval

```typescript
// IMPORTANT: Always re-validate on approval
// Data might have changed between request and approval

async applyApprovedCreate(approvalData: CreateSanPhamDto) {
  // Re-validate foreign keys
  await this.validator.validateForCreate(
    data.code,
    data.san_pham_loai_id,
    tag_ids,
    nhom_san_pham_ids
  );

  // Generate slug on approval (avoid collision)
  const slug = await this.slugHelper.generateUniqueSlug(data.ten);

  // Transaction: create product + relations
  return await this.dataSource.transaction(...);
}
```

### Slug Generation Strategy

| User Role     | Timing                | Reason                                     |
| ------------- | --------------------- | ------------------------------------------ |
| **ADMIN**     | Immediately on create | Direct operation, no delay                 |
| **Non-ADMIN** | On approval           | Avoid slug collision during pending period |

### Transaction Safety

```typescript
// All operations use TypeORM transactions
await this.dataSource.transaction(async (manager) => {
  // 1. Create/Update product
  const product = await manager.save(SanPham, data);

  // 2. Create/Update relations
  await this.relationshipManager.createTagsRelations(...);
  await this.relationshipManager.createNhomRelations(...);

  // 3. Query with relations (in same transaction)
  return await manager.findOne(SanPham, {
    where: { id: product.id },
    relations: [...]
  });
  // Auto-rollback on any error
});
```

### History Logging

```typescript
// CREATE & UPDATE: Log AFTER save
await this.historyLogger.logCreate(product, userId);

// DELETE: Log BEFORE delete (can't log after entity is gone)
await this.historyLogger.logDelete(productId, productData, userId);
await this.sanPhamRepo.delete(productId);
```

---

## 📊 Database Schema

### Approval Entity

```sql
CREATE TABLE `approval` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `entity_type` VARCHAR(50) NOT NULL,        -- 'PRODUCT', 'SUPPLIER', etc.
  `entity_id` BIGINT NULL,                   -- Target ID (NULL for CREATE)
  `action` ENUM('CREATE','UPDATE','DELETE'),
  `data` JSON NOT NULL,                      -- Request payload
  `status` ENUM('PENDING','APPROVED','REJECTED') DEFAULT 'PENDING',
  `requested_by` BIGINT NOT NULL,            -- User who requested
  `approved_by` BIGINT NULL,                 -- ADMIN who processed
  `approved_at` DATETIME NULL,
  `rejected_reason` TEXT NULL,
  `nguoi_tao` INT NOT NULL,
  `ngay_tao` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `nguoi_cap_nhat` INT NULL,
  `ngay_cap_nhat` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX `idx_approval_entity_type` (`entity_type`),
  INDEX `idx_approval_status` (`status`),
  INDEX `idx_approval_requested_by` (`requested_by`),

  FOREIGN KEY (`requested_by`) REFERENCES `nguoi_dung` (`id`) ON DELETE RESTRICT,
  FOREIGN KEY (`approved_by`) REFERENCES `nguoi_dung` (`id`) ON DELETE RESTRICT
);
```

### Data Flow Diagram

```
REQUEST PHASE
User (Non-ADMIN)
  ↓ createDto
SanPhamService.create()
  ├─ Validate FKs
  ├─ Check Role → Non-ADMIN
  └─ SanPhamApprovalHandler.createApprovalRequest()
      └─ ApprovalService.create()
          └─ INSERT INTO approval (status: PENDING, data: JSON)

APPROVAL PHASE
ADMIN
  ↓ POST /approval/:id/approve
ApprovalController.approve()
  ├─ ApprovalService.approve() → UPDATE approval (status: APPROVED)
  └─ SanPhamApprovalHandler.applyApprovedCreate()
      ├─ Re-validate FKs
      ├─ Generate slug
      ├─ Transaction:
      │   ├─ INSERT INTO san_pham
      │   ├─ INSERT INTO san_pham_tags
      │   └─ INSERT INTO san_pham_nhom_cong_nghes
      └─ INSERT INTO lich_su_chinh_sua_san_pham
```

---

## 🎯 Workflow by Action Type

### CREATE Workflow

```
Non-ADMIN User          System                    ADMIN
     │                    │                          │
     ├─ POST /san-pham ──►│                         │
     │  (createDto)        │                         │
     │                    ├─ Validate FKs           │
     │                    ├─ Check Role             │
     │                    │  → Non-ADMIN            │
     │                    ├─ Create Approval        │
     │                    │  action: CREATE         │
     │                    │  entity_id: NULL        │
     │                    │  data: createDto        │
     │                    │  status: PENDING        │
     │◄─ Approval ────────┤                         │
     │                    │                         │
     │                    │ ◄─ Review ──────────────┤
     │                    │                         │
     │                    │                         ├─ APPROVE
     │                    │                         │
     │                    ├─ Re-validate FKs ◄──────┤
     │                    ├─ Generate SLUG          │
     │                    ├─ Transaction:           │
     │                    │  ├─ Create Product      │
     │                    │  ├─ Create Relations    │
     │                    │  └─ Log History         │
     │                    ├─ Update Approval        │
     │                    │  status: APPROVED       │
     │                    │  approved_at: NOW()     │
```

### UPDATE Workflow

```
Non-ADMIN User          System                    ADMIN
     │                    │                          │
     ├─ PATCH /san-pham/:id ►│                      │
     │  (updateDto)        │                         │
     │                    ├─ Validate FKs           │
     │                    ├─ Fetch Current Data     │
     │                    ├─ Create Approval        │
     │                    │  action: UPDATE         │
     │                    │  entity_id: :id         │
     │                    │  data: updateDto        │
     │◄─ Approval ────────┤                         │
     │                    │                         │
     │                    │ ◄─ Review ──────────────┤
     │                    │                         ├─ APPROVE
     │                    │                         │
     │                    ├─ Re-validate FKs ◄──────┤
     │                    ├─ Transaction:           │
     │                    │  ├─ Update Product      │
     │                    │  ├─ Update Relations    │
     │                    │  └─ Log History         │
     │                    ├─ Update Approval        │
     │                    │  status: APPROVED       │
```

### DELETE Workflow

```
Non-ADMIN User          System                    ADMIN
     │                    │                          │
     ├─ DELETE /san-pham/:id ►│                     │
     │                    │                         │
     │                    ├─ Fetch Product Data     │
     │                    ├─ Create Approval        │
     │                    │  action: DELETE         │
     │                    │  entity_id: :id         │
     │                    │  data: {id, code, ten}  │
     │◄─ Approval ────────┤                         │
     │                    │                         │
     │                    │ ◄─ Review ──────────────┤
     │                    │                         ├─ APPROVE
     │                    │                         │
     │                    ├─ Log History ◄──────────┤
     │                    │  (BEFORE delete)        │
     │                    ├─ Delete Product         │
     │                    │  (CASCADE relations)    │
     │                    ├─ Update Approval        │
     │                    │  status: APPROVED       │
```

---

## 🎨 Frontend Integration Guide

### Non-ADMIN Create Product

```typescript
// Frontend code
const handleCreateProduct = async (formData) => {
  try {
    const response = await api.post('/san-pham', formData);

    // Check if it's an approval response or direct creation
    if (response.data.approval) {
      // Non-ADMIN → Approval created
      showNotification({
        type: 'info',
        title: 'Yêu cầu đã gửi',
        message: response.data.message,
        // "Yêu cầu tạo sản phẩm đã được gửi, chờ ADMIN duyệt"
      });

      // Redirect to pending requests page
      navigate('/my-requests?status=pending');
    } else {
      // ADMIN → Product created directly
      showNotification({
        type: 'success',
        title: 'Thành công',
        message: 'Sản phẩm đã được tạo',
      });

      // Redirect to product detail
      navigate(`/san-pham/${response.data.id}`);
    }
  } catch (error) {
    showNotification({
      type: 'error',
      title: 'Lỗi',
      message: error.response.data.message,
    });
  }
};
```

### ADMIN Review Pending Requests

```typescript
// Pending requests list component
const PendingApprovals = () => {
  const [approvals, setApprovals] = useState([]);

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  const fetchPendingApprovals = async () => {
    const response = await api.get('/approval/pending');
    setApprovals(response.data);
  };

  const handleApprove = async (approvalId) => {
    try {
      await api.post(`/approval/${approvalId}/approve`);
      showNotification({
        type: 'success',
        message: 'Đã phê duyệt yêu cầu',
      });
      fetchPendingApprovals(); // Refresh list
    } catch (error) {
      showNotification({
        type: 'error',
        message: error.response.data.message,
      });
    }
  };

  const handleReject = async (approvalId, reason) => {
    try {
      await api.post(`/approval/${approvalId}/reject`, {
        rejected_reason: reason,
      });
      showNotification({
        type: 'success',
        message: 'Đã từ chối yêu cầu',
      });
      fetchPendingApprovals();
    } catch (error) {
      showNotification({
        type: 'error',
        message: error.response.data.message,
      });
    }
  };

  return (
    <div>
      {approvals.map((approval) => (
        <ApprovalCard
          key={approval.id}
          approval={approval}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      ))}
    </div>
  );
};
```

### Display Approval Details

```typescript
const ApprovalDetailModal = ({ approval }) => {
  const parsedData = approval.data; // Already parsed by API

  return (
    <Modal>
      <h2>Chi tiết yêu cầu phê duyệt</h2>

      <div>
        <strong>Loại:</strong> {approval.entity_type}
      </div>
      <div>
        <strong>Hành động:</strong> {approval.action}
      </div>
      <div>
        <strong>Người yêu cầu:</strong> {approval.nguoi_yeu_cau.ten}
      </div>
      <div>
        <strong>Ngày yêu cầu:</strong> {formatDate(approval.requested_at)}
      </div>

      {approval.action === 'CREATE' && (
        <div>
          <h3>Thông tin sản phẩm mới</h3>
          <div>Tên: {parsedData.ten}</div>
          <div>Mã: {parsedData.code}</div>
          <div>Loại: {parsedData.san_pham_loai_id}</div>
        </div>
      )}

      {approval.action === 'UPDATE' && (
        <div>
          <h3>Thay đổi</h3>
          {/* Show diff between old and new */}
        </div>
      )}

      {approval.status === 'PENDING' && (
        <div>
          <Button onClick={() => onApprove(approval.id)}>Phê duyệt</Button>
          <Button onClick={() => openRejectModal(approval.id)}>Từ chối</Button>
        </div>
      )}
    </Modal>
  );
};
```

---

## ✅ Best Practices

### 1. Always Re-validate on Approval

```typescript
// ❌ BAD: Apply without validation
async applyApprovedCreate(data) {
  return await this.sanPhamRepo.save(data);
}

// ✅ GOOD: Re-validate before applying
async applyApprovedCreate(data) {
  // Data might have changed since request was created
  await this.validator.validateForCreate(...);

  const slug = await this.slugHelper.generateUniqueSlug(data.ten);
  return await this.dataSource.transaction(...);
}
```

### 2. Log BEFORE Delete

```typescript
// ❌ BAD: Log after delete (data is gone)
await this.sanPhamRepo.delete(id);
await this.historyLogger.logDelete(id, product, userId); // ERROR!

// ✅ GOOD: Log before delete
await this.historyLogger.logDelete(id, product, userId);
await this.sanPhamRepo.delete(id);
```

### 3. Use Transactions

```typescript
// ✅ Ensure atomicity
await this.dataSource.transaction(async (manager) => {
  // All operations in transaction
  const product = await manager.save(SanPham, data);
  await this.relationshipManager.createRelations(manager, product.id, ...);
  return product;
  // Auto-rollback on error
});
```

### 4. Slug Generation Timing

```typescript
// ADMIN: Generate immediately
if (isAdminRole.includes(userRole)) {
  const slug = await this.slugHelper.generateUniqueSlug(dto.ten);
  return await this.create WithSlug(dto, slug);
}

// Non-ADMIN: Generate on approval
async applyApprovedCreate(data) {
  const slug = await this.slugHelper.generateUniqueSlug(data.ten);
  // ... create with slug
}
```

### 5. Clear User Feedback

```typescript
// Return different responses for different roles
if (isAdminRole.includes(userRole)) {
  return createdProduct; // Direct result
} else {
  return {
    message: 'Yêu cầu tạo sản phẩm đã được gửi, chờ ADMIN duyệt',
    approval: approvalRequest,
  };
}
```

---

## 🔍 Debugging & Monitoring

### Check Approval Status

```sql
-- Get all pending approvals
SELECT * FROM approval
WHERE status = 'PENDING'
ORDER BY ngay_tao DESC;

-- Get approval by product
SELECT a.*, nd.ten as requester_name
FROM approval a
LEFT JOIN nguoi_dung nd ON a.requested_by = nd.id
WHERE a.entity_type = 'PRODUCT'
AND a.entity_id = 456;
```

### View Approval Data

```sql
-- Extract data from JSON
SELECT
  id,
  entity_type,
  action,
  status,
  JSON_EXTRACT(data, '$.ten') as product_name,
  JSON_EXTRACT(data, '$.code') as product_code,
  requested_at,
  approved_at
FROM approval
WHERE entity_type = 'PRODUCT'
ORDER BY ngay_tao DESC;
```

### Approval Statistics

```sql
-- Count by status
SELECT
  status,
  COUNT(*) as count,
  entity_type
FROM approval
GROUP BY status, entity_type;

-- Average approval time
SELECT
  entity_type,
  action,
  AVG(TIMESTAMPDIFF(HOUR, requested_at, approved_at)) as avg_hours
FROM approval
WHERE status = 'APPROVED'
GROUP BY entity_type, action;
```

---

## 📈 Benefits

1. **✅ Role-based Access Control** - ADMIN direct operations, Non-ADMIN approval workflow
2. **✅ Full Audit Trail** - Track who requested what and who approved/rejected
3. **✅ Data Integrity** - Re-validation on approval prevents stale data issues
4. **✅ Transaction Safety** - All operations atomic with rollback on error
5. **✅ History Preservation** - Full logging of all changes
6. **✅ Flexible & Extensible** - Easy to add more entity types
7. **✅ Slug Collision Prevention** - Smart slug generation timing

---

## 🚀 Future Enhancements

- [ ] **Multi-level Approval** - Manager → Director → CEO chain
- [ ] **Bulk Approval** - Approve multiple requests at once
- [ ] **Approval Expiration** - Auto-reject after timeout
- [ ] **Notifications** - Email/SMS/Push on status changes
- [ ] **Comment Thread** - Discussion on approval requests
- [ ] **Approval Delegation** - Assign to another ADMIN
- [ ] **Approval Templates** - Pre-fill common requests
- [ ] **Approval Analytics** - Dashboard with metrics

---

## 📝 Summary

### ✅ Implementation Complete

- **Role-based workflow**: ADMIN direct, Non-ADMIN approval
- **Full CRUD coverage**: CREATE, UPDATE, DELETE all supported
- **Slug management**: Generated at the right time for each role
- **Data validation**: Validate on request AND approval
- **History logging**: Track all changes with proper timing
- **Transaction safety**: Atomic operations with rollback
- **Flexible**: Easy to extend to other entities

### 🎯 Key Takeaways

1. **Separation of Concerns**: Service handles CRUD, Handler manages approval logic
2. **Re-validation is Critical**: Always validate on approval, not just request
3. **Timing Matters**: Slug generation, history logging timing is crucial
4. **Transaction Everything**: Ensure data consistency
5. **Clear Feedback**: Different responses for different roles

---

**Documentation Version**: 2.0  
**Last Updated**: 2025-12-24  
**Maintained By**: Development Team
