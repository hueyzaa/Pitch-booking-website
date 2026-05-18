import React, { useEffect, useRef } from 'react';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { RequireFullscreen } from '@app/components/common/RequireFullscreen/RequireFullscreen';
import { HeaderActionWrapper } from '../../Header.styles';

export const HeaderFullscreen: React.FC = () => {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    rootRef.current = document.getElementById('root');
  }, []);

  return (
    <RequireFullscreen component={rootRef as React.RefObject<HTMLElement>}>
      {(isFullscreen) => (
        <HeaderActionWrapper>
          <BaseButton
            type={isFullscreen ? 'ghost' : 'text'}
            icon={
              isFullscreen ? (
                <FullscreenExitOutlined color='#fff' rev={undefined} />
              ) : (
                <FullscreenOutlined color='#fff' rev={undefined} />
              )
            }
          />
        </HeaderActionWrapper>
      )}
    </RequireFullscreen>
  );
};
