import { UploadOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/core.api';
import avatarImg from '@app/assets/icons/user.svg';
import { BaseAvatar } from '@app/components/common/BaseAvatar/BaseAvatar';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseUpload } from '@app/components/common/BaseUpload/BaseUpload';
import { apiURL } from '@app/configs/configs';
import { notificationController } from '@app/controllers/notificationController';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { IApiSuccess, IUser } from '@app/interfaces/interfaces';
import { hideLoading, showLoading } from '@app/store/slices/appSlice';
import { setUser } from '@app/store/slices/userSlice';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadChangeParam } from 'antd/es/upload';
import type { UploadFile as UploadFileAntd } from 'antd/es/upload/interface';
import React, { useState } from 'react';
import * as S from './ProfileInfo.styles';
import { readDeviceId } from '@app/services/localStorage.service';
import { config } from 'process';
import { generateHashStringAndParamsString } from '@app/utils/utils';

interface ProfileInfoProps {
  profileData: IUser | null;
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({ profileData }) => {
  const user = useAppSelector((state) => state.user.user);
  const token = useAppSelector((state) => state.auth.token);
  const device_id = readDeviceId();
  const avatar = user?.avatar
    ? `${apiURL}${user?.avatar}?${generateHashStringAndParamsString({ originalUrl: user?.avatar })}`
    : avatarImg;
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [file, setFile] = useState<any>(null);
  const dispatch = useAppDispatch();

  const handleUpload = (info: UploadChangeParam<UploadFileAntd<any>>) => {
    const file = info.file.originFileObj as RcFile;
    setFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };
  };

  const handleUploadFile = async () => {
    try {
      showLoading();
      const formData = new FormData();
      formData.append('file', file);

      const data: IApiSuccess = await apiInstance.post('profile/avatar', formData);
      if (data) {
        notificationController.success({
          message: 'Thành công'
        });
        dispatch(setUser(data.data));
        setPreviewImage('');
      }
    } catch (error: any) {
      notificationController.error({
        message: error.message
      });
    } finally {
      hideLoading();
    }
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  return profileData ? (
    <S.Wrapper>
      <S.ImgWrapper>
        <BaseAvatar
          onClick={() => setPreviewVisible(true)}
          shape='circle'
          src={previewImage ? previewImage : avatar}
          alt='Profile'
        />
      </S.ImgWrapper>
      <div style={{ textAlign: 'center' }}>
        {previewImage !== '' && (
          <BaseButton onClick={handleUploadFile} size='small' type='primary'>
            Cập nhật
          </BaseButton>
        )}
      </div>
      <ImgCrop rotationSlider>
        <BaseUpload accept='image/*' showUploadList={false} onChange={handleUpload}>
          {previewImage === '' && (
            <BaseButton size='small' type='primary' icon={<UploadOutlined />}>
              Cập nhật ảnh đại diện
            </BaseButton>
          )}
        </BaseUpload>
      </ImgCrop>
      <BaseModal open={previewVisible} title='Preview Avatar' onCancel={handleCancel} footer={false}>
        <img
          src={previewImage || avatar}
          alt='Avatar Preview'
          style={{ width: '80%', display: 'block', margin: '0 auto' }}
        />
      </BaseModal>
      <S.Title>{profileData?.ho_va_ten}</S.Title>
      <S.Subtitle>{profileData?.tai_khoan}</S.Subtitle>
      <S.Subtitle>{profileData?.ma_vai_tro}</S.Subtitle>
    </S.Wrapper>
  ) : null;
};
