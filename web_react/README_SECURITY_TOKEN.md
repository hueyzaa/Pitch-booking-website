# Hướng dẫn sử dụng phần tạo token cho nội dung không công khai

## Giới thiệu

Tài liệu này mô tả cách sử dụng hệ thống tạo token bảo mật cho các nội dung không công khai trong ứng dụng, đặc biệt là hình ảnh và tài nguyên cần xác thực người dùng. 

Hệ thống này hoạt động bằng cách tạo chữ ký hash dựa trên thông tin người dùng, thiết bị, URL gốc và thời gian, giúp bảo vệ tài nguyên khỏi truy cập trái phép.


## Cách sử dụng

### 1. Sử dụng component BaseImageWithTokenAndDeviceId

Component `BaseImageWithTokenAndDeviceId` đã được tích hợp sẵn cơ chế tạo token. Để sử dụng:

```tsx
import BaseImageWithTokenAndDeviceId from '@app/components/common/BaseImage/BaseImageWithTokenAndDeviceId';
import { API_URL } from '@app/configs/api-configs';

const MyComponent = () => {
  return (
    <BaseImageWithTokenAndDeviceId 
      apiURL={API_URL.FILE_SERVER} 
      src="path/to/secure/image.jpg" 
      alt="Mô tả hình ảnh" 
      width={200}
      // Các props khác của Image component
    />
  );
};
```

### 2. Tạo token cho API riêng

Nếu cần tạo token cho API riêng, có thể sử dụng trực tiếp hàm `generateHashStringAndParamsString`:

```tsx
import { generateHashStringAndParamsString } from '@app/utils/utils';

const MyComponent = () => {
  const fetchSecureData = async () => {
    const resourceUrl = 'api/secure-resource/123';
    const paramsString = generateHashStringAndParamsString({ originalUrl: resourceUrl });
    
    const response = await fetch(`${API_URL.BASE}/${resourceUrl}?${paramsString}`);
    const data = await response.json();
    // xử lý dữ liệu
  };
  
  return (
    <button onClick={fetchSecureData}>Tải dữ liệu bảo mật</button>
  );
};
```

