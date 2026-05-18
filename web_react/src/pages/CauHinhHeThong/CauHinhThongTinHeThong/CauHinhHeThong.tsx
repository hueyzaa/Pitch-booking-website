import { UploadOutlined } from '@ant-design/icons';
import { apiInstance } from '@app/api/core.api';
import { getListData } from '@app/api/getData.api';
import { postData } from '@app/api/postData.api';
import { BaseAvatar } from '@app/components/common/BaseAvatar/BaseAvatar';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseUpload } from '@app/components/common/BaseUpload/BaseUpload';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { apiURL } from '@app/configs/configs';
import { useAppDispatch, useAppSelector } from '@app/hooks/reduxHooks';
import { persistSystemConfig } from '@app/services/localStorage.service';
import { appActions, showLoading } from '@app/store/slices/appSlice';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadChangeParam } from 'antd/es/upload';
import { useEffect, useState } from 'react';

const CauHinhHeThong = () => {
  const [loading, setLoading] = useState(false);
  const [form] = BaseForm.useForm();
  const pathUpdate = '/he-thong/update-logo-va-ten';
  const pathGet = '/he-thong/get-logo-va-ten';
  const dispatch = useAppDispatch();
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [file, setFile] = useState<any>(null);
  const reload = useAppSelector((state) => state.app.reloadData['DANH_SACH']);

  const handleUpload = (info: UploadChangeParam) => {
    const file = info.file.originFileObj as RcFile;
    setFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const fetchLogo = async () => {
    const res = await getListData(pathGet);
    setPreviewImage(res?.logoUrl ? apiURL + '/' + res?.logoUrl : '/react-icon.svg');
    form.setFieldsValue({
      name: res?.name
    });
  };

  useEffect(() => {
    fetchLogo();
  }, [reload]);

  const onFinish = async (values: any) => {
    try {
      showLoading();
      //Todo: Tạo form data
      const formData = new FormData();

      if (file) {
        formData.append('file', file);
        //Todo: Tạo request upload
        const response = await apiInstance.post('upload', formData);
        if (!response) return;

        //Todo: Gán lại giá trị cho logoUrl
        values.logoUrl = response?.data?.path;
      } else {
        values.logoUrl = previewImage.replace(apiURL + '/', '');
      }

      persistSystemConfig(values);

      const closeModel = () => {
        dispatch(appActions.toggleReload('DANH_SACH'));
      };

      postData(pathUpdate, values, closeModel, 'Cập nhật thành công!');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseCard title='Cập nhật logo và tên phần mềm' bodyStyle={{ padding: '20px' }} bordered={false}>
      <BaseForm id='formCauHinhHeThong' layout='vertical' onFinish={onFinish} form={form}>
        <BaseRow gutter={[10, 10]}>
          <BaseCol span={24}>
            <BaseForm.Item
              name='name'
              label='Tên phần mềm'
              rules={[
                { required: true, message: 'Tên không được để trống' },
                {
                  pattern: /^[^\p{Emoji_Presentation}\p{Emoji}\u200d]+$/u,
                  message: 'Tên không được chứa emoji'
                }
              ]}
            >
              <BaseInput placeholder='Nhập tên phần mềm mới' style={{ width: '800px' }} />
            </BaseForm.Item>
          </BaseCol>

          <BaseCol span={24}>
            <BaseAvatar
              onClick={() => setPreviewVisible(true)}
              shape='square'
              src={previewImage ? previewImage : '/react-icon.svg'}
              alt='Profile'
              style={{ display: 'block', width: '300px', height: '300px', marginBottom: '10px' }}
            />
            <ImgCrop rotationSlider>
              <BaseUpload accept='image/*' showUploadList={false} onChange={handleUpload}>
                <BaseButton size='small' icon={<UploadOutlined />}>
                  Tải lên logo
                </BaseButton>
              </BaseUpload>
            </ImgCrop>
            <BaseModal open={previewVisible} title='Preview Avatar' onCancel={handleCancel} footer={false}>
              <img
                src={previewImage || '/react-icon.svg'}
                alt='Avatar Preview'
                style={{ width: '80%', display: 'block', margin: '0 auto' }}
              />
            </BaseModal>
          </BaseCol>

          <BaseCol span={24}>
            <BaseForm.Item>
              <BaseButton size='small' type='primary' htmlType='submit' loading={loading}>
                Cập nhật
              </BaseButton>
            </BaseForm.Item>
          </BaseCol>
        </BaseRow>
      </BaseForm>
    </BaseCard>
  );
};

export default CauHinhHeThong;
