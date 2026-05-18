import { useEffect } from 'react';
import { getListData } from '@app/api/getData.api';
import { persistSystemConfig } from '@app/services/localStorage.service';

/**
 * Custom hook for fetching and persisting system configuration
 * Loads logo and system name on component mount
 */
export const useSystemConfig = () => {
  useEffect(() => {
    const fetchSystemConfig = async () => {
      try {
        const res = await getListData('/he-thong/get-logo-va-ten');

        if (res) {
          const value = {
            logoUrl: res?.logoUrl,
            name: res?.name
          };
          persistSystemConfig(value);
        }
      } catch (error) {
        console.error('Failed to fetch system config:', error);
      }
    };

    fetchSystemConfig();
  }, []);
};
