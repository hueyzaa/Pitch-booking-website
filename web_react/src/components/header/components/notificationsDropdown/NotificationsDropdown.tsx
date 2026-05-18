import { getListData } from '@app/api/getData.api';
import { BaseBadge } from '@app/components/common/BaseBadge/BaseBadge';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BasePopover } from '@app/components/common/BasePopover/BasePopover';
import { NotificationsOverlay } from '@app/components/header/components/notificationsDropdown/NotificationsOverlay/NotificationsOverlay';
import { HeaderActionWrapper } from '@app/components/header/Header.styles';
import { API_URL } from '@app/configs/api-configs';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { createFilterQuery } from '@app/utils/utils';
import React, { useCallback, useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa6';

export const NotificationsDropdown: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [unreadCount, setUnreadCount] = useState(0);
  const userInfo = useAppSelector((state) => state.user.user);

  const getNoti = useCallback(
    async (pageNumber = 1, append = false) => {
      if (!userInfo?.id) return;
      setLoading(true);
      try {
        const response = await getListData(
          API_URL.NOTIFICATIONS,
          (createFilterQuery as any)(pageNumber - 1, 'nguoi_dung_id', 'equal', userInfo.id, 10, 'ngay_tao', 'desc')
        );

        if (append) {
          setNotifications((prev) => [...prev, ...response.data]);
        } else {
          setNotifications(response.data);
        }

        setHasMore(response.data.length === 10);
        setPage(pageNumber);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [userInfo?.id]
  );

  const getUnreadCount = useCallback(async () => {
    if (!userInfo?.id) return;
    try {
      const response = await getListData(
        API_URL.NOTIFICATIONS,
        (createFilterQuery as any)(0, 'nguoi_dung_id', 'equal', userInfo.id, 100, 'ngay_tao', 'desc', [
          { field: 'da_xem', operator: 'equal', value: 0 }
        ])
      );
      setUnreadCount(response.total || 0);
    } catch (error) {
      console.error(error);
    }
  }, [userInfo?.id]);

  useEffect(() => {
    getUnreadCount();
    const interval = setInterval(getUnreadCount, 30000); // Refresh count every 30s
    return () => clearInterval(interval);
  }, [getUnreadCount]);

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      getNoti(1, false);
    }
    setOpen(newOpen);
  };

  const fetchMore = () => {
    getNoti(page + 1, true);
  };

  return (
    <BasePopover
      trigger='click'
      content={
        <NotificationsOverlay
          notifications={notifications}
          setNotifications={setNotifications}
          fetchMore={fetchMore}
          hasMore={hasMore}
          loading={loading}
          onRefresh={() => getNoti(1, false)}
          refreshCount={getUnreadCount}
        />
      }
      showArrow={false}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <HeaderActionWrapper>
        <BaseButton
          type='text'
          icon={
            <BaseBadge count={unreadCount} overflowCount={99}>
              <FaBell size={20} />
            </BaseBadge>
          }
        />
      </HeaderActionWrapper>
    </BasePopover>
  );
};
