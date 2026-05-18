import { webName } from '@app/configs/configs';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { WithChildrenProps } from '@app/types/generalTypes';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

interface CauHinhHeThong {
  logoUrl: string;
  name: string;
}

export const PageTitle: React.FC<WithChildrenProps> = ({ children }) => {
  const [config, setConfig] = useState<CauHinhHeThong | null>(null);
  const reload = useAppSelector((state) => state.app.reloadData['DANH_SACH']);

  //Todo : Cập nhật favicon từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cauHinhHeThong');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setConfig(parsed);
      } catch (error) {
        console.error('Invalid cauHinhHeThong in localStorage', error);
      }
    }
  }, [reload]);

  return (
    <Helmet>
      <title>
        {children} | {config?.name ? config?.name : webName}
      </title>
    </Helmet>
  );
};
