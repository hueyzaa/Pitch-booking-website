import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { API_URL } from '@app/configs/api-configs';
import { useTranslation } from 'react-i18next';
import { getPermissionUser } from '@app/utils/redux.utils';
import { Actions } from '@app/interfaces/interfaces';
import { useEffect, useState } from 'react';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseInputNumber } from '@app/components/common/inputs/InputNumber/BaseInputNumber';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseSwitch } from '@app/components/common/BaseSwitch/BaseSwitch';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { apiInstance } from '@app/api/core.api';
import { notificationController } from '@app/controllers/notificationController';
import { lightColorsTheme } from '@app/styles/themes/light/lightTheme';

const CauHinhChung = () => {
  const path = API_URL.CAU_HINH_CHUNG;
  const page = 'common.cau-hinh-chung';
  const permission: Actions = getPermissionUser(path);
  const { t } = useTranslation();
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = BaseForm.useForm();

  const [configData, setConfigData] = useState<any>({});

  async function fetchConfigs() {
    try {
      const response = await apiInstance.get(`${API_URL.CAU_HINH_CHUNG}/specific-configs`);
      const data = response.data;

      // Xử lý dữ liệu cho form
      const parsedData = data.reduce((acc: any, item: any) => {
        acc[item.key] =
          item.key === 'LOCK_TIME' || item.key === 'OTP_REAUTH_TTL'
            ? parseInt(item.value) / 60000 // Chuyển mili-giây -> phút
            : item.key === 'TWO_FACTOR_AUTH' ||
                item.key === 'ACCESS_TIME_LIMIT' ||
                item.key === 'CHECK_VALID_PASS' ||
                item.key === 'RECAPTCHA_REQUIRED'
              ? item.value === '1'
              : parseInt(item.value); // Chuyển "1" thành true và "0" thành false cho Switch
        return acc;
      }, {});

      setConfigData(parsedData); // Lưu dữ liệu đã xử lý
      form.setFieldsValue(parsedData); // Gán giá trị cho form
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu cấu hình:', error);
    }
  }
  useEffect(() => {
    fetchConfigs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  // Chuyển đổi giữa chế độ xem và chỉnh sửa
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    fetchConfigs();
  };

  // Lưu thay đổi
  const handleSave = async () => {
    try {
      const values = form.getFieldsValue();

      // Lọc các trường có thay đổi
      const updatedConfigs = Object.keys(values).reduce(
        (acc, key) => {
          const newValue =
            key === 'LOCK_TIME' || key === 'OTP_REAUTH_TTL'
              ? (values[key] * 60000).toString() // Chuyển phút -> mili-giây
              : key === 'TWO_FACTOR_AUTH' ||
                  key === 'ACCESS_TIME_LIMIT' ||
                  key === 'CHECK_VALID_PASS' ||
                  key === 'RECAPTCHA_REQUIRED'
                ? values[key]
                  ? '1'
                  : '0' // Chuyển true/false thành "1"/"0"
                : values[key].toString(); // Các giá trị khác

          if (newValue !== configData[key]?.toString()) {
            acc.push({ key, value: newValue });
          }
          return acc;
        },
        [] as { key: string; value: string }[]
      );

      // Nếu không có thay đổi, thông báo và thoát
      if (updatedConfigs.length === 0) {
        notificationController.info({ message: 'Không có thay đổi nào để cập nhật' });
        setIsEditMode(false);
        return;
      }

      // Gửi API cập nhật
      await apiInstance.patch(`${API_URL.CAU_HINH_CHUNG}`, updatedConfigs);
      notificationController.success({ message: 'Cập nhật thành công' });
      setIsEditMode(false); // Quay về chế độ xem
    } catch (error) {
      notificationController.error({ message: 'Cập nhật thất bại' });
      console.error('Lỗi khi lưu dữ liệu cấu hình:', error);
    }
  };

  return (
    <BaseCard
      padding={'1rem'}
      title={<BaseTypography.Title level={3}>{t('common.cau-hinh-chung').toUpperCase()}</BaseTypography.Title>}
    >
      <PageTitle>{t(page)}</PageTitle>
      <BaseForm form={form} layout='vertical'>
        {/* Nhóm: Giới hạn truy cập */}
        <BaseTypography.Title level={4} style={{ marginTop: '16px' }}>
          Giới hạn truy cập
        </BaseTypography.Title>
        <BaseRow gutter={[16, 16]}>
          <BaseCol span={12}>
            <BaseRow
              gutter={[16, 16]}
              align='middle'
              // justify='space-between'
              style={{ width: '100%', padding: '0 16px' }}
            >
              <BaseForm.Item style={{ marginRight: '8px' }} name='ACCESS_TIME_LIMIT' valuePropName='checked'>
                <BaseSwitch disabled={!isEditMode} />
              </BaseForm.Item>
              <BaseTypography.Text style={{ color: lightColorsTheme.primary, fontWeight: '500' }}>
                Giới hạn truy cập
              </BaseTypography.Text>
            </BaseRow>
          </BaseCol>
          <BaseCol span={12}>
            <BaseRow gutter={[16, 16]} align='middle' style={{ width: '100%', padding: '0 16px' }}>
              <BaseForm.Item style={{ marginRight: '8px' }} name='CHECK_VALID_PASS' valuePropName='checked'>
                <BaseSwitch disabled={!isEditMode} />
              </BaseForm.Item>
              <BaseTypography.Text style={{ color: lightColorsTheme.primary, fontWeight: '500' }}>
                Kiểm tra mật khẩu hợp lệ
              </BaseTypography.Text>
            </BaseRow>
          </BaseCol>
        </BaseRow>

        {/* Nhóm: Cài đặt bảo mật */}
        <BaseTypography.Title level={4}>Cài đặt bảo mật</BaseTypography.Title>
        <BaseRow gutter={[16, 16]}>
          <BaseCol span={12}>
            <BaseForm.Item
              label='Số lần đăng nhập tối đa'
              name='MAX_FAILED_ATTEMPTS'
              rules={[
                { required: true, message: 'Vui lòng nhập số lần đăng nhập tối đa' },
                { type: 'number', message: 'Vui lòng nhập chữ số' }
              ]}
            >
              <BaseInputNumber size='small' disabled={!isEditMode} min={1} style={{ width: '100%' }} />
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={12}>
            <BaseRow gutter={[16, 16]} align='middle' style={{ width: '100%', padding: '0 16px' }}>
              <BaseForm.Item style={{ marginRight: '8px' }} name='TWO_FACTOR_AUTH' valuePropName='checked'>
                <BaseSwitch disabled={!isEditMode} />
              </BaseForm.Item>
              <BaseTypography.Text style={{ color: lightColorsTheme.primary, fontWeight: '500' }}>
                Xác thực 2 yếu tố (2FA)
              </BaseTypography.Text>
            </BaseRow>
          </BaseCol>
          <BaseCol span={12}>
            <BaseRow gutter={[16, 16]} align='middle' style={{ width: '100%', padding: '0 16px' }}>
              <BaseForm.Item style={{ marginRight: '8px' }} name='RECAPTCHA_REQUIRED' valuePropName='checked'>
                <BaseSwitch disabled={!isEditMode} />
              </BaseForm.Item>
              <BaseTypography.Text style={{ color: lightColorsTheme.primary, fontWeight: '500' }}>
                Yêu cầu xác thực bằng ReCAPTCHA
              </BaseTypography.Text>
            </BaseRow>
          </BaseCol>
        </BaseRow>

        {/* Nhóm: Cài đặt thời gian */}
        <BaseTypography.Title level={4} style={{ marginTop: '16px' }}>
          Cài đặt thời gian
        </BaseTypography.Title>
        <BaseRow gutter={[16, 16]}>
          <BaseCol span={12}>
            <BaseForm.Item
              label='Thời gian khóa tài khoản (phút)'
              name='LOCK_TIME'
              rules={[
                { required: true, message: 'Vui lòng nhập thời gian khóa tài khoản' },
                { type: 'number', message: 'Vui lòng nhập chữ số' }
              ]}
            >
              <BaseInputNumber size='small' disabled={!isEditMode} min={1} style={{ width: '100%' }} />
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={12}>
            <BaseForm.Item
              label='Thời gian yêu cầu xác thực lại OTP (phút)'
              name='OTP_REAUTH_TTL'
              rules={[
                { required: true, message: 'Vui lòng nhập thời gian xác thực lại OTP' },
                { type: 'number', message: 'Vui lòng nhập chữ số' }
              ]}
            >
              <BaseInputNumber size='small' disabled={!isEditMode} min={0} style={{ width: '100%' }} />
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={12}>
            <BaseForm.Item
              label='Thời gian mật khẩu hợp lệ (ngày)'
              name='PASS_VALID_TIME'
              rules={[
                { required: true, message: 'Vui lòng nhập thời gian mật khẩu hợp lệ' },
                { type: 'number', message: 'Vui lòng nhập chữ số' }
              ]}
            >
              <BaseInputNumber size='small' disabled={!isEditMode} min={0} style={{ width: '100%' }} />
            </BaseForm.Item>
          </BaseCol>
          <BaseCol span={24}>
            {permission.edit && (
              <>
                {isEditMode ? (
                  <>
                    <BaseButton type='default' size='small' onClick={toggleEditMode} style={{ marginRight: '8px' }}>
                      Hủy
                    </BaseButton>
                    <BaseButton type='primary' size='small' onClick={handleSave}>
                      Lưu
                    </BaseButton>
                  </>
                ) : (
                  <BaseButton type='primary' size='small' onClick={toggleEditMode}>
                    Chỉnh sửa
                  </BaseButton>
                )}
              </>
            )}
          </BaseCol>
        </BaseRow>
      </BaseForm>
    </BaseCard>
  );
};

export default CauHinhChung;
