import React, { useState, useEffect } from 'react';
import { Card, Tabs } from 'antd';
import { apiInstance } from '@app/api/core.api';
import { notificationController } from '@app/controllers/notificationController';
import { CauHinhTrangData } from './types';
import { HeaderTab } from './components/HeaderTab';
import { FooterTab } from './components/FooterTab';
import { ContactTab } from './components/ContactTab';
import { HomeTab } from './components/HomeTab';

const CauHinhTrang: React.FC = () => {
  const [configs, setConfigs] = useState<CauHinhTrangData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchConfigs = async () => {
    setLoading(true);
    try {
      const res = await apiInstance.get('cau-hinh-trang');
      setConfigs(res.data);
    } catch {
      notificationController.error({ message: 'Lỗi khi tải cấu hình' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const handleUpdate = async (values: { key: string; value: string }[]) => {
    try {
      await apiInstance.patch('cau-hinh-trang', values);
      notificationController.success({ message: 'Cập nhật cấu hình thành công' });
      fetchConfigs();
    } catch {
      notificationController.error({ message: 'Lỗi khi cập nhật' });
    }
  };

  const items = [
    {
      key: 'header',
      label: 'Header',
      children: <HeaderTab configs={configs} onUpdate={handleUpdate} loading={loading} />
    },
    {
      key: 'home',
      label: 'Trang chủ',
      children: <HomeTab configs={configs} onUpdate={handleUpdate} loading={loading} />
    },
    {
      key: 'footer',
      label: 'Footer',
      children: <FooterTab configs={configs} onUpdate={handleUpdate} loading={loading} />
    },
    {
      key: 'contact',
      label: 'Liên hệ',
      children: <ContactTab configs={configs} onUpdate={handleUpdate} loading={loading} />
    }
  ];

  return (
    <Card title='Cấu hình giao diện Trang' size='small'>
      <Tabs defaultActiveKey='header' items={items} />
    </Card>
  );
};

export default CauHinhTrang;
