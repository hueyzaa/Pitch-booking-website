import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import SelectFormApi from '@app/components/select/SelectFormApi';
import { BaseSelect } from '@app/components/common/selects/BaseSelect/BaseSelect';
import { API_URL } from '@app/configs/api-configs';

interface TrangThaiSanFilterFormProps {
  onSearch: (filters: { field: string; operator: string; value: string }[]) => void;
  onReset: () => void;
  isLoading?: boolean;
}

export const TrangThaiSanFilterForm = ({ onSearch, onReset, isLoading = false }: TrangThaiSanFilterFormProps) => {
  const { t } = useTranslation();
  const [form] = BaseForm.useForm();

  const handleFinish = (values: any) => {
    const filters: { field: string; operator: string; value: string }[] = [];

    if (values.id_san) {
      filters.push({
        field: 'trang_thai_san.id_san',
        operator: 'equal',
        value: values.id_san
      });
    }

    if (values.trang_thai !== undefined && values.trang_thai !== null) {
      filters.push({
        field: 'trang_thai_san.trang_thai',
        operator: 'equal',
        value: values.trang_thai
      });
    }

    if (values.ngay && values.ngay.length === 2) {
      const fromDate = values.ngay[0] ? moment(values.ngay[0]).format('YYYY-MM-DD') : '';
      const toDate = values.ngay[1] ? moment(values.ngay[1]).format('YYYY-MM-DD') : '';
      if (fromDate && toDate) {
        filters.push({
          field: 'trang_thai_san.ngay',
          operator: 'between',
          value: JSON.stringify([fromDate, toDate])
        });
      }
    }

    if (values.ten_nguoi_tao) {
      filters.push({
        field: 'nguoi_tao.ho_va_ten',
        operator: 'contain',
        value: values.ten_nguoi_tao.trim()
      });
    }

    if (values.ngay_tao && values.ngay_tao.length === 2) {
      const fromDate = values.ngay_tao[0] ? moment(values.ngay_tao[0]).format('YYYY-MM-DD 00:00:00') : '';
      const toDate = values.ngay_tao[1] ? moment(values.ngay_tao[1]).format('YYYY-MM-DD 23:59:59') : '';
      if (fromDate && toDate) {
        filters.push({
          field: 'trang_thai_san.ngay_tao',
          operator: 'between',
          value: JSON.stringify([fromDate, toDate])
        });
      }
    }

    onSearch(filters);
  };

  const handleResetClick = () => {
    form.resetFields();
    onReset();
  };

  const trangThaiOptions = [
    { value: 0, label: 'Trống' },
    { value: 1, label: 'Đã đặt' },
    { value: 2, label: 'Bảo trì' }
  ];

  return (
    <BaseForm form={form} layout='vertical' onFinish={handleFinish}>
      <BaseRow gutter={[16, 16]}>
        <BaseCol xs={24} sm={12} lg={6}>
          <SelectFormApi
            name='id_san'
            label='Sân'
            placeholder='Chọn sân'
            path={API_URL.SAN + '/options'}
            size='small'
          />
        </BaseCol>

        <BaseCol xs={24} sm={12} lg={6}>
          <BaseForm.Item name='trang_thai' label='Trạng thái'>
            <BaseSelect options={trangThaiOptions} placeholder='Chọn trạng thái' allowClear size='small' />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12} lg={6}>
          <BaseForm.Item name='ngay' label='Ngày'>
            <DatePicker.RangePicker
              placeholder={['Từ ngày', 'Đến ngày']}
              style={{ width: '100%' }}
              format='DD/MM/YYYY'
              allowClear
              size='small'
            />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12} lg={6}>
          <BaseForm.Item name='ten_nguoi_tao' label='Người tạo'>
            <BaseInput placeholder='Nhập tên người tạo' allowClear size='small' />
          </BaseForm.Item>
        </BaseCol>

        <BaseCol xs={24} sm={12} lg={6}>
          <BaseForm.Item name='ngay_tao' label='Thời gian tạo'>
            <DatePicker.RangePicker
              placeholder={['Từ ngày', 'Đến ngày']}
              style={{ width: '100%' }}
              format='DD/MM/YYYY'
              allowClear
              size='small'
            />
          </BaseForm.Item>
        </BaseCol>

        {/* Buttons */}
        <BaseCol span={24}>
          <BaseRow justify='end'>
            <BaseCol>
              <BaseForm.Item style={{ marginBottom: 0 }}>
                <BaseSpace>
                  <BaseButton icon={<ReloadOutlined />} onClick={handleResetClick} size='small' disabled={isLoading}>
                    Làm mới
                  </BaseButton>
                  <BaseButton
                    type='primary'
                    htmlType='submit'
                    icon={<SearchOutlined />}
                    size='small'
                    loading={isLoading}
                  >
                    Tìm kiếm
                  </BaseButton>
                </BaseSpace>
              </BaseForm.Item>
            </BaseCol>
          </BaseRow>
        </BaseCol>
      </BaseRow>
    </BaseForm>
  );
};

export default TrangThaiSanFilterForm;
