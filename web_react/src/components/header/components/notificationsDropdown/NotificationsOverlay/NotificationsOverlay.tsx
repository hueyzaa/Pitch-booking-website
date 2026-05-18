import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './NotificationsOverlay.styles';
import { FaTrashCan } from 'react-icons/fa6';
import { deleteData } from '@app/api/deleteData.api';
import { apiInstance } from '@app/api/core.api';
import { API_URL } from '@app/configs/api-configs';
import { notificationController } from '@app/controllers/notificationController';

interface INotiData {
  id: number;
  da_xem: number;
  nguoi_dung_id: number;
  ngay_tao: string;
  tieu_de: string;
  noi_dung: string;
}

interface NotificationsOverlayProps {
  notifications: INotiData[];
  setNotifications: (notis: INotiData[]) => void;
  fetchMore: () => void;
  hasMore: boolean;
  loading: boolean;
  onRefresh?: () => void;
  refreshCount?: () => void;
}

export const NotificationsOverlay: React.FC<NotificationsOverlayProps> = ({
  notifications,
  setNotifications,
  fetchMore,
  hasMore,
  loading,
  onRefresh,
  refreshCount,
  ...props
}) => {
  const { t } = useTranslation();

  const handleMarkRead = async (id: number) => {
    try {
      await apiInstance.patch(`${API_URL.NOTIFICATIONS}/${id}`, { da_xem: 1 });
      setNotifications(notifications.map((n) => (n.id === id ? { ...n, da_xem: 1 } : n)));
      refreshCount?.();
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await apiInstance.patch(`${API_URL.NOTIFICATIONS}/mark-all-read`, {});
      setNotifications(notifications.map((n) => ({ ...n, da_xem: 1 })));
      notificationController.success({ message: t('header.notifications.markReadAllSuccess') });
      refreshCount?.();
      onRefresh?.();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    try {
      await (deleteData as any)(API_URL.NOTIFICATIONS, id);
      setNotifications(notifications.filter((n) => n.id !== id));
      notificationController.success({ message: t('common.deleteSuccess') });
      refreshCount?.();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await apiInstance.delete(`${API_URL.NOTIFICATIONS}/all`);
      setNotifications([]);
      notificationController.success({ message: t('header.notifications.deleteAllSuccess') });
      refreshCount?.();
      onRefresh?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.NoticesOverlayMenu {...props}>
      <BaseRow gutter={[10, 10]}>
        <BaseCol span={24}>
          <BaseRow justify={'space-between'} align='middle'>
            <BaseCol>
              <BaseTypography.Title level={4} style={{ margin: 0, color: 'var(--primary-color)' }}>
                {t('header.notifications.title')}
              </BaseTypography.Title>
            </BaseCol>
            <BaseCol>
              <BaseButton size='small' type='link' onClick={handleMarkAllRead}>
                {t('header.notifications.markReadAll')}
              </BaseButton>
              <BaseButton size='small' type='link' danger onClick={handleDeleteAll}>
                {t('common.deleteAll')}
              </BaseButton>
            </BaseCol>
          </BaseRow>
        </BaseCol>
        <BaseCol span={24} style={{ maxHeight: '70dvh', overflowY: 'auto', paddingRight: '4px' }}>
          {notifications.length > 0 ? (
            <>
              {notifications.map((noti) => (
                <S.NotificationItem key={noti.id} $isUnread={noti.da_xem === 0} onClick={() => handleMarkRead(noti.id)}>
                  <BaseRow gutter={[10, 0]}>
                    <BaseCol span={18}>
                      <b
                        style={{
                          color: noti.da_xem === 0 ? 'var(--primary-color)' : 'var(--text-main-color)',
                          fontSize: '14px',
                          display: 'block',
                          marginBottom: '4px'
                        }}
                      >
                        {noti.tieu_de}
                      </b>
                    </BaseCol>
                    <BaseCol span={6}>
                      <div style={{ float: 'right', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ fontSize: '11px', color: 'var(--disabled-color)' }}>
                          {moment(noti.ngay_tao).fromNow()}
                        </div>
                        <FaTrashCan
                          style={{ color: 'var(--error-color)', cursor: 'pointer', fontSize: '14px' }}
                          onClick={(e) => handleDelete(e, noti.id)}
                        />
                      </div>
                    </BaseCol>
                    <BaseCol span={24}>
                      <span
                        style={{
                          fontSize: '13px',
                          color: noti.da_xem === 0 ? 'var(--text-main-color)' : 'var(--disabled-color)',
                          display: 'block',
                          lineHeight: '1.4'
                        }}
                      >
                        {noti.noi_dung}
                      </span>
                    </BaseCol>
                    <BaseCol
                      span={24}
                      style={{
                        marginTop: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <S.DateTimeText>{moment(noti.ngay_tao).format('DD/MM/YYYY HH:mm')}</S.DateTimeText>
                      {noti.da_xem === 0 && <S.UnreadDot />}
                    </BaseCol>
                  </BaseRow>
                </S.NotificationItem>
              ))}
              {hasMore && (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <S.SeeMoreBtn type='text' size='small' loading={loading} onClick={fetchMore}>
                    {t('common.seeMore')}
                  </S.SeeMoreBtn>
                </div>
              )}
            </>
          ) : (
            <S.Text style={{ textAlign: 'center', padding: '20px 0' }}>
              {t('header.notifications.noNotifications')}
            </S.Text>
          )}
        </BaseCol>
      </BaseRow>
    </S.NoticesOverlayMenu>
  );
};
