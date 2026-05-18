import { MenuFoldOutlined } from '@ant-design/icons';
import { useResponsive } from '@app/hooks/useResponsive';
import React, { useEffect, useState } from 'react';
import * as S from './MainSider/MainSider.styles';
import { apiURL } from '@app/configs/configs';
import { useAppSelector } from '@app/hooks/reduxHooks';

interface SiderLogoProps {
  isSiderCollapsed: boolean;
  toggleSider: () => void;
}

interface CauHinhHeThong {
  logoUrl: string;
  name: string;
}
export const SiderLogo: React.FC<SiderLogoProps> = ({ isSiderCollapsed, toggleSider }) => {
  const { isTablet } = useResponsive();
  const reload = useAppSelector((state) => state.app.reloadData['DANH_SACH']);
  const [config, setConfig] = useState<CauHinhHeThong | null>(null);

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
    <S.SiderLogoDiv>
      <S.SiderLogoLink to='/'>
        <img
          src={config?.logoUrl ? apiURL + '/' + config?.logoUrl : '/react-icon.svg'}
          alt='logo'
          width={48}
          height={48}
        />
        <S.BrandSpan>{config?.name ? config.name : import.meta.env.VITE_WEB_NAME}</S.BrandSpan>
      </S.SiderLogoLink>
      {isTablet && (
        <S.CollapseButton
          shape='circle'
          size='small'
          $isCollapsed={isSiderCollapsed}
          icon={<MenuFoldOutlined rotate={isSiderCollapsed ? 0 : 180} rev={undefined} />}
          onClick={toggleSider}
        />
      )}
    </S.SiderLogoDiv>
  );
};
