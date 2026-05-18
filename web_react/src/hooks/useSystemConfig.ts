import { useState, useEffect } from 'react';
import { getListData } from '@app/api/getData.api';
import { persistSystemConfig } from '@app/services/localStorage.service';

/**
 * System configuration interface
 */
export interface SystemConfig {
  logoUrl: string;
  name: string;
}

/**
 * Custom hook for managing system configuration
 * Fetches and persists system logo and name
 * Checks localStorage first, then fetches from API if needed
 */
export const useSystemConfig = () => {
  const [config, setConfig] = useState<SystemConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      // Check localStorage first
      const saved = localStorage.getItem('cauHinhHeThong');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setConfig(parsed);
          return;
        } catch (error) {
          console.error('Invalid cauHinhHeThong in localStorage', error);
        }
      }

      // Fetch from API if not in localStorage
      try {
        setIsLoading(true);
        const res = await getListData('/he-thong/get-logo-va-ten');
        if (res) {
          const value = {
            logoUrl: res?.logoUrl,
            name: res?.name
          };
          persistSystemConfig(value);
          setConfig(value);
        }
      } catch (error) {
        console.error('Failed to fetch system config:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, isLoading };
};
