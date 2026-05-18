import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import enUS from 'antd/lib/locale/en_US';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AppRouter } from './router';
import { useAppSelector } from './hooks/reduxHooks';
import { useLanguage } from './hooks/useLanguage';
import { useThemeWatcher } from './hooks/useThemeWatcher';
import GlobalStyle from './styles/GlobalStyle';
import { themeObject } from './styles/themes/themeVariables';
import { PageLoader } from './components/common/PageLoader';
import { useSelector } from 'react-redux';
import { appSelector } from './store/slices/appSlice';

const App: React.FC = () => {
  const { language } = useLanguage();
  const theme = useAppSelector((state) => state.theme.theme);
  const isLoading = useSelector(appSelector.loading);

  useThemeWatcher();

  return (
    <>
      <meta name='theme-color' content={themeObject[theme].primary} />
      <GlobalStyle />
      <HelmetProvider>
        <ConfigProvider locale={language === 'en' ? enUS : viVN}>
          {isLoading && <PageLoader />}
          <React.Suspense fallback={<PageLoader />}>
            <AppRouter />
          </React.Suspense>
        </ConfigProvider>
      </HelmetProvider>
    </>
  );
};

export default App;
