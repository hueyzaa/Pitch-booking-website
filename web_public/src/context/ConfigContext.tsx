import React, { createContext, useContext, useState, useEffect } from 'react';
import { getPageConfig } from '../api/api';

export interface PageConfig {
  HEADER_LOGO?: string;
  HEADER_TITLE?: string;
  FOOTER_LOGO?: string;
  FOOTER_COPYRIGHT?: string;
  FOOTER_DESCRIPTION?: string;
  CONTACT_EMAIL?: string;
  CONTACT_PHONE?: string;
  CONTACT_ADDRESS?: string;
  ABOUT_HEADLINE_SUFFIX?: string;
  HOME_HERO_BADGE?: string;
  HOME_HERO_TITLE_MAIN?: string;
  HOME_HERO_TITLE_ACCENT?: string;
  HOME_HERO_TITLE_SUFFIX?: string;
  HOME_HERO_DESC?: string;
  HOME_HERO_IMG?: string;
}

export const defaultValues: PageConfig = {
  HEADER_LOGO: '',
  HEADER_TITLE: 'SportBooking',
  FOOTER_LOGO: '',
  FOOTER_COPYRIGHT: '© 2026 SportBooking. All rights reserved.',
  FOOTER_DESCRIPTION: 'Nền tảng đặt sân thể thao hàng đầu Việt Nam. Chúng tôi kết nối đam mê và cộng đồng thể thao.',
  CONTACT_EMAIL: 'lienhe@sportbooking.vn',
  CONTACT_PHONE: '1900 1234',
  CONTACT_ADDRESS: 'Hà Nội, Việt Nam',
  ABOUT_HEADLINE_SUFFIX: '',
  HOME_HERO_BADGE: 'Đặt Sân Thể Thao',
  HOME_HERO_TITLE_MAIN: 'Đam mê dẫn lối,',
  HOME_HERO_TITLE_ACCENT: 'đặt sân',
  HOME_HERO_TITLE_SUFFIX: 'dễ dàng',
  HOME_HERO_DESC: 'Khám phá và đặt ngay những sân thể thao chất lượng nhất quanh bạn chỉ với vài lần chạm. Tiết kiệm thời gian, bùng nổ đam mê.',
  HOME_HERO_IMG: '',
};

interface ConfigContextProps {
  config: PageConfig;
  loading: boolean;
  error: boolean;
  refresh: () => Promise<void>;
}

const ConfigContext = createContext<ConfigContextProps>({
  config: defaultValues,
  loading: true,
  error: false,
  refresh: async () => {},
});

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<PageConfig>(defaultValues);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchConfig = async () => {
    setLoading(true);
    setError(false);
    try {
      const data = await getPageConfig();
      if (Array.isArray(data)) {
        const parsed: PageConfig = { ...defaultValues };
        data.forEach((item: { key: string; value: string }) => {
          if (item.key) {
            parsed[item.key as keyof PageConfig] = item.value || '';
          }
        });
        setConfig(parsed);
      } else {
        throw new Error('Config API response is not an array');
      }
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch page config, using defaults:', err);
      // Still set config to defaults so the app continues to function smoothly
      setConfig(defaultValues);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <ConfigContext.Provider value={{ config, loading, error, refresh: fetchConfig }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
