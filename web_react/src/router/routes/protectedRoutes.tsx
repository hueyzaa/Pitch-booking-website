import React from 'react';
import { RouteObject } from 'react-router-dom';
import { withLoading } from '@app/hocs/withLoading.hoc';
import MainLayout from '@app/components/layouts/main/MainLayout/MainLayout';
import RequireAuth from '../guards/RequireAuth';
import { profileRoutes } from './profileRoutes';

// Lazy loaded page components
const Error404Page = React.lazy(() => import('@app/pages/Error/Error404Page'));
const HomePage = React.lazy(() => import('@app/pages/Home/Home'));
const VaiTroPage = React.lazy(() => import('@app/pages/VaiTro/VaiTro'));
const NguoiDungPage = React.lazy(() => import('@app/pages/NguoiDung/NguoiDung'));
const LogThaoTacPage = React.lazy(() => import('@app/pages/LogThaoTac/LogThaoTac'));
const CauHinhChungPage = React.lazy(() => import('@app/pages/CauHinhHeThong/CauHinhChung/CauHinhChung'));
const CauHinhHeThongPage = React.lazy(() => import('@app/pages/CauHinhHeThong/CauHinhThongTinHeThong/CauHinhHeThong'));
const QuanLyUploadPage = React.lazy(() => import('@app/pages/CauHinhHeThong/QuanLyUpload/QuanLyUpload'));
const CauHinhTrangPage = React.lazy(() => import('@app/pages/CauHinhHeThong/CauHinhTrang/CauHinhTrang'));

const LoaiSanPage = React.lazy(() => import('@app/pages/LoaiSan/LoaiSan'));
const SanPage = React.lazy(() => import('@app/pages/San/San'));
const ThemSanPage = React.lazy(() => import('@app/pages/San/ThemSan'));
const SuaSanPage = React.lazy(() => import('@app/pages/San/SuaSan'));
const DoiTuongPage = React.lazy(() => import('@app/pages/DoiTuong/DoiTuong'));

const QuanLyGiaPage = React.lazy(() => import('@app/pages/QuanLyGia/QuanLyGia'));
const ThuChiPage = React.lazy(() => import('@app/pages/ThuChi/ThuChi'));
const TrangThaiSanPage = React.lazy(() => import('@app/pages/TrangThaiSan/TrangThaiSan'));
const DatSanPage = React.lazy(() => import('@app/pages/DatSan/DatSan'));
const DanhGiaPage = React.lazy(() => import('@app/pages/DanhGia/DanhGia'));
/*import-component-here*/

// Wrapped with loading HOC
const Error404 = withLoading(Error404Page);
const Home = withLoading(HomePage);
const VaiTro = withLoading(VaiTroPage);
const NguoiDung = withLoading(NguoiDungPage);
const LogThaoTac = withLoading(LogThaoTacPage);
const CauHinhChung = withLoading(CauHinhChungPage);
const CauHinhHeThong = withLoading(CauHinhHeThongPage);
const QuanLyUpload = withLoading(QuanLyUploadPage);
const CauHinhTrang = withLoading(CauHinhTrangPage);

const LoaiSan = withLoading(LoaiSanPage);
const San = withLoading(SanPage);
const ThemSan = withLoading(ThemSanPage);
const SuaSan = withLoading(SuaSanPage);
const DoiTuong = withLoading(DoiTuongPage);

const QuanLyGia = withLoading(QuanLyGiaPage);
const ThuChi = withLoading(ThuChiPage);
const TrangThaiSan = withLoading(TrangThaiSanPage);
const DatSan = withLoading(DatSanPage);
const DanhGia = withLoading(DanhGiaPage);
/*import-component-with-loading-here*/

/**
 * Protected routes
 * These routes require authentication and are wrapped with RequireAuth guard
 */
export const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <RequireAuth>
        <MainLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <Home />
      },
      ...profileRoutes,
      {
        path: 'tai-khoan',
        children: [
          {
            path: 'vai-tro',
            element: <VaiTro />
          },
          {
            path: 'nguoi-dung',
            element: <NguoiDung />
          }
        ]
      },
      {
        path: 'log-thao-tac',
        element: <LogThaoTac />
      },
      {
        path: 'quan-ly-upload',
        element: <QuanLyUpload />
      },
      {
        path: 'cau-hinh-chung',
        element: <CauHinhChung />
      },
      {
        path: 'he-thong',
        element: <CauHinhHeThong />
      },

      {
        path: 'cau-hinh-trang',
        element: <CauHinhTrang />
      },
      {
        path: 'loai-san',
        element: <LoaiSan />
      },
      {
        path: 'san',
        children: [
          {
            index: true,
            element: <San />
          },
          {
            path: 'them',
            element: <ThemSan />
          },
          {
            path: 'sua/:id',
            element: <SuaSan />
          }
        ]
      },
      {
        path: 'doi-tuong',
        element: <DoiTuong />
      },

      /*Declare route here*/

      {
        path: 'quan-ly-gia',
        element: <QuanLyGia />
      },
      {
        path: 'thu-chi',
        element: <ThuChi />
      },
      {
        path: 'trang-thai-san',
        element: <TrangThaiSan />
      },
      {
        path: 'dat-san',
        element: <DatSan />
      },
      {
        path: 'danh-gia',
        element: <DanhGia />
      },
      {
        path: '*',
        element: <Error404 />
      }
    ]
  }
];
